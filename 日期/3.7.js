// 1、express框架
//引入框架
// const express = require('express');
// // 创建网站服务器
// const app = express();
// app.get('/',(req,res)=>{
//     // send()
//     // 1.send方法内部会检测响应内容的类型
//     // 2.send方法会自动设置http状态码
//     // 3.send方法会帮我们自动设置响应的内容类型及编码
//     res.send('Hello')
// });
// app.listen(3000);
// console.log('server start');
// 2、中间件：中间件就是一些方法，可以接收客户端发来的请求、可以对请求做出响应,也可以将请求继续交给下一一个中间件继续处理。
// 中间件主要由两部分构成，中间件方法以及请求处理函数。
// 中间件方法由框架提供，负责拦截请求；请求处理函数由开发人员提供，负责处理请求。
// 中间件的匹配是按顺序的
// 3、错误处理中间件：当程序有一些可能发生错误的地方，用next(err)将错误传出，最后用错误处理中间件处理。
// app.use((err,req,res,next)=>{});
// 4、构建模块化路由：
const express = require('express');
const path = require('path');

// 创建网站服务器
const app = express();
// // 引入模块路由对象
// const home = require('./3.7.home');
// const admin = require('./3.7.admin');
// // 为路由对象匹配请求路径
// app.use('/home',home);
// app.use('/admin',admin);
app.listen(3000);

// 5、获取请求参数
// GET
// home.get('/index',(req,res)=>{
//     // req.query可获取请求参数，并自动转换为对象
//     console.log(req.query);
// });
// POST
// 引入模块
// const bodyParser = require('body-parser');
// // 配置body-parser模块
// app.use(bodyParser.urlencoded({extended:false}));
// app.post('/body',(req,res)=>{
//     console.log(req.body);
// });
// ps.   use方法的妙用：
// use()里要传递一个方法，可以只先传递一个方法的引用，具体的实现可以在外面写，
// 但是传递的这个方法最后一定要返回一个(req,res,next)=>{}。外面定义的这个方法可以穿参进去，
// 这样就能实现更多的功能。
// use(fn({a:1}));
// function fn(obj) {
//     console.log(obj);
//     return (req,res,next)=>{
//         console.log(obj);
//         next();
//     }
// }
// 6、路由参数
// app.get('/find/:name&:age',(req,res)=>{
//     console.log(req.params);
//     res.send('find'+req.params.name);
// });
// 多个参数之间可以用一些常见的符合（不要随便乱用）， & 、 / 这种，就可以分隔多个参数
// URL：http://localhost:3000/find/123&456  //log{ name: '123', age: '456' }
// URL：http://localhost:3000/find/123/456  //log{ name: '123', age: '456' }
// 7、处理静态资源：  express.static(绝对路径)
// 方法1：直接映射到主页
// app.use(express.static(path.join(__dirname, 'image')));
// // 在浏览器输入http://localhost:3000/...就能访问静态资源了，无需画蛇添足http://localhost:3000/image/...
// //方法2：任意添加一个路由
// app.use('/static', express.static(path.join(__dirname, 'image')));
// //浏览器输入http://localhost:3000/static/...
// // 8、express模板引擎
// // 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
// // 1)模板后缀
// // 2)使用的模板引擎
// app.engine('art', require('express-art-template'));
// // 2.设置模板存放目录
// // 1)固定参数，意为正在设置模板引擎
// // 2)设置模板路径
// app.set('views', path.join(__dirname, 'views'));
// // 3.渲染模板时不写后缀默认拼接art后缀
// // 1)固定参数，意为正在设置模板引擎的后缀
// // 2)设置后缀
// app.set('view engine', 'art');
// app.get('/index', (req, res) => {
//     //渲染模板
//       参数：1)模板的名称 2)数据
//     res.render('index', {
//         // 1.拼接模板路径
//         // 2.拼接模板后缀
//         // 3.哪一个模板和哪一个数据进行拼接
//         // 4.将拼接结果响应给了客户端
//         msg: 'message'
//     });
// });
// 9、app.locals：将变量设置到app.locals对象下面，这个数据在所有的模板中都可以获取到。
app.locals.users={
    name:'lyanm'
};
// 然后在所有的.art中，使用{{users}}就能访问到这个变量的数据了。
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.get('/index', (req, res) => {
    res.render('index');
});