//String
console.log('my' + 'cat')
console.log('1' + 2);
console.log(`string literals : 1 + 2 = ${1 + 2}`);

//Equality
const stringFive = '5';
const numberFive = 5;

console.log(stringFive == numberFive);
console.log(stringFive != numberFive);

//strict Equality
console.log(stringFive === numberFive);
console.log(stringFive !== numberFive);

//object equality by reference
const name1 = { name: 'sieon' };
const name2 = { name: 'sieon' };
const name3 = name1;
console.log(name1 == name2) //false
console.log(name1 === name2) //false
console.log(name1 === name3) //true
console.log('---------------')
console.log(0 == false) //true
console.log(0 === false) //false
console.log('' == false) //true
console.log('' === false) //false
console.log(null == undefined) //true
console.log(null === undefined) //false
console.log('---------------')
