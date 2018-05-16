const Chain = require('./Chain');
const WebSocket = require('ws');

class Node {
  constructor(port) {
    this.nodes = [];

    this.poetaChain = new Chain();

    const socketServer = new WebSocket.Server({ port });
    socketServer.on('connection', (connection) => this._handleConnection(connection));
  }

  _handleConnection(connection) {
    const connectionHost = connection._socket.remoteAddress;
    const connectionPort = connection._socket.remotePort;

    console.log(`\n\tAdd Node: ${connectionHost}:${connectionPort}`);

    this.nodes.push(connection);

    // handle receive message on websocket
    connection.on('message', (data) => {
      console.log('received: ', data);
    });

    // handle websocket error
    connection.on('error', (error) => {
      console.log(`\nERROR on ${connectionHost}:${connectionPort}`, error);
      this._closeConnection(connection);
    });

    // handle websocket connection is closed
    connection.on('close', () => this._closeConnection(connection));
  }

  _closeConnection(connection) {
    const connectionHost = connection._socket.remoteAddress;
    const connectionPort = connection._socket.remotePort;

    console.log(`\n\tRemove Node: ${connectionHost}:${connectionPort}\n`);

    this.nodes.splice(this.nodes.indexOf(connection), 1);
  }

  getTotalNodes() {
    return this.nodes.length;
  }

  /**
   * Add socket node
   * @param {String} host 
   * @param {String | Number} port 
   */
  addNode(host, port) {
    let connection = new WebSocket(`ws://${host}:${port}`);

    connection.on('error', (error) => {
      console.log(error);
    });

    connection.on('open', (msg) => {
      this._handleConnection(connection);
    });
  }
}

module.exports = Node;