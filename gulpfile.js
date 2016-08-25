(function () {
    'use strict';

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        del = require('del'),
        zip = require('gulp-zip'),
        gulpif = require('gulp-if'),
        argv = require('yargs');

    gulp.task('clean:tmp', function () {
        return del(['tmp/**']);
    });

    gulp.task('clean:dist', function () {
        return del(['dist/**']);
    });

    gulp.task('build:tmp', ['clean:tmp', 'clean:dist'], function () {
        return gulp.src(['app/**'])
            .pipe(gulp.dest('tmp/'));
    });

    gulp.task('build:ext', ['build:tmp'], function () {
        return gulp.src(['tmp/**/*.js', 'tmp/**/js/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('tmp/'));
    });

    gulp.task('build:dist', ['build:ext'], function () {
        gulp.src(['tmp/**'])
            .pipe(zip('dfp-console.zip'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('default', ['build:dist']);
}());