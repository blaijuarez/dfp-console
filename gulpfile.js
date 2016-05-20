var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stripCode = require('gulp-strip-code'),
    run = require('gulp-run'),
    rimraf = require('gulp-rimraf'), // rimraf directly
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    gulpSakugawa = require('gulp-sakugawa'),
    rename = require("gulp-rename"),
    fs = require('fs'),
    jshint = require('gulp-jshint'),
    map = require('map-stream'),
    preprocess = require('gulp-preprocess'),
    argv = require('yargs').argv,
    log = function(file, cb) {
        console.log(file.path);
        cb(null, file);
    },
    convertEncoding = require('gulp-convert-encoding');

// Librerias externas a cargar en el proyecto de Marca
var ficherosLibTmp = ['tmp/js/lib/html5.js',
    'tmp/js/lib/jquery.2.2.1.js',
    'tmp/js/lib/jquery.2.1.4.js',
    'tmp/js/lib/jquery.ie8.js',
    'tmp/js/lib/kalturaue-marca.min.js',
    'tmp/js/lib/navegacioncontinua.min.js',
    'tmp/js/lib/comentarios_noticias_comunidad_cronica.js',
    'tmp/js/lib/ueComentariosNoticiasComunidad.js',
    'tmp/js/lib/ue-logindialog.js',
    'tmp/js/lib/ue-ajax.js',
    'tmp/js/lib/ue-album.js',
    'tmp/js/lib/ue-carrusel.js',
    'tmp/js/lib/ue-debates-handler.js',
    'tmp/js/lib/ue-utils.js'];

var ENV='production';
gulp.task('set_env',function () {
    if(argv.production){ENV='production';}
    else if(argv.staging) {ENV='staging';}
    else{ENV='production'; console.log('No se ha recibido parametro de entorno, se establece por defecto.');}
    console.log('Entorno: '+ENV);
});

gulp.task('remove_tmp_js',['set_env'],function (cb) {
    return gulp.src(['tmp', 'dist/js']).pipe(rimraf());
});

gulp.task('generate_tmp_js', ['remove_tmp_js'], function () {
    return gulp.src(['uestyle/js/**/*.js', 'js/**/*.js'])
        .pipe(gulp.dest('tmp/js/'));
});

gulp.task('generate_dist_js', ['generate_tmp_js'], function () {

    gulp.src('tmp/js/desktop/launcher-general-desktop.js')
        .pipe(preprocess({context: { NODE_ENV: ENV, DEBUG: true}}))
        .pipe(browserify({}))
        .pipe(rename('desktop.min.js'))
        .pipe(uglify())
        .pipe(convertEncoding({to: 'iso-8859-15'}))
        .pipe(gulp.dest('dist/js'));

    gulp.src('tmp/js/mobile/launcher-general-mobile.js')
        .pipe(preprocess({context: { NODE_ENV: ENV, DEBUG: true}}))
        .pipe(browserify({}))
        .pipe(rename('mobile.min.js'))
        .pipe(uglify())
        .pipe(convertEncoding({to: 'iso-8859-15'}))
        .pipe(gulp.dest('dist/js'));

    gulp.src(ficherosLibTmp)
        .pipe(preprocess({context: { NODE_ENV: ENV, DEBUG: true}}))
        .pipe(uglify())
        .pipe(convertEncoding({to: 'iso-8859-15'}))
        .pipe(gulp.dest('dist/js'));
});

/**     QA jsHint      **/

gulp.task('JSHint', function () {
    return gulp.src(['./js/*/**/*.js', '!./js/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('unix'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jshint', ['JSHint']);

// Generate Images
gulp.task('generate_images', function () {
    return gulp.src(['uestyle/img/**/*', 'img/**/*'])
        .pipe(gulp.dest('dist/img'));
});

// Compass Compile
gulp.task('compass', ['generate_images'], function () {
    return run('compass compile -c config.rb').exec();
});

gulp.task('default', ['generate_dist_js', 'create_imports']);

gulp.task('css_split_ie', ['compass'], function () {
    return gulp.src('./dist/css/core-marca-desktop.css')
        .pipe(gulpSakugawa({
            maxSelectors: 4000,
            mediaQueries: 'separate',
            suffix: '__'
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(/.*__(\d)/, 'core-ie-split-$1');
        }))
        .pipe(gulp.dest('./tmp/css/ie-split/'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('create_imports', ['css_split_ie'], function () {
    var file = fs.createWriteStream('dist/css/core-ie.css');
    var arr = fs.readdirSync('tmp/css/ie-split');
    arr.forEach(function (v) {
        console.log(v);
        file.write('@import url("' + v + '");\n');
    });
    file.end();
});
