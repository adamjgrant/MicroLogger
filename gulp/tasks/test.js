/*
 * Additional test for PhantomJS.
 */
var gulp           = require('gulp');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var coffee         = require('gulp-coffee');
var expect         = require('gulp-expect-file');


gulp.task('test', ['bundle-tests', 'jade'], function() {
  var files = ['public/tests/index.html']
  gulp.src(files)
    .pipe(mochaPhantomJS({reporter: 'list'}))
});
