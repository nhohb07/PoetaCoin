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
  addBlock(data) {
    const previousBlock = this.getLatestBlock();
    const index = previousBlock.index + 1;
    const previousHash = previousBlock.hash;

    const block = new Block(index, previousHash, data);
    this.chain.push(block);

    return block;
  }
}

module.exports = Chain;