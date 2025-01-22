//1. Use Strict
// added in ES 5, user this for valina js
'use strict';

console.log('Hello world!!!!');

//2. Variable (number, string, boolean, null, undefind. symbol)
//let (added in ES6)

let name = 'sieon'
console.log(name)
name = 'hello'
console.log(name)

//var (don't ever use this)
//var hoisting(move declaration from bottom to top)
// var has no block scope

//constants (vs mutable)
//1. safety 2. thread safety 3. reduce human mistake
const daysInweek = 7
const maxNumber = 5
const bigInt = 21345678902345678972345678914235678934624653645n
console.log(`value : ${daysInweek} ${typeof daysInweek}`) //backtick
console.log(`value : ${bigInt} ${typeof bigInt}`)

//boolean
// false : 0, null, undefined, NaN, ''
// true : any other value

// symbol, create unique identifiers for objects
const symbol1 = Symbol('id')
const symbol2 = Symbol('id')
console.log(symbol1===symbol2) //false (Symbol is unique identifier)
const symbol3 = Symbol.for('id')
const symbol4 = Symbol.for('id')
console.log(symbol3===symbol4) 
console.log(`value : ${symbol1.description}, type : ${typeof symbol1}`) //symbol use .description

//dynamic typing : dynamically type language
let text = 'hello'
console.log(`value : ${text}, type ${typeof text}`)
text = 1
console.log(`value : ${text}, type ${typeof text}`)
text = '7' + 5
console.log(`value : ${text}, type ${typeof text}`)
text = '8'/'2'
console.log(`value : ${text}, type ${typeof text}`)