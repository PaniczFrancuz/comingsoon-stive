'use strict';

var gulp = require('gulp');
// plugins:
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// ========================================================

// gulp.task('sass', function(){
//   return gulp.src('site/scss/**/*.scss')
//     .pipe(sass()) // Using gulp-sass
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('site/css'))
// });

gulp.task('sass', function () {
  return gulp.src('site/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('site/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'site',
    },
    notify: false
  })
});


gulp.task('default', ['browserSync' , 'sass'], function(){
  gulp.watch('site/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('site/*.html', browserSync.reload);
  gulp.watch('site/js/**/*.js', browserSync.reload);

});


// ========================================================

// npm install gulp-plugin_name --save-dev
