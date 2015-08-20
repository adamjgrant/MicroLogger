var gulp = require('gulp'),
  jade = require('gulp-jade'),
  changed = require('gulp-cached'),
  browserSync  = require('browser-sync');

var dest = './public';

gulp.task('jade', function() {
  return gulp.src(['./lib/jade/**/*.jade'])
    .pipe(changed(dest))
    .pipe(jade({
        locals: {
          fs: require('fs')
        }
      })
    )
    .pipe(gulp.dest(dest));
});
