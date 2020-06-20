// 1、模板继承
// 主要用于把网页公共部分的骨架抽离出来，要用到的时候继承这个骨架即可
// 2、模板配置
//  1.向模板中导入变量template.defaults.imports.变量名 =变量值;
//  2.设置模板根目录template.defaults.root=模板目录，可以一次渲染多个模板
//  3.设置模板默认后缀template.defaults.extname ='.art'
// exp1.
// 处理时间的模块
// const dataFormat = require('dataformat');
// const template = require('art-template');
// const path = require('path');
// const views = path.join(__dirname, 'views', 'index.art');
// 导入模板变量
// template.defaults.imports.dataFormat = dataFormat;
// const html = template(views, {
//     time: new Date()
// });
// console.log(html);
// const dataFormat = require('dataformat');
// const template = require('art-template');
// const path = require('path');
// // 导入模板变量
// template.defaults.imports.dataFormat = dataFormat;
// // 设置模板的根目录
// template.defaults.root = path.join(__dirname, 'views');
// // 设置模板默认后缀,也可以设置成html，这样就会去找html后缀的模板
// template.defaults.extname = '.art';
// const html = template('index', {
//     time: new Date()
// });
// console.log(html);
// 3、实现路由的第三方模块 router https://www.npmjs.com/package/router
// const http = require('http');
// // 引入模块
// const getRouter = require('router');
// // 获得路由对象
// const router = getRouter();
// // 设置路由
// router.get('/',(req,res)=>{
//     res.end('index');
// });
// router.get('/index',(req,res)=>{
//     res.end('index');
// });
// router.get('/test',(req,res)=>{
//     res.end('test');
// });
// const app = http.createServer();
// app.on('request',(req,res)=>{
//     // 注册路由对象
//     router(req,res,()=>{
//         console.log('注册成功');
//     });
// });
// app.listen(3000);
// console.log('server start');
// 4、serve-static 实现静态资源访问服务, 在html文件中，直接link文件名即可，无需具体到本机的路径
const path = require('path');
const queryString = require('querystring');
const serveStatic = require('serve-static');
const http = require('http');
const Router = require('router');
const template = require('art-template');
// 如果是自己创建的模块，应该写全路径，即./....
require('./connect');
const Info = require('./connect');
// 获取静态资源，
console.log(path.join(__dirname,'css'));
const serve1 = serveStatic(path.join(__dirname,'css'));
const serve2 = serveStatic(path.join(__dirname,'study'));
template.defaults.root = path.join(__dirname);
template.defaults.extname = '.html';
const router = Router();
router.get('/',(req,res)=>{
    let html = template('test',{});
    res.end(html);
});
router.post('/add',(req,res)=>{
    let formData = '';
    req.on('data',param=>{
        formData+=param;
    });
    req.on('end',async ()=>{
        console.log(queryString.parse(formData));
        await Info.create(queryString.parse(formData)).catch(err=>{console.log('插入失败',err)});
        res.writeHead(301,{
            Location :'/success'
        });
        res.end();
    });
});
router.get('/success',async (req,res)=>{
    // 这里的async/await一定要加，凡是涉及操作数据库都要异步
    let information = await Info.find();
    console.log(information);
    res.writeHead(200,{
        'Content-type':'text/html;charset=utf-8'
    });
    res.end(information.toString());
});
const app = http.createServer();
app.on('request',(req,res)=>{
    router(req,res,()=>{
        console.log('router注册成功');
    });
    serve1(req,res,()=>{});
    serve2(req,res,()=>{});
});
app.listen(3000);
console.log('server start');