const Block = require('./Block');

class Chain {
  constructor() {
    this.chain = [];

    this.generateGenesisBlock();
  }

  /**
   * Create the first block for the chain
   * previousHash: -1 (no previous block)
   * timestamp: time of this system running and created Genesis Block
   */
  generateGenesisBlock() {
    const index = 0;
    const previousHash = -1;
    const data = {
      message: 'This is a Genesis Block of Chain!'
    };
    const timestamp = new Date('2018/01/01').getTime();

    const block = new Block(index, previousHash, data, timestamp);
    this.chain.push(block);
  }

  /**
   * Get the latest block of the chain
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Get total of blocks in the chain
   */
  getTotalBlocks() {
    return this.chain.length;
  }

  /**
   * Get all blocks in the chain
   */
  getChain() {
    return this.chain;
  }

  /**
   * Add new block into the chain
   * @param {Object} data 
   */
  createBlock(data) {
    const previousBlock = this.getLatestBlock();
    const index = previousBlock.index + 1;
    const previousHash = previousBlock.hash;

    const block = new Block(index, previousHash, data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain = this.chain) {
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];

      if (!this.isValidBlock(currentBlock, previousBlock)) {
        return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (!this.isValidChain(newChain)) {
      console.log('\n\tReject Replace Chain, new chain is invalid');
      return false;
    }

    console.log('\n\tReplaced Chain!');
    this.chain = newChain;
  }

  addBlock(newBlock) {
    if (!this.isValidBlock(newBlock)) {
      console.log('\n\tReject invalid new block');
      return false;
    }

    this.chain.push(newBlock);
  }

  isValidBlock(block, previousBlock = this.getLatestBlock()) {
    if (block.previousHash !== previousBlock.hash) {
      return false;
    }

    const newBlock = new Block(block.index, block.previousHash, block.data, block.timestamp);
    if (block.hash !== newBlock.hash) {
      return false;
    }

    return true;
  }
}

module.exports = Chain;