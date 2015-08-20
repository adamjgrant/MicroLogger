var newer    = require('gulp-newer');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');

gulp.task('images', function() {
  var dest = './public/img';

  return gulp.src('./lib/img/**/*')
    .pipe(newer(dest)) // Ignore unchanged files
    .pipe(gulp.dest(dest));
});
