'use strict';

var gulp = require('gulp');

//sass combilator
var sass = require('gulp-sass');
//web serv with live preview
var browserSync = require('browser-sync');
//concatenation
var useref = require('gulp-useref');
// glob imports
var sassGlob = require('gulp-sass-glob');
// minification js
var uglify = require('gulp-uglify');
// minification css
var cssnano = require('gulp-cssnano');
// Optimize images
var imagemin = require('gulp-imagemin');

var gulpIf = require('gulp-if');



// ========================================================

// gulp.task('sass', function(){
//   return gulp.src('site/scss/**/*.scss')
//     .pipe(sass()) // Using gulp-sass
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('site/css'))
// });

gulp.task('styles', function () {
  return gulp
    .src( 'site/scss/**/*.scss' )
    .pipe( sassGlob() )
    .pipe( sass.sync().on('error', sass.logError) )
    .pipe( gulp.dest('site/css') )
    .pipe( browserSync.reload({stream: true}) )
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'site',
    },
    notify: false
  })
});


gulp.task('useref', function(){
  return gulp.src('site/*.html')
    .pipe(useref())
    .pipe(gulpIf('js/*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('css/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('site/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});



gulp.task('default', ['browserSync' , 'styles'], function(){
  gulp.watch('site/scss/**/*.scss', ['styles']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('site/*.html', browserSync.reload);
  gulp.watch('site/js/**/*.js', browserSync.reload);
});


// ========================================================
