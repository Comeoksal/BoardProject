'user strict';

//primitive type vs reference type

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const sieon = new Person('sieon', 24);
const obj1 = {}; //object literal
const obj2 = new Object(); // object constructor

//if you want to typing by dynamic
function printValue(obj, key) {
    console.log(obj[key]); // do not use obj.key
}
printValue(sieon, 'age');

for (key in sieon) {
    console.log(key);
}
