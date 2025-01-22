'use strict';

{
    const fruits = ['apple', 'banana', 'orange'];
    let result = '';
    fruits.forEach(fruit=>{
        result+=fruit + ' ';
    })
    console.log(result);
    //join
    let result2 = fruits.join(' ');
    console.log(result2);
}
{
    const fruits = 'apple, banana, kiwi, melon';
    const result = fruits.split(',');
    console.log(result);
}
{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse(); //reverse by reference
    console.log(result);
}
{
    const array = [1, 2, 3, 4, 5];
    const result = array.splice(2, 5);
    console.log(result);
    console.log(array);
}
{
}