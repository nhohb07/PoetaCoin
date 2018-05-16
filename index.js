const express = require('express');
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
app.post('/addNode', (req, res) => {
  node.addNode(myIP.address(), socketPort);

  res.send('Done');
});

app.listen(httpPort, () => {
  console.log(`Node started at HTTP Port: ${httpPort}, Web Socket Port: ${socketPort}`);
});