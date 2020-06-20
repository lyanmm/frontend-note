//大部分文件在webpack内！
// 0、安装webpack：npm install --save-dev webpack-cli webpack
// 1、编译sass ：npm install sass-loader node-sass css-loader style-loader --save-dev
// 2、语法检查 ：
//  1.在 package.json中配置规则：
// "eslintConfig": {
//     "parserOptions": {
//         "ecmaVersion": 6, //支持es6
//             "sourceType": "module"  //使用es6模块化
//     },
//     "env": {  //设置环境
//         "browser": true,  //支持浏览器环境：能使用window上的全局变量
//             "node": true  //支持服务器环境：能使用node上global的全局变量
//     },
//     "globals": {  //声明使用的全局变量，这样即使没有定义也不会报错
//         "$": "readonly"  //$只读变量
//      "Promise": "readonly" //跳过promise的检查，因为babel暂时无法识别
//     },
//     "rules": {  //eslint检查的规则 0 忽略 1警告 2 错误
//         "no-console": 2, //不检查console
//             "eqeqeq": 2, //不用===就报错
//             "no-alert": 2 //不能使用alert
//     },
//     "extends": "eslint:recommended"  //使用eslint推荐的默认规则 https://cn.eslint.org/docs/rules/
// }
//
// 3、语法转换：npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
// 在webpack配置文件中，module->rules 中加入
//  {
//      test: /\.js$/,
//          exclude: /(node_modules|bower_components)/,
//      use: {
//      loader: 'babel-loader',
//          options: {
//          presets: ['@babel/preset-env']
//      }
//  }
//  }
// 4、不同浏览器兼容性
// 方法一：polyfill(不太推荐)
// 1.npm install @babel/polyfill
// 2.入口文件：import '@babel/polyfill'
// 方法二：按需引入
// 1.npm install core-js
// 2.设置webpack配置文件，在babel-loader下添加options
// options: {
//     presets: [
//         ['@babel/preset-env',
//             {
//                 useBuiltIns: 'usage',//按需引入polyfill
//                 corejs: {version: 3},
//                 targets: {//指定兼容哪些浏览器的哪些版本
//                     "chrome": "58",
//                     "ie": "11"
//                 }
//             }]
//     ],
//         cacheDirectory: true//开启babel缓存
// }
// 5、加载优化图片文件：
// 1.npm i url-loader file-loader -D
// 2.options:
// {
//     test: /\.(png|jpg|gif)$/,
//         use: [
//     {
//         loader: 'url-loader',
//         options: {
//             // 输出路径
//             outputPath:'./images',
//             //冒号后面可以指定hash后的文件名长度
//             name: '[hash:5].[ext]',
//             // 引入图片的路径（url）,即指定发布目录，不指定的话图片将无法引入，background-image属性失效
//             // ps.这个路径是以webpack配置文件为起点
//             publicPath:'../dist/images',
//             limit:8192,
//             esModule:false
//         }
//     }
// ]
// }
// 6、打包html文件：
// 1.npm install --save-dev html-webpack-plugin
// 2.var HtmlWebpackPlugin = require('html-webpack-plugin');
//   var path = require('path');
// 3. plugins: [new HtmlWebpackPlugin()]

