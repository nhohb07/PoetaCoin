const express = require('express');
const bodyParser = require('body-parser');

const Block = require('./src/Block');

const app = new express();
app.use(bodyParser.json());

app.post('/create-block', (req, res) => {
  const block = new Block(0, -1, { message: req.body.message || "This is the Genesis Block!" });
  console.log('\nNew block created: ', block);
  res.json(block);
});

app.listen(3000, () => {
  console.log(`http server up..`);
})