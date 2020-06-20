// 1、string中的padStart/padEnd
// let str = "abcd123";
// console.log(str.padEnd(10,"as")); //abcd123asa
// console.log(str.padStart(10,"as")); //asaabcd123
// 2、Array.from() : 可以把一个类数组转换成数组
// <ul>
//     <li></li>
//     <li></li>
//     <li></li>
//     <li></li>
//     <li></li>
// </ul>
// console.log(Array.from(document.getElementsByTagName("li")));  //[li,li,li,li,li]
// var arr = ["a", , ,];
// var sparseKeys = Object.keys(arr);
// console.log(sparseKeys);//[ '0' ]
// console.log(arr.length);//3
//es6:在es6中一般把数组的空位处理成undefined
// for (let key of arr){
//     console.log(key);
//     //a
//     // undefined
//     // undefined
// }
// //es5：一般直接跳过数组空位
// for (let key in arr){
//     console.log(key); //0
// }
// 3、function.length:
// length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。
// 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
// console.log((function(a, b , c= 1,d) {}).length); //2
// 4、
// function f(...arg) {
//     console.log(arguments);
//     console.log(arg);
//     [...arr] = arguments;
//     console.log(arr);
// }
// f(1,2,3);
// [Arguments] { '0': 1, '1': 2, '2': 3 }
// [ 1, 2, 3 ]
// [ 1, 2, 3 ]
// 5、在对象中，属性名加上中括号就可以使用外面定义的变量（字符串类型）做属性名
// let str = "name";
// let obj = {
//     [str]:"123"
// };
// console.log(obj.name); //123
// console.log(obj.str); //undefined
// console.log(Object.is(NaN, NaN));  //true

// let obj1 = {name:"hxl"};
// let obj2 = {age: 3};
// let obj3 = {...obj1,...obj2};
// console.log(obj3);
// 6、对象里的get、set关键字：
// get:获取属性值时会触发的函数
// set：设置属性值时会触发的函数
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set
let obj = {
    get name(){
        return 666;
    },
    set age(num){
        console.log(num);
    }

};
console.log(obj.name); //666
delete obj.name;
console.log(obj.name); //undefined
obj.age = 777; // 777
console.log(obj.age); //undefined，如果对象里有age:888，输出的则是空，因为命名冲突了，
// 所以要想不冲突就要设置 get age(){ return xxx;},这样取得obj.age时就会触发get，就能获取值

