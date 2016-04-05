var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var less = require('gulp-less');

// see http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./client/app.js'],
        transform: [reactify],  // or babelify?
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    function doBundle(watcher) {
        // could do uglifying after source pipe
        var updateStart = Date.now();
        console.log('Updating bundle...');
        watcher
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./dist'));
        console.log('Done updatin\' bundle, took ' + (Date.now() - updateStart) + 'ms');
        return watcher;
    }
    var watcher = watchify(bundler)
        .on('update', function() {
            return doBundle(watcher);
        });
    return doBundle(watcher);
});

gulp.task('less', function() {
    gulp.watch('./less/**/*.less', function() {
        return gulp.src('./less/**/*.less')
            .pipe(less({
                // paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest('./dist/css'))
    });
});

gulp.task('default', ['browserify', 'less']);
