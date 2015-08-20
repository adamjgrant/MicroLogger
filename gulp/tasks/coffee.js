var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  // Regular JS copying
  gulp.src(['./lib/js/**/*.js'])
    .pipe(gulp.dest('./public/js'))

  // Use this space to compile one-off coffeescript files instead of using require.
});
