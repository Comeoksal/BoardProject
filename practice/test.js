const array = require('fs').readFileSync('input.txt').toString().trim().split('\n');

const stack = [];
const result = [];

// 첫 번째 줄에서 명령어 개수를 숫자로 변환
const len = Number(array.shift());

for (let i = 0; i < len; i++) {

}

// 결과 출력
console.log(result.join('\n'));
