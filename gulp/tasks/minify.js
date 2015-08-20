// Create minified versions of js and css.

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  minify = require('gulp-minify-css'),
  changed = require('gulp-cached'),
  uglify = require('gulp-uglify');

gulp.task('minify', ['coffee', 'browserify', 'sass'], function() {
  var dest = './public/js/';
  gulp.src(['./public/js/**/*.js', '!./public/js/**/*.min.js'])
    .pipe(changed(dest))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min"
    }))
    .pipe(gulp.dest(dest));

  var dest = './public/css/';
  gulp.src(['./public/css/**/*.css', '!./public/css/**/*.min.css'])
    .pipe(changed(dest))
    .pipe(minify())
    .pipe(rename(
      function(path) {
        path.basename += ".min"
      }
    ))
    .pipe(gulp.dest(dest));
})
