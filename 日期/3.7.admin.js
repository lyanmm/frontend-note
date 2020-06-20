const express = require('express');
const admin = express.Router();
//二级路由
admin.get('/index',(req,res)=>{
    res.send('/admin/index');
});
module.exports = admin;