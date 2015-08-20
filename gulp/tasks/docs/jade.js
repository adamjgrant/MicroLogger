var gulp = require('gulp'),
  jade = require('gulp-jade'),
  icons = require('../../../docs/icons.js'),
  changed = require('gulp-cached'),
  fs = require('fs');

var dest = './docs';

gulp.task('docs:jade', function() {
  return gulp.src(['./lib-docs/jade/**/*.jade'])
    .pipe(changed(dest))
    .pipe(jade({
        locals: {
          currentVersion: '3.1 beta',
          docsVersion: '3.x',
          nextDocsVersion: '4.x',
          fs: fs,
          icons: icons
        }
      })
    )
    .pipe(gulp.dest(dest));
});
