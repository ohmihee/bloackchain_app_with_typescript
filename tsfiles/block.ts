interface Block {
    index:number; // 순차적 블록번호
    timestamp:number;  // 새 블록이 블록체인에 추가된 날짜와 시간
    data:string;   // 한 번 이상의 거래에 대한 데이터
    nonce:number;  // 채굴자들이 알아내야할 숫자
    hash:string;   // 이 블록의 해시
    previousBlockHash:string;   // 이전 블록의 해시값
}