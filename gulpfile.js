(function () {
    'use strict';

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        del = require('del'),
        zip = require('gulp-zip'),
        gulpif = require('gulp-if'),
        argv = require('yargs');


    var request = require('request'),
        config = require('./config.json'),
        fs = require('fs');

    gulp.task('pubads', function () {
        return request.get(config.pubads.file, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                var writerStream = fs.createWriteStream(config.pubads.fileOut);

                fs.readFile('./inject.js', "binary", function (err, data) {
                    if (err) {
                        return console.log(err);
                    }

                    var sMatch = config.pubads.match,
                        sValue = null,
                        concat = body;

                    for(var i=0, l=sMatch.length; i<l; i++) {

                        var flag = i!==3 ? 'gi' : '';
                        sValue = i==0 ? data+config.pubads.match[i].value : config.pubads.match[i].value;

                        var regExp = new RegExp(sMatch[i].regExp,flag);

                        concat = concat.replace(regExp, sValue);

                    }
                    writerStream.write(concat, "binary");
                    writerStream.end();
                });
            }
        });
    });

    gulp.task('build:ext', ['pubads'], function () {
        return gulp.src(['app/**'])
            .pipe(gulp.dest('tmp/'));
    });

    gulp.task('build:min', ['build:ext'], function () {
        return gulp.src(['tmp/**/*.js', 'tmp/**/js/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('tmp/'));
    });

    gulp.task('build:dist', ['build:ext'], function () {
        return gulp.src(['tmp/**'])
            .pipe(zip(config.extensionName+'.zip'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('package', ['build:dist'], function () {
        del(['tmp/**']);
        console.log('finish');
    });

    gulp.task('default', ['package']);
}());