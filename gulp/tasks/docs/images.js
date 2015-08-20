var newer    = require('gulp-newer');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');

gulp.task('docs:images', function() {
  var dest = './docs/img';

  return gulp.src('./lib-docs/img/**/*')
    .pipe(newer(dest)) // Ignore unchanged files
    .pipe(gulp.dest(dest));
});
