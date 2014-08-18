var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');

gulp.task('less', ['images'], function () {
  return gulp.src('src/css/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});
