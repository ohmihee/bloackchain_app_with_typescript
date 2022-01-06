"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Block = /** @class */ (function () {
    function Block(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHAsh();
    }
    Block.prototype.calculateHAsh = function () {
        var data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    };
    return Block;
}());
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [];
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }
    Object.defineProperty(Blockchain.prototype, "latestBlock", {
        get: function () {
            return this.chain[this.chain.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Blockchain.prototype.addBlock = function (data) {
        var block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
    };
    return Blockchain;
}());
console.log('Creating the blockchain with the genesis block...');
var blockchain = new Blockchain();
console.log('Mining block #1...');
blockchain.addBlock('First block');
console.log('Mining block #2');
blockchain.addBlock('second block');
console.log(JSON.stringify(blockchain, null, 2));
