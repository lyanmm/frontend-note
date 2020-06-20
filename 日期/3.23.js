// var proxy1 = new Proxy({}, {
//     get(target, propKey) {
//         return 35;
//     }
// });
//
// // console.log(proxy1.time);
//
// let obj = {
//     proxy:new Proxy({},{
//         get(target, propKey) {
//             return 35;
//         }
//     })
// };
// console.log(obj.proxy);

// 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
// https://es6.ruanyifeng.com/#docs/proxy

// function timeout() {
//     return new Promise((resolve, reject) => {
//         let flag = false;
//         if (flag) {
//             resolve("success");
//         } else {
//             reject("failed");
//         }
//     });
// }
//
// timeout()
//     .then((value) => {
//         console.log(value);
//     })
//     .catch(error => {
//         console.log(error)
//     });

// promise在ajax中的举例:
// const getJSON = function(url) {
//     const promise = new Promise(function(resolve, reject){
//         const handler = function() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         };
//         const client = new XMLHttpRequest();
//         client.open("GET", url);
//         client.onreadystatechange = handler;
//         client.responseType = "json";
//         client.setRequestHeader("Accept", "application/json");
//         client.send();
//
//     });
//
//     return promise;
// };
//
// getJSON("http://jsonplaceholder.typicode.com/users").then(function(json) {
//     console.log('Contents: ' + json);
// }, function(error) {
//     console.error('出错了', error);
// });


const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result)
    .catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result)
    .catch(e => e);

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));