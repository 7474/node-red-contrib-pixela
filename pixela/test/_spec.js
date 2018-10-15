var should = require("should");
var helper = require("node-red-node-test-helper");
var lowerNode = require("../pixela.js");

helper.init(require.resolve('node-red'));

describe('pixela Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "pixela", name: "test name" }];
    helper.load(lowerNode, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

});