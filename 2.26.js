// 1、 fetch :https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
// promise:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises
// fetch("http://jsonplaceholder.typicode.com/posts")
//     .then(res=>res.json())
//     .then(data=>data.forEach(value => {
//         console.log(value.id);
//     }));
// fetch("test.txt")
//     .then(res=>res.text())
//     .then(data=> console.log(data));
//封装fetch
// class MyHttp {
//     get(url) {
//         return new Promise(((resolve, reject) => {
//             fetch(url)
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch(err => reject(err))
//         }))
//     }
//
//     post(url, data) {
//         return new Promise(((resolve, reject) => {
//             fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch(err => reject(err))
//         }))
//     }
//
//     put(url, data) {
//         return new Promise(((resolve, reject) => {
//             fetch(url, {
//                 method: "PUT",
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch(err => reject(err))
//         }))
//     }
//
//     delete(url) {
//         return new Promise(((resolve, reject) => {
//             fetch(url,{
//                 method:'DELETE',
//                 headers:{
//                     'Content-type':'application/json'
//                 }
//             })
//                 .then(res => res.json())
//                 .then(() => resolve('数据删除成功!'))
//                 .catch(err => reject(err))
//         }))
//     }
// }
//
// const data = {
//     name: 'Henry',
//     username: 'apple',
//     email: '123456@qq.com'
// };
// const http = new MyHttp();
// http.get("http://jsonplaceholder.typicode.com/users")
//     .then(data=> console.log(data))
//     .catch(err=> console.log(err));
// http.post("http://jsonplaceholder.typicode.com/users", data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// http.put("http://jsonplaceholder.typicode.com/users/2", data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// http.delete("http://jsonplaceholder.typicode.com/users/2")
// .then(data=>console.log(data))
// .catch(err=>console.log(err));

//2、async await
class MyHttp {
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async put(url, data) {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async delete(url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response.text();
    }
}

const data = {
    name: 'Henry',
    username: 'apple',
    email: '123456@qq.com'
};
const http = new MyHttp();
http.get("http://jsonplaceholder.typicode.com/users")
    .then(data => console.log(data))
    .catch(err => console.log(err));
http.post("http://jsonplaceholder.typicode.com/users", data)
    .then(data => console.log(data))
    .catch(err => console.log(err));
http.put("http://jsonplaceholder.typicode.com/users/2", data)
    .then(data => console.log(data))
    .catch(err => console.log(err));
http.delete("http://jsonplaceholder.typicode.com/users/2")
    .then(data => console.log(data))
    .catch(err => console.log(err));