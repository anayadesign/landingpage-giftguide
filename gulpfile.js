var gulp = require ('gulp');
var browserSync = require('browser-sync').create();

gulp.task('scss', function () {
  var sass         = require('gulp-sass');
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  var processors = [
    autoprefixer
  ]
  return gulp.src('src/**/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass().on('error', sass.logError) )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') )
    .pipe(browserSync.stream());
});

gulp.task('html', function(){
  var pug = require('gulp-pug');
  return gulp.src('src/templates/*.pug')
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('build/images/'));
})

gulp.task('styles', ['scss']);
gulp.task('build', ['scss', 'html', 'images']);

// Static Server + watching scss/html files
gulp.task('serve', ['scss','html', 'images'], function() {
  browserSync.init({
    server: "./build"
  });
  gulp.watch("src/images/**/*.{jpg,png,gif}", ['images']);
  gulp.watch("src/**/*.scss", ['scss']);
  gulp.watch("src/**/*.pug", ['html']);
});


gulp.task('default', ['serve']);
