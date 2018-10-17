module.exports = function (RED) {
  var request = require("request");
  var querystring = require("querystring");

  //
  function PixelaApi(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.apiclient = RED.nodes.getNode(config.apiclient);
    node.method = config.method;
    node.path = config.path;
    node.debug(config);

    node.on('input', function (msg) {
      //node.debug(JSON.stringify(msg));
      var method = msg.method || node.method;
      var path = msg.path || node.path;
      node.apiclient.callApi(method, path, msg.payload)
        .then((result) => {
          msg.payload = result;
          node.send(msg);
        }).catch((err) => {
          node.error(err, msg);
        });
    });
  }

  //
  function PixelaApiClient(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    if (this.credentials) {
      this.username = this.credentials.username;
      this.token = this.credentials.token;
    }

    this.callApi = function (method, path, parameters) {
      return new Promise((resolve, reject) => {
        var url = "https://pixe.la" + "/v1/users/" + this.username + path;
        if (parameters && method.toLowerCase() == "get") {
          url = url + "?" + querystring.stringify(parameters);
        }
        var opts = {
          url: url,
          method: method,
          headers: {
            "X-USER-TOKEN": this.token,
            "Content-type": "application/json",
            "Accept": "application/json"
          }
        };
        if (parameters && (method.toLowerCase() == "put" || method.toLowerCase() == "post")) {
          opts.json = parameters;
        }
        node.debug(JSON.stringify(opts));

        request(opts, function (err, res, body) {
          try {
            node.debug(err);
            node.debug(res.statusCode);
            node.debug(body);
            if (err) {
              reject(err)
            } else if (res.statusCode != 200) {
              reject("HTTP status code is not OK. " + JSON.stringify(body));
            } else {
              resolve(body);
            }
          } catch (ex) {
            reject(ex);
          }
        });
      });
    }
  }

  // register nodes.
  RED.nodes.registerType("pixela", PixelaApi, {
  });
  RED.nodes.registerType("pixela-client", PixelaApiClient, {
    credentials: {
      username: { type: "text" },
      token: { type: "password" }
    }
  });
}