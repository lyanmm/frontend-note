// 1、启动mongodb
// 切换到F:\mongodb\bin 运行mongod --dbpath F:\mongodb\data
// 打开http://localhost:27017/
// 2、mongoose http://www.mongoosejs.net/
// 测试连接(如果连接的数据库不存在会自动创建数据库)
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/users', { useUnifiedTopology: true,useNewUrlParser: true } )
//     .then(() => console.log('success/////////////////////'))
//     .catch(err => console.log('链接失败*************', err));
// // 1.创建schema（理解为表）
// const userSchema = new mongoose.Schema({
//     name:String,
//     sex:String,
//     age:Number
// });
// //2.使用schema 编译成一个 Model，model是构造document的class
// // 参数： 1、集合名称 2、集合规则
// const User = mongoose.model('User',userSchema);
// 创建document（创建实体）
// const user = new User({
//     name: 'lyanm',
//     sex:'man',
//     age:22
// });
// // 3.保存，返回一个promise对象
// 方法1
// user.save().then(()=> console.log("插入成功"));
// 方法2(err永远在第一个参数)(create函数返回一个promise对象)
// User.create({name:'hxl',sex:'women',age:20})
// .then(doc=>console.log(doc));
//
// 导入文件
// mongoimport -d数据库名称-c集合名称--file要导入的数据文件
