var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
    gulp.watch('./lib/sass/**/*.sass', ['sass', 'minify']);
    gulp.watch('./lib/images/**', ['images']);
    gulp.watch('./lib/jade/**/*.jade', ['jade']);
    gulp.watch(['./lib/coffee/**/*.coffee'], ['browserify', 'minify']);
    gulp.watch(['./lib/jade/tests/**', './lib/tests/**'], ['test']);
});

gulp.task('watch:all', ['setWatch', 'docs:setWatch', 'browserSync', 'docs:browserSync'], function() {
    gulp.watch(['./{lib, lib-docs, lib-core}/sass/**/*.sass'], ['sass', 'minify', 'docs:sass', 'docs:minify']);
    gulp.watch(['./{lib, lib-docs, lib-core}/images/**'], ['images', 'docs:images']);
    gulp.watch(['./{lib, lib-docs, lib-core}/jade/**/*.jade'], ['jade', 'docs:jade']);
    gulp.watch(['./{lib, lib-docs, lib-core}/jade/tests/**', './lib/tests/**'], ['test', 'docs:test']);
});
