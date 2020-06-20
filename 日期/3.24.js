// console.log(Symbol.iterator);
// https://es6.ruanyifeng.com/#docs/iterator#%E9%BB%98%E8%AE%A4-Iterator-%E6%8E%A5%E5%8F%A3
// https://es6.ruanyifeng.com/#docs/iterator#%E4%B8%8E%E5%85%B6%E4%BB%96%E9%81%8D%E5%8E%86%E8%AF%AD%E6%B3%95%E7%9A%84%E6%AF%94%E8%BE%83

// 扩展运算符（...）也会调用默认的 Iterator 接口。
//
// // 例一
// var str = 'hello';
// [...str] //  ['h','e','l','l','o']
//
// // 例二
// let arr = ['b', 'c'];
// ['a', ...arr, 'd']
// // ['a', 'b', 'c', 'd']
// 上面代码的扩展运算符内部就调用 Iterator 接口。
//
// 实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。
//
// let arr = [...iterable];

// let str = "asd";
// console.log([...str]);  //[ 'a', 's', 'd' ]

// var someString = "hi";
// console.log(typeof someString[Symbol.iterator]);// "function"
// var iterator = someString[Symbol.iterator]();
// console.log(iterator.next());  // { value: "h", done: false }
// console.log(iterator.next());  // { value: "i", done: false }
// console.log(iterator.next());  // { value: undefined, done: true }




// function* helloWorld() {
//     let obj = {a:1};
//     yield ["a","s","d"];
//     yield obj;
//     return "qwe";
// }
// let hw = helloWorld();
// for (let i of hw){
//     console.log(i);
// }
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// yield:
// 需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
// 因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
//
// function* gen() {
//     yield  123 + 456;
// }
// 上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

// next用法： https://es6.ruanyifeng.com/#docs/generator#next-%E6%96%B9%E6%B3%95%E7%9A%84%E5%8F%82%E6%95%B0
// 向 Generator 函数内部输入值的例子。
// function* dataConsumer() {
//     console.log('Started');
//     console.log(`1. ${yield}`);
//     console.log(`2. ${yield}`);
//     return 'result';
// }
// let genObj = dataConsumer();
// genObj.next();
// // Started
// genObj.next('a')
// // 1. a
// genObj.next('b')
// // 2. b
// 上面代码是一个很直观的例子，每次通过next方法向 Generator 函数输入值，然后打印出来。

// test:
// function* dataConsumer() {
//     console.log('Started'); // Started
//     console.log(1+ (yield 2));  // 4
//     console.log(`2. ${yield}`); // 2. b
//     return 'result';
// }
// let genObj = dataConsumer();
// console.log(genObj.next());  // { value: 2, done: false }
// genObj.next(3);
// genObj.next('b');


// var clock = function* () {
//     while (true) {
//         console.log('Tick!');
//         yield;
//         console.log('Tock!');
//         yield;
//     }
// };
//
// let c = clock();
// c.next();  //Tick!
// c.next();  //Tock!
// c.next();  //Tick!
// c.next();  //Tock!


// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
//
// function* iterEntries(obj) {
//     let keys = Object.keys(obj);
//     for (let i=0; i < keys.length; i++) {
//         let key = keys[i];
//         yield [key, obj[key]];
//     }
// }
//
// let myObj = { foo: 3, bar: 7 };
//
// for (let [key, value] of iterEntries(myObj)) {
//     console.log(key, value);
// }
//
// // foo 3
// // bar 7
// 上述代码中，myObj是一个普通对象，通过iterEntries函数，就有了 Iterator 接口。