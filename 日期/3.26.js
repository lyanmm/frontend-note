// 1、class
// // 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
//
// class Point {
//     constructor(x, y) {
//         // ...
//     }
//
//     toString() {
//         // ...
//     }
// }
//
// Object.keys(Point.prototype)
// // []
// Object.getOwnPropertyNames(Point.prototype)
// // ["constructor","toString"]
// // 上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。
//
// var Point = function (x, y) {
//     // ...
// };
//
// Point.prototype.toString = function() {
//     // ...
// };
//
// Object.keys(Point.prototype)
// // ["toString"]
// Object.getOwnPropertyNames(Point.prototype)
// // ["constructor","toString"]
// // 上面代码采用 ES5 的写法，toString方法就是可枚举的。

// 2、class继承：
// super：
// 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
// 以下为第二种情况的示例：
// 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
// class A {
//     constructor() {
//         this.x = 1;
//     }
// }
// class B extends A {
//     constructor() {
//         super();
//         this.x = 2;
//         super.x = 3;
//         // A.prototype.x = 4;
//         console.log(super.x); // undefined
//         console.log(this.x); // 3
//     }
// }
// let b = new B();
// 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
// 也就是说，super在普通函数作为对象时，在写入操作（赋值）时，指向的是子类的this，在读取操作时，指向的是父类的原型（A.prototype）

class A {}

class B extends A {
    constructor() {
        super();
        B.x = 5;
        console.log(super.valueOf() instanceof B); // true
    }
}

let b = new B();