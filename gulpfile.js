// Basic gulp file.

let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('default', ['html', 'css', 'js']);


gulp.task('html', function(){
    return gulp.src('index.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('css', function(){
    return gulp.src('scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/'));
});

gulp.task('js', function(){
    return gulp.src('app.js')
    .pipe(gulp.dest('public/'));
});