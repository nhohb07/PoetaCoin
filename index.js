const express = require('express');
const bodyParser = require('body-parser');

const Chain = require('./src/Chain');
const poetaChain = new Chain();

const app = new express();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  const blocks = poetaChain.getChain();

  res.json(blocks);
});

app.post('/create-block', (req, res) => {
  const block = poetaChain.addBlock({
    message: req.body.message
  });
  console.log('\nNew block created: ', block);

  res.json(block);
});

app.listen(3000, () => {
  console.log(`http server up..`);
})