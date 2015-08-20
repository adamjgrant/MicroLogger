var browserify     = require('browserify');
var watchify       = require('watchify');
var bundleLogger   = require('../util/bundleLogger');
var gulp           = require('gulp');
var handleErrors   = require('../util/handleErrors');
var source         = require('vinyl-source-stream');

// Bundle's the end user's scripts with kickstart.js
gulp.task('browserify', function() {
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Specify the entry point of your app
    entries: ['./lib/coffee/app.coffee'],
    // Add file extentions to make optional in your requires
    extensions: ['.coffee'],
    // Enable source maps!
    debug: true
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('script.js'))
      // Specify the output destination
      .pipe(gulp.dest('./public/js/'))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    bundler = watchify(bundler);
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
