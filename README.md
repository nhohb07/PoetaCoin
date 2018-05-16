# PoetaCoin
Research cryptocurrency blockchain using nodejs

## Install and Run
- `git clone https://github.com/nhohb07/PoetaCoin.git`
- `cd PoetaCoin`
- `git checkout 1.Block`
- `yarn && npm start`
- `curl -H "Content-type:application/json" --data '{"message": "This is the Genesis Block!"}' http://localhost:3000/create-block `

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