// 1、export写法：
// // 写法一
// export var m = 1;
//
// // 写法二
// var m = 1;
// export {m};
//
// // 写法三
// var n = 1;
// export {n as m};
// 2、import：
// 写法一:
// import {xxx,xxx,xxx as xxx} from 'yyy'
// 写法二：注意这种写法只执行，不输入任何值
// import 'yyy'
// 写法三：整体加载：
//      下面是一个circle.js文件，它输出两个方法area和circumference。
//  // circle.js
//  export function area(radius) {
//      return Math.PI * radius * radius;
//  }
//  export function circumference(radius) {
//      return 2 * Math.PI * radius;
//  }
//      现在，加载这个模块。
//  // main.js
//  import * as circle from './circle';
//  console.log('圆面积：' + circle.area(4));
//  console.log('圆周长：' + circle.circumference(14));
//      注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
//  import * as circle from './circle';
//      // 下面两行都是不允许的
//  circle.foo = 'hello';
//  circle.area = function () {};
// 3、默认模块的输出输入：本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
// // export-default.js
// export default function () {
//     console.log('foo');
// }
// // import-default.js
// import customName from './export-default';
// customName(); // 'foo'
// 因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
// // 正确
// export default 42;
// // 报错
// export 42;
// // 正确
// export var a = 1;
// // 正确
// var a = 1;
// export default a;
// // 错误
// export default var a = 1;
// 4、加载规则
// 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
//
// <script type="module" src="./foo.js"></script>
// 上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。
//
// 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
//
// <script type="module" src="./foo.js"></script>
// <!-- 等同于 -->
// <script type="module" src="./foo.js" defer></script>
// 如果网页有多个<script type="module">，它们会按照在页面出现的顺序依次执行。
// 5、node中使用模块：https://es6.ruanyifeng.com/#docs/module-loader#%E6%A6%82%E8%BF%B0
// Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。
// Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。
// 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
// {
//     "type": "module"
// }
// 一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。
// # 解释成 ES6 模块
// $ node my-app.js
// 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。
// 总结为一句话：.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。
// 注意，ES6 模块与 CommonJS 模块尽量不要混用。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。
//      反过来，.mjs文件里面也不能使用require命令，必须使用import。