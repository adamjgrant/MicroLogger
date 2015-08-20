var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('docs:browserSync', ['build:docs'], function() {
  browserSync.init(['./docs/**'], {
    server: {
      baseDir: ['docs', 'lib-docs']
    }
  });
});
