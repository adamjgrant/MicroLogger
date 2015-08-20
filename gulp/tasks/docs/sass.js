var gulp       = require('gulp'),
  sass         = require('gulp-ruby-sass'),
  browserSync  = require('browser-sync'),
  changed      = require('gulp-cached'),
  purge         = require('gulp-css-purge'),
  prefix        = require('gulp-autoprefixer');

gulp.task('docs:sass', ['docs:images'], function() {
  var dest = './docs/css'
  return gulp.src(['lib-docs/sass/**/*.{sass, scss}', '!lib-docs/sass/vendor', '!lib-docs/sass/vendor/**'])
    .pipe(changed(dest))
    .pipe(sass({
      sourcemapPath: process.cwd() + './lib-docs/sass',
      loadPath: [
        process.cwd() + '/lib-docs/sass',
        process.cwd() + '/lib-core/sass'
      ]
    }))
    .pipe(prefix('last 2 versions'))
    .pipe(purge())
    .pipe(gulp.dest(dest));
});
