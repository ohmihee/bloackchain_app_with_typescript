let nonce = 0;

async function generateHash(input: string): Promise<string> {  // 입력값으로 놈-256 해시 생성
    const msgBuffer = new TextEncoder().encode(input);  // UTF-8로 변환
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);   // 메시지의 해시값을 구함
    const hashArray = Array.from(new Uint8Array(hashBuffer));   // ArrayBuffer에서 Array로 변환
                                                                // Uint8Array 생성자는 부호 없는 정수의 형식화된 배열을 생성.
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');    // 바이트를 16진수로 변환
    return hashHex;
}

async function calculateHashWithNonce(nonce: number): Promise<string> {
    const data = 'Hello World' + nonce;
    return generateHash(data);
  }
  // 논스를 문자열에 추가후 다음 해시를 계산

async function mine(): Promise<void> {
  let hash: string;
    do {
      hash = await calculateHashWithNonce(++nonce);
    } while (hash.startsWith('0000') === false);
  
    console.log(`Hash: ${hash}, nonce: ${nonce}`);
  }
  // 논스를 만들어 0000으로 시작하는 해시를 생성하는 함수.
  // mine(difficulty:number):Promise<void> 이와 같이 파라미터로 값을 받을 수도 있다.

mine();