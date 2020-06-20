//1、promise and async/await
// function getPost() {
//     let output='';
//     posts.forEach((p,index)=>{
//         output+=`${p.title}`;
//     });
//     console.log(output);
// }
// function createPost(post) {
//     posts.push(post);
// }
// const posts = [
//     {title: "Post1", body: "p1"},
//     {title: "Post2", body: "p2"}
// ];
// getPost();
// createPost({title:"Post3",body:"p3"});
//
// async function fetchUsers() {
//     const res = await fetch("");
//     const data = await res.json();
//     console.log(data);
// }
// let promise = fetchUsers();

//2、node
//2.1 模块开发
//方法1
// const add = (a, b) => a + b;
// exports.add = add;
//方法2
// const a = 100;
// module.exports.a = a;
//当module.exports被重新赋值时，以module.exports为准
// module.exports = {
//     name: "abc"
// };
//即如果另一文件在使用该模块（文件）时，最终输出{ name: 'abc' }，
// 而不是原来的{ add: [Function: add], a: 100 }
// const b = {b: 100};
// exports.b = b;
//即使exports重新赋值，也以module.exports为准
// 2.2 fs
// const fs = require('fs');
// 2.2.1读取文件
// fs.readFile('./test.txt', 'utf-8',
//     (err, data) => {
//         if (err == null) {
//             console.log(data);
//         }
//     });
// 2.2.2 写入文件，若文件不存在，则自动生成一个；若文件存在，则覆盖原文件写入
// const str = "666";
// fs.writeFile('./test.txt',str,err => {
//     if (err!=null){
//         console.log(err);
//         return;
//     }else {
//         console.log("写入成功！")
//     }
// });
// 2.2 path路径拼接
// const path = require('path');
// let finalPath = path.join('public','uploads');
// console.log(finalPath);
//相对路径和绝对路径的应用 __dirname能获取绝对路径,__能获取当前文件的绝对路径
// console.log(path.join(__filename));
// console.log(path.join(__dirname,'test.txt'));
