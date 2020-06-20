// let map = new  Map();
// map.set(undefined,4);
// map.set(null,4);
//
// console.log(map.get(undefined));  //4
// console.log(map.size);  //4

// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 它是 JavaScript 语言的第七种数据类型，
// 前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

// const obj = {
//     toString() {
//         return 'abc';
//     }
// };
// const sym = Symbol(obj);
// console.log(sym); //Symbol(abc)

// const sym = Symbol.for("wqe");
// console.log(sym.description);  //wqe  //ES2019新语法
// const sym = Symbol("wqe");
// console.log(sym.description);  //wqe  //ES2019新语法

// // 注意，Symbol 值作为对象属性名时，不能用点运算符。
// const mySymbol = Symbol();
// const a = {};
//
// a.mySymbol = 'Hello!';
// console.log(a[mySymbol]);// undefined
// console.log(a['mySymbol']); // "Hello!"
//
// // 上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。