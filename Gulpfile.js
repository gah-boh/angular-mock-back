var gulp = require('gulp');
var rename = require('gulp-rename');
var git = require('gulp-git');
var del = require('del');
var sequence = require('run-sequence');
var path = require('path');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var exec = require('child_process').exec;
var webpack = require('webpack');
var assign = require('lodash.assign');
var runSequence = require('run-sequence');

var webpackConfig = require('./webpack.config.compile');

gulp.task('compile-minify', function(done) {
    var webpackConfigMin = assign({}, webpackConfig);
    webpackConfig.output.path = __dirname;
    webpackConfig.output.filename = 'angular-mock-back.min.js';
    webpackConfigMin.plugins = [
        new webpack.optimize.UglifyJsPlugin()
    ];
    webpack(webpackConfigMin, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack minifying', error);
        }
        gutil.log('[webpack]', stats.toString({
            color: true,
            chunks: false
        }));
        done()
    });
});

gulp.task('compile', function(done) {
    webpack(webpackConfig, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            color: true,
            chunks: false
        }));
        done();
    })
});

gulp.task('minify', ['compile-minify'], function() {
    gulp.src('./angular-mock-back.min.js')
        .pipe(gulp.dest('./tmp/bower-angular-mock-back'));
});

gulp.task('clean', function(done) {
    del(['./tmp']).then(function() {
        done();
    });
});

gulp.task('bower-clone', function(done) {
    git.clone('https://github.com/gah-boh/bower-angular-mock-back', {args: './tmp/bower-angular-mock-back'}, function(err) {
        if(err) {
            gutil.log('git.clone', gutil.colors.red(err));
        }
        done();
    });
});

gulp.task('create branch', function(done) {
    git.branch('local', function() {
        done();
    })
});

gulp.task('bower-version', function(done) {
    var version = argv.v || 'patch';
    exec('bower version ' + version, {cwd: './tmp/bower-angular-mock-back'}, function(err) {
        if(err) {
            gutil.log('bower version', gutil.colors.red(err));
        }
        done();
    });
});

gulp.task('bower', ['clean'], function(done) {
    runSequence('bower-clone', 'compile', 'minify', 'bower-version', done);
});

gulp.task('default', ['bower']);


