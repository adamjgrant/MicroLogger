var gulp = require('gulp');

gulp.task('docs:iframes', function() {
  gulp.src(['./lib-docs/iframes/**'])
    .pipe(gulp.dest('./docs/iframes'));
})
