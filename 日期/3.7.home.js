const express = require('express');
const home = express.Router();
//二级路由
home.get('/index',(req,res)=>{
    res.send('/home/index');
    // 可获取请求参数，并自动转换为对象
    console.log(req.query);
});
module.exports = home;