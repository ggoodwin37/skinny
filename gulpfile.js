'use strict';

var gulp = require('gulp');
var dest = require('gulp-dest');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');

// based on http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./client/app.jsx'],
        transform: [reactify],  // or babelify?
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    function doBundle(watcher) {
        // could do uglifying after source pipe
        console.log('Updating js bundle...');
        watcher
            .bundle()
            .pipe(source('app.jsx'))
            .pipe(dest({ext: 'js'}))
            .pipe(gulp.dest('./dist'));
        return watcher;
    }
    var watcher = watchify(bundler)
        .on('update', function() {
            return doBundle(watcher);
        });
    return doBundle(watcher);
});

// TODO: this is translating but not concating, need to do that if we have more than one src.
gulp.task('less', function() {
    var lessFilePath = 'less/**/*.less';
    var lessOutPath = './dist';
    function doLess() {
        console.log('Transforming less source...');
        return gulp.src(lessFilePath)
            .pipe(less({
                // paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest(lessOutPath));
    }
    gulp.watch(lessFilePath, function() {
        return doLess();
    });
    return doLess();
});

gulp.task('default', ['browserify', 'less']);
