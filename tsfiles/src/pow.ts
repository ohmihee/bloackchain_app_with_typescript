import * as crypto from 'crypto';
import { isWhileStatement } from 'typescript';

class Block {
    readonly nonce:number;   // nonce 프로퍼티
    readonly hash:string;
    // readonly 
    // 읽기전용속성 
    // 즉 다른 값을 대입하는 등의 작업 불가.

    constructor (
        readonly index:number,
        readonly previousHash:string,
        readonly timestamp:number,
        readonly data:string
    ){
        const {nonce, hash} = this.mine();    // 논스와 해시를 계산
        // mine()의 리턴값은 {nonce,hash}
        this.nonce = nonce;
        this.hash = hash;
    }

    private calculateHash(nonce:number):string {
    //해당 클래스 내에서만 접근 가능, 즉 자식 클래스 등이 접근할 수 없음
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce;   
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    private mine(): {nonce:number,hash:string} {
        // 파라미터는 받지 않음
        // return 값의 타입은  {nonce:number,hash:string}
        let hash: string;
        // hash의 타입은 스트링
        let nonce = 0
        // nonce에 0 대입 
        do {
            hash = this.calculateHash(++nonce);
        }while( hash.startsWith('00000') === false );
        // 해시시작값이 00000이 될 때까지 반복문 실행하며 nonce값 1씩 증가
        // 00000과 해시시작값이 일치할때까지 논스값을 증가시키며 논스값을 찾음
        // 찾은 논스값으로 hash 만듦. 
        
        return {nonce, hash}
    }
}

class Blockchain {
    private readonly chain:Block[] = [];
    // chain의 타입은 배열인데 해당 배열안에 요소는 Block타입

    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    constructor(){
        // Create Genesis Block
        this.chain.push(new Block(0,'0',Date.now(),'Genesis block'))
    }

    addBlock(data:string):void {
        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        );
        this.chain.push(block);
    }
}

console.log('Creating the blockchain with the genesis block...');
const blockchain = new Blockchain();

console.log('Mining block #1...');
blockchain.addBlock('First block');

console.log('Mining block #2...');
blockchain.addBlock('Second block');

console.log(JSON.stringify(blockchain, null, 2));
