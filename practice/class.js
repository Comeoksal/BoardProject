'use strict';

//class : template
//syntactical sygar over prototype-based inheritance

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const sieon = new Person('sieon', 24);
console.log(sieon.name)
console.log(sieon.age)

class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get age() {
        return this.age;
    }
    set age(value) {
        this._age = value;
    }
}

