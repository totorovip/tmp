var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    purify = require('gulp-purifycss'),
    compass = require('gulp-compass'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),  //compress jpg
    imageminPngquant = require('imagemin-pngquant'),//compress png
    fs = require('fs'),                           // node自带模块，无需安装
    livereload = require('gulp-livereload'),      // test,可不安装
    del = require('del');                         // test,可不安装

var srcDir = './',                 // 根目录
    cssDir = './css/src/',          // css路径
    uncompileFileArr = ['mobiscroll', 'sass'],            // 不被编译的文件夹写在数组里
    picDir = './pic/',
    uncompPicArr = ['base 64'];

// task-编译+压缩css
gulp.task('styles', function() {
    var dir = fs.readdirSync(cssDir).filter(function(file) {
        return fs.statSync(cssDir + file).isDirectory();
    });
        // 1.读取所有的文件 ,筛选出要编译的文件
        // 2.判断是不是在不被编译的数组里面
        // 2.特殊处理，global.scss
        dir.map(function(dir) {
            if (uncompileFileArr.indexOf(dir) === -1) {  // 如果文件夹名不在uncompileFileArr里
                // 特殊处理，global.scss打包成common_min.css
                if (dir === 'global') {
                    gulp.src([cssDir+dir + '/*.*'])
                        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                        .pipe(autoprefixer({
                            browsers: ['last 2 versions', 'Android >=2.3', 'last 3 Safari versions', '> 5%'],
                            cascade: true
                        }))
                        .pipe(concat('common_min.css'))
                        .pipe(cleanCSS({ keepBreaks: true}))
                        .pipe(gulp.dest('./css/'))
                } else {
                    gulp.src([cssDir+dir + '/*.*'])
                        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                        .pipe(autoprefixer({
                            browsers: ['last 2 versions', 'Android >=4.0'],
                            cascade: true
                        }))
                        .pipe(concat(dir+'_min.css'))
                        .pipe(cleanCSS({ keepBreaks: true}))
                        .pipe(gulp.dest('./css/'))
                }
            }
        })   
});

// task-压缩图片
gulp.task('imgmin', function() {
    var dir = fs.readdirSync(picDir).filter(function(file) {
        return fs.statSync(picDir + file).isDirectory();
    });
        // 读取所有的文件，筛选出要压缩的文件夹
        dir.map(function(dir) {
            if(uncompPicArr.indexOf(dir) === -1) {
                // 开始压缩
                gulp.src([picDir + dir + '/img_org/*.{gif,jpg,png}'])
                    .pipe(cache(imagemin([
                        imageminMozjpeg({progressive: true,quality:88}),
                        imageminPngquant({quality: "65-90"})
                        ],{
                            verbose: true   // 显示每张图片压缩了多少。
                        }
                    )))
                    .pipe(gulp.dest(picDir + dir + '/'))
            }
        })   
});
// default task
gulp.task('default',[
    'styles',
    'imgmin',
    'watch'
    ])

// watch
gulp.task('watch', function() {
    gulp.watch('./css/src/**/*.*', ['styles']);
    gulp.watch('./pic/info/img_org/*.*', ['imgmin']);
    gulp.watch(['./css/src/**/*.*', './pic/info/img_org/*.*']).on('change', function(event, cb){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        /*
            顺带删除压缩后的图片操作风险太大，不使用
            event.type [deleted, changed]
            如果该操作是删除且操作的是图片，则顺带删除压缩后图片
            var regexp = /\\img_org/;
            var delPath = event.path.replace(regexp, '');
            if(event.type == "deleted") {
                fs.stat(delPath, function(err, stat){
                    if(stat && stat.isFile()) {
                        fs.unlink(delPath);
                    } 
                })
            }
        */
    });
});



 