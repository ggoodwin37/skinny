'use strict';

// based on http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html

var gulp = require('gulp');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var dest = require('gulp-dest');
var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');

var outPath = './dist';

gulp.task('browserify', function() {
    function doBundle() {
        console.log('Bundling js...');
        browserify('./client/app.jsx')
            .transform(babelify, {presets: ['es2015', 'react']})
            .bundle()
            .pipe(source('app.js'))
            .pipe(dest({ext: 'js'}))
            .pipe(gulp.dest(outPath));
    }

    var jsFilePath = 'client/*.js*';
    gulp.watch(jsFilePath, doBundle);
    doBundle();
});

gulp.task('less', function() {
    var lessFilePath = 'less/**/*.less';
    function doLess() {
        console.log('Transforming less...');
        return gulp.src(lessFilePath)
            .pipe(less({
                // paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(concat('app.css'))
            .pipe(gulp.dest(outPath));
    }

    gulp.watch(lessFilePath, doLess);
    doLess();
});

gulp.task('default', ['browserify', 'less']);
