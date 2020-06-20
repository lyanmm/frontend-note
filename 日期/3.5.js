// 1、查
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('success/////////////////////'))
    .catch(err => console.log('链接失败*************', err));
// const userSchema = new mongoose.Schema({
//     name: String,
//     sex: String,
//     age: Number
// });
// const User = mongoose.model('User', userSchema);
// find()函数返回结果为数组（无关数量），findOne()返回查询结果中的第一个对象
// 1.find无参数时返回所有的数据
// User.find({name:'hxl'}).then(result => console.log(result));
// 2.$gt，great than 大于 ； $lt，less than 小于；$gte，great than equal大于等于
// User.find({age:{$gt:19,$lt:21}}).then(result => console.log(result));
// 3.在find中$in查询包含某字段（例子中的hobbies是一个数组）
//   select 查询某字段，在不想要的字段前加上-可以不查询，类似_id,__v是自动生成的字段，可能会自动查询出来
// User.find({hobbies:{$in:['打游戏']}}).select('-_id').then(result => console.log(result));
// 4.sort、select等，都要在find、findOne之类的函数调用后，返回的结构才能进行sort、select等
//   sort默认升序，-为降序
// User.find().sort('-age').then(result => console.log(result));
// 5.skip：跳过前n个document;limit：只取前n个document
// User.find().skip(1).limit(2).then(result => console.log(result));
// 2、删,findOneAndDelete({})删除一个，deleteMany({})删除多个
// User.findOneAndDelete({name:'lyanm'}).then(result=>console.log(result));
// 3、改,返回ok为1时，则修改成功，n为查到数量，nModified为修改数量
// updateOne({查询条件[,...]}, {要修改的值[,...]}),若查询出多个，只取第一个
// updateMany可以更改多个，查询条件为{}，即空时，就是修改所有的数据
// User.updateOne({name:'xlyanm'}, {name:'lyanm',age:30}).then(result => console.log(result))
// User.updateMany({hobbies:{$in:['睡觉']}},{age:25}).then(result => console.log(result));
// 4、插入验证,给属性赋值一个对象，对象里设置规则
// 主要规则：required:true为必须项，minlength，maxlength，trim:true（去除空格），
//         default（默认值），enum:['',...]（枚举类型，限定为enum内的值）。
//         validate自定义规则，属性值为一个对象，
//         对象里的validator属性是一个函数，传入的参数就是用户输入的值，函数返回boolean值，
//         对象里的message属性可以指定错误消息。
//         如果type为Number类型，可以设置min，max限定大小，
//         如果type为Date类型，可以在default设置Date.now，在插入数据时置空就会自动变为插入时间，
// const articleSchema = new mongoose.Schema({
// //     title:{type:String, required:true},
// //    也可以数组的形式自定义错误信息：required:[true,'此项为必填项'],也可以通过catch捕获错误（其他规则同理）
//     title: {type: String, required: [true, '此项为必填项'], minlength: 2},
//     age: {type: Number, min: 15, max: 20, default: 18},
//     date: {type: Date, default: Date.now()},
//     category: {
//         type: String,
//         enum: {
//             values: ['A', 'B', 'C'],
//             message: '请在正确范围内取值'
//         }
//     },
//     author: {
//         type: String,
//         validate: {
//             validator: v => {
//                 return v && v.length > 4
//             },
//             message: '传入的值不符合规则'
//         }
//     }
// });
// const Article = mongoose.model('Article', articleSchema);
// Article.create({category: 'D', author: 'ab'})
//     .then(result => console.log(result))
//     // 获取错误信息，传进catch里的是整个详细的错误信息对象，对象里的errors是每个错误的对象，遍历可以取得里面的message错误信息
//     .catch(error => {
//         // const err = error.errors;
//         // for (let attr in err) {
//         //     console.log(err[attr]['message']);
//         // }
//         Object.values(error.errors).forEach(value => console.log(value.message));
//     });
// 5、联合查询
// const brandSchema = new mongoose.Schema({
//     name:String,
//     country:String
// });
// const carSchema = new mongoose.Schema({
//     product:{
//         type:mongoose.Schema.Types.ObjectId,
// //      指定要关联的集合
//         ref:'Brand'
//     },
//     size:String
// });
// const Brand = new mongoose.model('Brand',brandSchema);
// const Car = new mongoose.model('Car',carSchema);
// // Brand.create({name:'Toyota',country: 'Japan'});
// Car.create({product: '5e60b796d8bfca2d84892f22',size: 'big'});
// Car.find().populate('product').then(result=>console.log(result));
// PS.页面跳转：
// res.writeHead(301,{
// Location: ''
// });
// 6、模板引擎
// 引入模板引擎
const template = require('art-template');
// 引入拼接路径模块
const path = require('path');
//template方法是用来拼接要展示的页面和数据的字符串的，
// 第一个参数为文件名（尽量用绝对路径），第二个参数为要拼接的数据
const views = path.join(__dirname,'views','index.art');
const html = template(views,{
    name:'lyanm',
    age:20
});
console.log(html);
// 7、模板引擎语法 https://aui.github.io/art-template/zh-cn/docs/
//     1.标准语法：{{数据}} 2.原始语法：<%=数据%> 原始语法中，支持js的写法
