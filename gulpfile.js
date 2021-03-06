const gulp = require('gulp');
const less = require('gulp-less');

function css(){
    return gulp.src('./test/src/style.spec.less')
    .pipe(less())
    .pipe(gulp.dest('./test/dist'))
}

function watch(){
    gulp.watch(['./test/src/style.spec.less'],css);
}

module.exports.css = css;
module.exports.watch = watch;
