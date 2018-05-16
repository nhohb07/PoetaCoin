const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const myIP = require('ip');

// random port for handle multiple instance node in the same host
const httpPort = 3000 + Math.floor(Math.random() * 10);
const socketPort = 18070 + Math.floor(Math.random() * 30);

const Node = require('./src/Node');
const node = new Node(socketPort);

const app = new express();
app.use(bodyParser.json());


// app.get('/blocks', (req, res) => {
//   const blocks = poetaChain.getChain();

//   res.json(blocks);
// });

// app.post('/create-block', (req, res) => {
//   const block = poetaChain.addBlock({
//     message: req.body.message
//   });
//   console.log('\nNew block created: ', block);

//   res.json(block);
// });

/**
 * Add current Node into network
 * Must be know remote host and remote port
 * ex: remote host: 10.0.0.118:3002
 */
app.post('/connect-to-network', (req, res) => {
  const remoteHost = req.body.host;

  request(
    {
      method: 'post',
      url: remoteHost,
      headers: { 'Content-Type': 'application/json' },
      body: { host: myIP.address(), port: socketPort },
      json: true
    },
    (error, response, body) => {
      res.json({ error, response, body });
    }
  );
});

app.post('/add-note', (req, res) => {
  node.addNode(req.body.host, req.body.port);

  res.send('Done');
});

app.listen(httpPort, () => {
  console.log(`Node started at HTTP Port: ${httpPort}, Web Socket Port: ${socketPort}`);
});