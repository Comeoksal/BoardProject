const array = require('fs').readFileSync('input.txt').toString().trim().split('\n');

const stack = [];
const result = [];

const N = Number(array.shift());
let checkNo = false;
let stack_number = 1;

for (let i = 0; i < N; i++) {
    let a = Number(array[i]);
    for (; stack_number <= a; stack_number++) {
        stack.push(stack_number);
        result.push('+');
    }
    if (stack[stack.length - 1] === a) {
        stack.pop();
        result.push('-');
    } else {
        checkNo = true;
        break;
    }
}
if (!checkNo) {
    console.log(result.join('\n'));
} else {
    console.log('No');
}