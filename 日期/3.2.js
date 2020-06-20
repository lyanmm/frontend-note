// 1、请求报文、响应报文
//http模块 创建服务器
// const http = require('http');
// //url模块 解析url
// const url = require('url');
// const app = http.createServer();
// app.on('request', (req, res) => {
//     // req.method获取请求方式
//     // req.url获取请求地址
//     // url.parse(url,[boolean])处理url
//     res.writeHead(200, {
//         'content-type': 'text/html;charset=utf-8',
//         'hello': 'world'
//     });
//     // 若添加第二个参数为true（默认false），则返回的对象中，query属性会进一步自动分隔&，并保存为一个对象
//     let {query, pathname} = url.parse(req.url, true);
//     console.log(query.name);
//     console.log(pathname);
//     if (pathname === '/' || pathname === '/index') {
//         res.end('<h2>欢迎来到首页</h2>')
//     } else {
//         res.end('not found');
//     }
//     if (req.method === 'POST') {
//         console.log('post');
//     } else if (req.method === 'GET') {
//         console.log('get');
//     }
// });
// app.listen(3000);
// console.log('sever start');
// 2、请求参数
// const http = require('http');
// const app = http.createServer();
// //处理请求参数模块,可以处理形如key=value&key=value的字符串
// const queryString = require('querystring');
// // 当有请求到达时
// app.on('request', (req, res) => {
//     let postParams = '';
//     req.on('data', params => {
//         postParams += params;
//     });
//     req.on('end', () => {
//         console.log(queryString.parse(postParams));
//     });
//     res.end('ok');
//
// });
// app.listen(3000);
// console.log('sever start');
// 3、路由
//   1.获取客户端的请求方式
//   2.获取客户端的请求地址
// const http = require('http');
// const app = http.createServer();
// const url = require('url');
// app.on('request', (req, res) => {
//     const method = req.method.toLowerCase();
//     const pathname = url.parse(req.url).pathname;
//
//     res.writeHead(200, {
//         'content-type': 'text/html;charset=utf8'
//     });
//     if (method === 'get') {
//         if (pathname === '/' || pathname === '/index') {
//             res.end('首页');
//         } else {
//             res.end('not found');
//         }
//     } else if (method === 'post') {
//
//     }
// });
// app.listen(3000);
// console.log('server start');
// 4、http请求与响应
//  1.静态资源：服务器端不需要处理,可以直接响应给客户端的资源就是静态资源，例如CSS、JavaScript、 image文件。
//  2.动态资源：相同的请求地址不同的响应资源。
// const http = require('http');
// const app = http.createServer();
// const url = require('url');
// const path = require('path');
// const fs = require('fs');
// const mime = require('mime');
// app.on('request', (req, res) => {
//     let pathname = url.parse(req.url).pathname;
//     //访问首页的bug
//     pathname = pathname === '/' ? '/test.html' : pathname;
//     //讲用户请求的路径转换为实际的服务器硬盘路径
//     let realPath = path.join(__dirname, pathname);
//     //增强浏览器兼容性，确保类型正确
//     let type = mime.getType(realPath);
//
//     fs.readFile(realPath, (err, data) => {
//         if (err != null) {
//             res.writeHead(404, {
//                 'content-type': 'text/html;charset=utf-8'
//             });
//             res.end('文件读取失败！');
//         } else {
//             res.writeHead(200, {
//                 'content-type': type
//             });
//             res.end(data);
//         }
//     });
// });
// app.listen(3000);
// console.log('server start');
// 5、同步/异步API
// 回调函数：自己定义的函数让别人（适时）调用
// function getMsg(callback) {
//     setTimeout(function () {
//         callback({
//             msg: 'hello'
//         })
//     }, 2000);
// }
// getMsg(function (msg) {
//     console.log(msg);
// });
// 6、用promise解决回调地狱：
// 要求：依次调用文件1.txt，2.txt，3.txt
// 读文件时，注意要设置文本编码 'utf-8'
// const fs = require('fs');
// function p1() {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./1.txt', 'utf-8',(err, data) => {
//             if (err != null) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }
//
// function p2() {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./2.txt', 'utf-8',(err, data) => {
//             if (err != null) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }
//
// function p3() {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./3.txt', 'utf-8',(err, data) => {
//             if (err != null) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }
//
// p1().then(data1 => {
//     console.log(data1);
//     return p2();
// }).then(data2 => {
//     console.log(data2);
//     return p3();
// }).then(data3 => {
//     console.log(data3);
// });
// 7、异步函数
//   async关键字
//    1.普通函数定义前加async关键字普通函数变成异步函数
//    2.步函数默认返回promise对象
//    3.在异步函数内部使用return关键字进行结果返回结果会被包裹的promise对象中return关键字代替 了resolve方法
//    4.在异步函数内部使用throw关键字抛出程序异常
//    5.调用异步函数再链式调用then方法获取异步函数执行结果
//    6.调用异步函数再链式调用catch方法获取异步函数执行的错误信息
//   await关键字
//    1. await关键字只能出现在异步函数中
//    2. await promise await后面只能写promise对象写其他类型的API是不不可以的
//    3. await关键字可是暂停异步函数向下执行直到promise返回结果

// 案例：用异步函数的形式包装读取文件的操作：
const fs = require('fs');
// 改造现有异步函数api让其返回promise对象从而支持异步函数语法。取得util模块下的promisify方法，但是不执行
const promisify = require('util').promisify;
// 执行promisify，把要包装的函数传入，就能返回一个新的函数
const readFile = promisify(fs.readFile);
async function run() {
    let r1 = await readFile("./1.txt","utf-8");
    let r2 = await readFile("./2.txt","utf-8");
    let r3 = await readFile("./3.txt","utf-8");
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();

