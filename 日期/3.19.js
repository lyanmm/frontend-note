// 1、使用自动编译打包运行：
// 编译完的文件会放到一个“服务器”里，
// 所以相应的webpack配置文件里的静态资源路径要修改，例如图片路径
// 1.npm install webpack-dev-server --save-dev
// 2.配置文件plugins后增加
// devServer: {
//     open:true,//自动打开浏览器
//         compress:true,//启动gzip压缩
//         port:3000,//端口号
//         hot:true//打开HMR
// }
// 3.增加一个短命令优化操作：
// 在package.json中增加
// "scripts": {
//     "start": "webpack-dev-server"
// },
// 4.启动：npm start
// ps.5.优化服务器性能 ：
// 把HMR打开 hot:true （HMR模块热替换），修改css无需刷新浏览器就有效果
// 但是会导致浏览器无法自动刷新，当html、js改变无效果，所以需要同时需要修改入口，
// entry: ['./src/js/index.js','./src/index.html']
// 2、devtool：
// 一种将压缩/编译文件中的代码映射回源文件中的原始位置的技术
// 开发环境: cheap-module-eval-source-map
// 生产环境: cheap-module-source-map
// 3、准备生产环境
// 1.创建config目录文件夹，拷贝配置文件并修改名称为 webpack.dev,js 和 webpack.prod.js
// 2.生产环境下配置文件中删除devServer,output:{}中增加 publicPath: "/"
// 3.执行webpack时加上要使用的配置文件 --config ./config/webpack.prod.js
// 4.因为生成的dist文件夹在config里，所以输出路径output:{}里修改为path: path.resolve(__dirname, '../dist'),
// 5.配置文件中mode修改为mode: 'production',
// 6.package.json中配置脚本：
// "start": "webpack-dev-server --config ./config/webpack.dev.js",
// "build": "webpack --config ./config/webpack.prod.js"
// 7.为开发搭建简易测试服务器：
// 安装：npm i serve -g
// 开启：serve -s build -p 5000
// 8、清理打包文件目录里的非src文件夹编译来的文件：
// 1. npm i clean-webpack-plugin --save-dev
// 2.生产环境配置文件引入 ：const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// plugin下 ：new CleanWebpackPlugin()
// 9、提取css成单独文件
// 1.npm i mini-css-extract-plugin --save-dev
// 2.const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 3.new MiniCssExtractPlugin({filename: "css/[name].css"})
// 4.{
//     test: /\.less$/,
//         use: [
//         MiniCssExtractPlugin.loader,
//         'css-loader',
//         'less-loader'
//     ]
// }
// 10、css兼容性：
// 1.npm install postcss-loader postcss-flexbugs-fixes postcss-preset-env postcss-normalize autoprefixer --save-dev
// 2.use: [
//     MiniCssExtractPlugin.loader,
//     'css-loader',
//     {
//         loader: "postcss-loader",
//         options: {
//             ident: 'postcss',
//             plugins: () => [
//                 require('postcss-flexbugs-fixes'),
//                 require('postcss-preset-env')({
//                     autoprefixer: {
//                         flexbox: 'no-2009'
//                     },
//                     stage: 3,
//                 }),
//                 require('postcss-normalize')(),
//             ],
//             sourceMap: true,
//         }
//     },
//     'less-loader'
// ]
// 3.新建配置文件：.browserslistrc
// 内容为 ：last 1 version
// >1%
// IE 10 # sorry
// 11.压缩css：
// 1.npm install optimize-css-assets-webpack-plugin --save-dev
// 2.const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 3.new OptimizeCssAssetsPlugin({
//     cssProcessorPluginOptions:{
//         preset: ['default',{discardComments:{removeAll:true}}]
//     },
//     cssProcessorOptions:{
//         map:{
//             inline:false,
//             annotation:true
//         }
//     }
// })
// 12、压缩html：
// new HtmlWebpackPlugin(
//     // 以当前文件为模板创建新的Html(1.结构和原来一样 2.会自动引入打包的资源)
//     {
//         template: './src/index.html',
//         minify: {
//             removeComments: true,
//             collapseWhitespace: true,
//             removeRedundantAttributes: true,
//             useShortDoctype: true,
//             removeEmptyAttributes: true,
//             removeStyleLinkTypeAttributes: true,
//             keepClosingSlash: true,
//             minifyJS: true,
//             minifyCSS: true,
//             minifyURLs: true,
//
//         }
//     }
// )

