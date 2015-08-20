var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  coffee = require('gulp-coffee');

gulp.task('docs:coffee', function() {
  gulp.src(['./lib-docs/coffee/navbar-fixer.coffee', './lib-docs/coffee/index.coffee', './lib-docs/js/**/*.js'])
    .pipe(gulpif(/[.]coffee$/, coffee()))
    .pipe(gulp.dest('./docs/js'));
})
