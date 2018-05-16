const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, previousHash, data, timestamp = new Date().getTime()) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;

    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      JSON.stringify(this.data) +
      this.timestamp
    ).toString();
  }
}

module.exports = Block;