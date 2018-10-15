# node-red-contrib-pixela

This node is for calling [Pixela API](https://pixe.la/).

Icon was taken from https://pixe.la/.

## License

[MIT](LICENSE)

## Installation

This node was not published to npm.

See: [testing-your-node-in-node-red](https://nodered.org/docs/creating-nodes/first-node#testing-your-node-in-node-red)

```sh
git clone https://github.com/7474/node-red-contrib-pixela.git
cd node-red-contrib-pixela
npm link
```

## Sample

Grass growing per deploying "Flow".

```json
[{"id":"958a11ee.70698","type":"inject","z":"320bd89d.6ceb98","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"onceDelay":0.1,"x":110,"y":60,"wires":[["31e9654b.236eaa"]]},{"id":"31e9654b.236eaa","type":"pixela","z":"320bd89d.6ceb98","name":"","method":"PUT","path":"/graphs/node-red-deploy/increment","apiclient":"484e28be.3ea4e8","x":390,"y":60,"wires":[[]]},{"id":"484e28be.3ea4e8","type":"pixela-client","z":"","name":"pixela-config"}]
```

![Sample Flow](./docs/images/sample-flow.png)

![Sample Graph](https://pixe.la/v1/users/koudenpa/graphs/node-red-deploy)