// //1、函数参数默认值
// function append(value, array = []) {
//     array.push(value);
//     return array;
// }
// console.log(append(1));
// console.log(append(2));

// //2、解构赋值，MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// const pair = [
//     [4, 5],
//     [5, 6],
//     [6, 7]
// ];
// let newDots = pair.map(([x, y]) => ({x, y}));
// console.log(newDots);

// //3、面向对象
// class Car{
//     constructor({title}) {
//         this.title = title;
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// const car = new Car({title:'BMW'});
// console.log(car);
// console.log(car.drive());
// class Toyota extends Car{
//     constructor(options) {
//         super(options);
//         this.color = options.color;
//     }
// }
// const toyota = new Toyota({color:'red',title:'Camery'});
// console.log(toyota.drive());

//4、generator ,MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
// for..of :https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
//**迭代器和生成器：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables
function* fib(max) {
    let a=0,b=1,n=0;
    while (n<max){
        yield a;
        [a,b] = [b,a+b];
        n++;
    }
}
let gen = fib(10);
//在 for...of中，generator返回的值会自动调用其中的value属性，而不需要显式的调用f.value
for(let f of gen){
    console.log(f);
}