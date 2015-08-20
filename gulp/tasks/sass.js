var gulp       = require('gulp'),
  sass         = require('gulp-ruby-sass'),
  browserSync  = require('browser-sync'),
  changed      = require('gulp-cached'),
  purge         = require('gulp-css-purge'),
  prefix        = require('gulp-autoprefixer');

gulp.task('sass', ['images'], function() {
  var dest = './public/css'
  return gulp.src(['lib/sass/**/*.{sass, scss}', '!lib/sass/vendor', '!lib/sass/vendor/**'])
    // .pipe(changed(dest)) // Turn this on for more efficient, but selective compiling.
    .pipe(sass({
      sourcemapPath: process.cwd() + './lib/sass',
      loadPath: [
        process.cwd() + '/lib/sass',
        process.cwd() + '/lib/sass/vendor',
        process.cwd() + '/lib-core/sass'
      ]
    }))
    .pipe(prefix('last 2 versions'))
    .pipe(purge())
    .pipe(gulp.dest(dest));
});
