const Chain = require('./Chain');
const WebSocket = require('ws');

class Node {
  constructor(myIP, myPort) {
    this.nodes = [];
    this.myPort = myPort;
    this.myIP = myIP;

    this.poetaChain = new Chain();

    const socketServer = new WebSocket.Server({ port: myPort });
    socketServer.on('connection', (connection) => {
      console.log('connection in');
      this._handleConnection(connection)
    });
  }

  _handleConnection(connection) {
    this.nodes.push(connection);

    // handle receive message on websocket
    connection.on('message', (data) => {
      data = JSON.parse(data);

      console.log('\n\tReceived: ', data.event);

      switch (data.event) {
        case 'CHAIN':
          this.poetaChain.replaceChain(data.data);
          break;

        case 'NEW_BLOCK':
          const newBlock = data.data;
          const previousBlock = this.poetaChain.getLatestBlock();

          if (JSON.stringify(newBlock) === JSON.stringify(previousBlock)) {
            console.log('\n\tIgnore new block, it is already in the chain.');
            return;
          }

          this.poetaChain.addBlock(newBlock);
          this.broadcastMessage('NEW_BLOCK', data.data);
          break;

        case 'GET_CHAIN':
          this.broadcastMessage('CHAIN', this.poetaChain.chain, connection);
          break;
      }
    });

    // handle websocket connection is closed
    connection.on('close', () => this._closeConnection(connection));
  }

  /**
   * Handle close connection
   * @param {*} connection 
   */
  _closeConnection(connection) {
    console.log(`\n\tRemove Node`);

    this.nodes.splice(this.nodes.indexOf(connection), 1);
  }

  /**
   * Add socket node
   * @param {String} host 
   * @param {String | Number} port 
   */
  addNode(node) {
    if (node === `${this.myIP}:${this.myPort}`) {
      console.log(`\n\tIt's me!`);
      return;
    }

    let connection = new WebSocket(`ws://${node}`);

    connection.on('open', (msg) => {
      console.log(`addNode: ${node}`);
      this._handleConnection(connection);

      this.broadcastMessage('CHAIN', this.poetaChain.chain, connection);
    });
  }

  broadcastMessage(event, data, node = null) {
    if (node) {
      return node.send(JSON.stringify({ event, data }));
    }

    console.log(`broadcastMessage to ${this.nodes.length} nodes`);
    this.nodes.forEach(node => node.send(JSON.stringify({ event, data })))
  }

  createBlock(data) {
    const block = this.poetaChain.createBlock(data);
    this.broadcastMessage('NEW_BLOCK', block);

    return block;
  }
}

module.exports = Node;