var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('minify', function() {
	gulp.src('./angular-mock-back.js')
		.pipe(uglify())
		.pipe(rename('angular-mock-back.min.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['minify']);

