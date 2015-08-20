var gulp = require('gulp'),
  todo = require('gulp-todos');

gulp.task('todo', function() {
  return gulp.src(['./lib/coffee/**'])
    .pipe(todo())
    .pipe(gulp.dest('./'));
});
