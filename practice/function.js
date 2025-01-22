'use strict'

//1. Function declaration
//function naming : doSomething, command, verb
//function is object in JS

function changeName(obj){
    obj.name = 'coder';
}
const sieon = {name : 'sieon'};
changeName(sieon)
console.log(sieon)

//Default parameters
function showMessage(message = 'sieon', from){ 
    console.log(`${message} by ${from}`);
}
showMessage('name')

//Rest parameters
function printAll(...args){
    for(let i =0; i<args.length; i++){
        console.log(args[i])
    }
    for(const arg of args){
        console.log(arg)
    }

    args.forEach((arg)=>console.log(arg))
}
printAll('dream', 'coding', 'sieon')

//function expression
const print = function(){
    console.log('print')
}
print();