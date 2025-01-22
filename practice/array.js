'use strict';

//Array

//1. declaration
const arr1 = new Array();
const arr2 = [];

const fruits = ['apple', 'banana', 'kiwi'];

console.log(fruits)
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[fruits.length-1]);
console.clear();
//Looping
for(let i=0; i<fruits.length; i++){
    console.log(fruits[i]);
}

for(let fruit of fruits){
    console.log(fruit);
}

fruits.forEach((fruit)=>{
    console.log(fruit)
})
console.clear()
//Stack
fruits.push('peach', 'strawberry');
console.log(fruits)
fruits.pop();
fruits.pop();
console.log(fruits)

//Queue //shift, unshift are slower than pop, push
fruits.unshift('lemon', 'melon');
console.log(fruits);
fruits.shift();
console.log(fruits);

//splice : remove an item by index position
fruits.splice(1, 1);
console.log(fruits);
fruits.splice(1, 1, 'watermelon');
console.log(fruits);
console.clear()
console.log(fruits);
console.log(fruits.indexOf('kiwi', 2));
console.log(fruits.includes('kiwi'));


