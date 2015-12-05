var autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefixer', function() {
	return gulp.src('./src/*.css')
		.pipe(autoprefixer())
		.pipe(gulp.dest('./dest'));
});
