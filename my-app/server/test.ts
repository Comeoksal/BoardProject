let a = 6;

console.log(a);
function add(a: number, b: number): number {
    return a + b;
}
console.log(add(1, 3));

//number, string, boolean, null, undefined, any
//void : return 필요없는 타입
//object : 객체 타입

//1 type
type Person = {
    name: string
    age: number
}
let kim: Person;

//2 union
let test: number | string;

//3 interface
interface Person2 {
    name: string
    age: number
}
interface Student extends Person {
    grage: number
}

//제네릭
function identity<NameOrNumber>(arg: NameOrNumber): NameOrNumber {
    return arg;
}

console.log(identity<string>('hi'));

interface GenericFn<T> {
    name: T;
}
let lee: GenericFn<string>;

//★
async function test2<T>(arg: T): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return arg;
}
