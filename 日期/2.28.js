const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
//一、gulp.task建立任务
// （[任务名称],回调函数）
gulp.task('first', () => {
    console.log('first gulp task');
    gulp.src('src/admin.css')
        .pipe(gulp.dest('dist/css'))
});
// 二、实操：
// html任务
// 1、压缩文件为一行
// 2、注入html公共代码
//    2.1 创建公共代码html
//    2.2 在需要插入公共代码的html中合适的位置输入 @@include([路径])
//    2.3 调用api .pipe(fileinclude())
//3、 执行 gulp '任务名'
gulp.task('htmlmin', () => {
    gulp.src('src/*.html')
        .pipe(fileinclude())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});
//css压缩任务
sass.compiler = require('node-sass');
gulp.task('cssmin', () => {
    gulp.src(['./sass/*.scss','./src/admin.css'])
        // 编译sass
        .pipe(sass())
        // 压缩src里所有css，包括上一步编译好的sass文件，注意多文件目录时要用数组表示
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'));
});
// js转换、压缩文件
gulp.task('jsmin',()=>{
    gulp.src('./2.26.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
// 一次性执行多个任务,任务名为default时，命令行输入gulp时自动执行
gulp.task('default',['jsmin','cssmin','htmlmin']);

// 三、关于package.json文件：
// 当把项目给别人传递过去之后，只要把package.json也传过去，再用npm install就能把插件全都下载回来
// 关于依赖的说明：
// 1、在项目的开发阶段和线上运营阶段,都需要依赖的第三方包，称为项目依赖，
//  使用npm install包名命令下载的文件会默认被添加到package.json文件的dependencies字段中。
// 2、在项目的开发阶段需要依赖，线上运营阶段不需要依赖的第三方包,称为开发依赖，
//  使用npm install包名--save-dev命令将包添加到package.json文件的devDependencies字段中。
// 3、部署在服务器上只下载项目依赖，在开发时用的开发依赖是不需要下载的。
//    ‘npm install --production’安装项目依赖
//    ‘npm install’安装所有依赖
// 4、package.json里"script"属性可以把一些命令存储起来，这样只要输入’node run “命令名称”‘就能执行相应指令

// 四、关于package-lock.json文件：
// 锁定包的版本，确保再次下载时不会因为包版本不同而产生问题；
// 加快下载速度，因为该文件中已经记录了项目所依赖第三方包的树状结构和包的下载地址，
// 重新安装时只需下载即可，不需要做额外的工作。

// 五、部分第三方模块
// nodemon：
// 实时监听js文件并自动重新执行
// nrm:
// 切换npm源,’nrm ls‘列出源列表，’nrm use “源名称”‘更改源
