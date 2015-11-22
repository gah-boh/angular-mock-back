var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var git = require('gulp-git');
var del = require('del');
var sequence = require('run-sequence');
var path = require('path');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var exec = require('child_process').exec;

gulp.task('minify', function() {
	return gulp.src('./angular-mock-back.js')
		.pipe(uglify())
		.pipe(rename('angular-mock-back.min.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('clean', function(done) {
    del(['./tmp']).then(function() {
        done();
    });
});

gulp.task('bower-clone', ['minify', 'clean'], function(done) {
    git.clone('https://github.com/gah-boh/bower-angular-mock-back', {args: './tmp/bower-angular-mock-back'}, function(err) {
        if(err) {
            gutil.log('git.clone', gutil.colors.red(err));
        }
        done();
    });
});

gulp.task('bower-copy', ['bower-clone'], function() {
    return gulp.src(['./angular-mock-back.js', './angular-mock-back.min.js'])
               .pipe(gulp.dest('tmp/bower-angular-mock-back'));
});

gulp.task('bower-version', ['bower-copy'], function(done) {
    var version = argv.v || 'patch';
    exec('bower version ' + version, {cwd: './tmp/bower-angular-mock-back'}, function(err) {
        if(err) {
            gutil.log('bower version', gutil.colors.red(err));
        }
        done();
    });
});

gulp.task('bower', ['bower-version']);

gulp.task('default', ['minify']);


