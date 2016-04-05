var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');

var less = require('gulp-less');
//var path = require('path');

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
	var watcher = watchify(bundler);
	return watcher
		.on('update', function() {
			var updateStart = Date.now();
			console.log('Updating!');
			watcher.bundle()
			    .pipe(source('main.js'))
				// This is where you add uglifying etc.
			    .pipe(gulp.dest('./build/'));
			console.log('Updated!', (Date.now() - updateStart) + 'ms');
		})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./dist'));
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
