'use strict';

var gulp = require('gulp'),
	merge = require('event-stream').merge,
	runSequence = require('run-sequence'),
	path = require('path'),
	rename = require('gulp-rename'),
	notifier = require('node-notifier'),
	watch = require('gulp-watch'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	through = require('through2'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	connect = require('gulp-connect');

function errorHandler(title) {
	return function(err) {
		notifier.notify({
			title: title,
			message: err.message
		});
		console.error(err);

		this.emit('end');
	};
}

function copy(src, dest) {
	return gulp.src(src).pipe(gulp.dest(dest));
}

function resolvePath(src, srcRoot, destRoot) {
	srcRoot = srcRoot || './src';
	destRoot = destRoot || './build';

	var srcAbsolutePath = path.resolve(src),
		srcRelPath = path.relative(srcRoot, src),
		destAbsoutePath = path.join(destRoot, srcRelPath),
		destDirPath = path.dirname(destAbsoutePath);

	return {
		src: srcAbsolutePath,
		destDir: destDirPath
	};
}

function buildSASS(src, dest) {
	return gulp.src(src)
		.pipe(
			sass()
			.on('error', errorHandler('SASS compile failed'))
		)
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(rename(function(filePath) {
			filePath.extname = '.css';
		}))
		.pipe(gulp.dest(dest));
}

gulp.task('build.sass', function() {
	return buildSASS([
		'./src/*.scss',
		'./src/**/*.scss'
	], './build/');
});

gulp.task('watch.sass', ['build.sass'], function() {
	watch([
		'./src/*.scss',
		'./src/**/*.scss'
	], function(ev) {
		var resolved = resolvePath(ev.path);
		return buildSASS(resolved.src, resolved.destDir);
	});
});

gulp.task('build.html', function() {
	return copy([
		// './src/*.html',
		'./src/**/*.html'
	], './build/');
});

gulp.task('watch.html', ['build.html'], function() {
	watch([
		// './src/*.html',
		'./src/**/*.html'
	], function(ev) {
		var resolved = resolvePath(ev.path);

		return copy(resolved.src, resolved.destDir);
	});
});

gulp.task('build.jsx', function() {
	var bundledStream = through();

	browserify('src/index.jsx', {
			debug: true,
		})
		.transform(babelify, {
			presets: ['react']
		})
		.on('error', errorHandler('JSX compile failed'))
		.bundle().pipe(bundledStream);

	bundledStream
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(gulp.dest('build/'));

	return bundledStream;
});

gulp.task('watch.jsx', ['build.jsx'], function() {
	watch([
		'./src/*.jsx',
		'./src/**/*.jsx'
	], function(ev) {
		return gulp.start('build.jsx');
	});
});

gulp.task('build.static', function(done) {
	return merge([
		copy('./bower_components/**/*', './build/bower_components'),
		copy('./src/*.{jpg,js,json}', './build/')
	]);
});

gulp.task('watch.static', ['build.static'], function() {
	watch([
		'./bower_components/**/*',
		'./src/*.{jpg,js,json}'
	], function(ev) {
		var resolved = resolvePath(ev.path);
		return copy(resolved.src, resolved.destDir);
	});
});

gulp.task('clean', function() {
	return gulp.src('./build', {
			read: false
		})
		.pipe(clean());
});

gulp.task('server', function() {
	connect.server({
		root: './build/',
		livereload: false,
		port: 9000
	});
});

gulp.task('default', function(done) {
	return runSequence('clean', [
		'watch.jsx',
		'watch.sass',
		'watch.html',
		'watch.static'
	], 'server');
});

gulp.task('build', function(done) {
	return runSequence('clean', [
		'build.jsx',
		'build.sass',
		'build.html',
		'build.static'
	], done);
});
