var gulp = require('gulp');
var gulpLiveServer = require('gulp-live-server');

gulp.task('serve', function() {
    var server = gulpLiveServer.new('index.js');
    server.start();

    gulp.watch('index.js', function (file) {
        server.start.apply(server);
    });
});