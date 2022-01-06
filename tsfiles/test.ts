interface Block {
    index:number;   // 순차적 블록번호
    timespame:number;  // 새 블록이 블록체인에 추가된 날짜와 시간
    data:string;   //거래에 대한 내용
    nonce:number;  // 일정한 조건을 충족시키는 / 채굴자들이 알아내야할 숫자
    hash:string;  // 블록의 해시
    previousBlockHash:string;  //이전 블록의 해시값
}