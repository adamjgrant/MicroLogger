/*
 * Additional test for PhantomJS.
 */
var gulp           = require('gulp');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var coffee         = require('gulp-coffee');
var expect         = require('gulp-expect-file');

gulp.task('docs:test', ['docs:bundle-tests', 'docs:jade'], function() {
  var files = ['docs/tests/index.html']
  gulp.src(files)
    .pipe(mochaPhantomJS({reporter: 'list'}))
});
