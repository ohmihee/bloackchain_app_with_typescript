import * as crypto from 'crypto';

class Block {
    readonly hash:string;   // 블록 해시값

    constructor (
        readonly index:number,   // 블록 인덱스 순차적으로 매겨짐
        readonly previousHash:string,  
        readonly timestamp:number,
        readonly data:string
    ){
        this.hash = this.calculateHAsh()   // 생성된 블록 해시값 계산
    }

    private calculateHAsh():string{
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
                    .createHash('sha256')  // SHA-256 해시를 생성하기 위해 Hash의 인스턴스를 생성
                    .update(data)   // 해시 객체 내 해시값을 계산하고 업데이트
                    .digest('hex')  // 해시값은 16진수로 변환
    }
}

class Blockchain {
    private readonly chain: Block[] = [];   // 블록체인을 저장
    private get latestBlock(): Block {      // 가장 최근에 추가된 블럭 정보를 가져옴
        return this.chain[this.chain.length - 1];
    }

    constructor() {
        this.chain.push(new Block(0,'0',Date.now(),'Genesis block'))  // 제네시스 블럭 생성 후 체인에 추가
    }

    addBlock(data:string):void {
        const block = new Block(   // 새 블록 인스턴스를 생성하고 각 프로퍼티를 추가
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        )
        this.chain.push(block)   // 배열에 블록 추가
    }
 }

 console.log('Creating the blockchain with the genesis block...')
 const blockchain = new Blockchain();

 console.log('Mining block #1...');
 blockchain.addBlock('First block')

 console.log('Mining block #2');
 blockchain.addBlock('second block');

 console.log(JSON.stringify(blockchain,null,2))