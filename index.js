const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const ip = require('ip');
const myIP = ip.address();

// random port for handle multiple instance node in the same host
const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort = parseInt(process.env.P2P_PORT) || 6001;

const Node = require('./src/Node');
const node = new Node(myIP, p2pPort);

const app = new express();
app.use(bodyParser.json());

app.use(express.static('ui'));

// UI
app.get('/ui', (req, res) => {
  res.sendFile(__dirname + '/ui/index.html');
});

// Get all blocks from chain
app.get('/blocks', (req, res) => {
  const blocks = node.poetaChain.getChain();

  res.json(blocks);
});

// create new block and add to chain
app.post('/create-block', (req, res) => {
  const block = node.createBlock({
    message: req.body.message
  });
  console.log('\nNew block created: ', block);

  res.json(block);
});

/**
 * Add current Node into network
 * Must be know remote host and remote port
 * ex: remote host: 10.0.0.118:3002
 */
app.post('/connect-to-network', (req, res) => {
  const remoteHost = `http://${req.body.remoteHost}/add-node`;

  request(
    {
      method: 'post',
      url: remoteHost,
      headers: { 'Content-Type': 'application/json' },
      body: { node: `${myIP}:${p2pPort}` },
      json: true
    },
    (error, response, body) => {
      res.json({ body });
    }
  );
});

// add node into network
app.post('/add-node', (req, res) => {
  node.addNode(req.body.node);

  res.send('Done');
});

// broadcast message into nodes in network
app.post('/broadcast-message', (req, res) => {
  node.broadcastMessage(req.body.event, req.body.message);

  res.send('Done');
});

// start app
app.listen(httpPort, () => {
  console.log(`Node started at HTTP Port: ${httpPort}, Web Socket Port: ${p2pPort}`);
});