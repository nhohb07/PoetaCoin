# PoetaCoin
Research cryptocurrency blockchain using nodejs

## Install and Run
- `git clone https://github.com/nhohb07/PoetaCoin.git`
- `cd PoetaCoin`
- `git checkout 2.Chain`
- `yarn && npm start`

## Get all blocks in chain
- `curl -XGET http://localhost:3000/blocks`

### Example response
```js
[
  {
    "index": 0,
    "previousHash": -1,
    "data": {
      "message": "This is a Genesis Block of Chain!"
    },
    "timestamp": 1514739600000,
    "hash": "5d83b8000ecb03c67c49a33e4bde841b29c0950b252f9b0f9ee46cd0d55e8b75"
  },
  {
    "index": 1,
    "previousHash": "5d83b8000ecb03c67c49a33e4bde841b29c0950b252f9b0f9ee46cd0d55e8b75",
    "data": {
      "message": "Test message"
    },
    "timestamp": 1526458754482,
    "hash": "652ffda8f90fff295d9428d78e3ce5b82ca2fb4bda408bd0357b327e1699c649"
  }
]
```

## Create new block
- `curl -H "Content-type:application/json" --data '{"message": "Some message"}' http://localhost:3000/create-block `

### Example response
```js
New block created:  Block {
  index: 0,
  previousHash: -1,
  data: { message: 'This is the Genesis Block!' },
  timestamp: 1526456144877,
  hash: '115cd2a0926087358e1daf030f6a3f120fbf5c01a9b3ff9a68cdd2a15fa4f739'
}
```