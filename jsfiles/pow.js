"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Block = /** @class */ (function () {
    // readonly 
    // 읽기전용속성 
    // 즉 다른 값을 대입하는 등의 작업 불가.
    function Block(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        var _a = this.mine(), nonce = _a.nonce, hash = _a.hash;
        this.nonce = nonce;
        this.hash = hash;
    }
    Block.prototype.calculateHash = function (nonce) {
        //해당 클래스 내에서만 접근 가능, 즉 자식 클래스 등이 접근할 수 없음
        var data = this.index + this.previousHash + this.timestamp + this.data + nonce;
        return crypto.createHash('sha256').update(data).digest('hex');
    };
    Block.prototype.mine = function () {
        // 파라미터는 받지 않음
        // return 값의 타입은  {nonce:number,hash:string}
        var hash;
        // hash의 타입은 스트링
        var nonce = 0;
        // nonce에 0 대입 
        do {
            hash = this.calculateHash(++nonce);
        } while (hash.startsWith('00000') === false);
        return { nonce: nonce, hash: hash };
    };
    return Block;
}());
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [];
        // Create Genesis Block
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }
    Object.defineProperty(Blockchain.prototype, "latestBlock", {
        // chain의 타입은 배열인데 해당 배열안에 요소는 Block타입
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
console.log('Mining block #2...');
blockchain.addBlock('Second block');
console.log(JSON.stringify(blockchain, null, 2));
