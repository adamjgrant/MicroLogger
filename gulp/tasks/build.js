var gulp = require('gulp');

// Build the core Kickstart components
gulp.task('build', ['browserify', 'jade', 'images', 'sass', 'coffee', 'minify']);

// Build the getkickstart.com documentation
gulp.task('build:docs', ['bundleKickstart', 'docs:icons', 'docs:jade', 'docs:browserify', 'docs:images', 'docs:sass', 'docs:coffee', 'docs:rails', 'docs:iframes', 'docs:minify']);
