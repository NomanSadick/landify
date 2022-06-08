const { series, src, dest, parallel, watch  } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const htmlImport = require('gulp-html-import');
function html(cb) {
    return src('src/**/*.html')
    .pipe(htmlImport('src/'))
    .pipe(dest('desti/'))
    .pipe(browserSync.stream())
    cb()
    
}

function css(cb) {
    return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('desti/css'))
    .pipe(browserSync.stream())
    cb()
}

function img(cb) {
    return src('src/**/*.+(jpg|png|svg)')
    .pipe(dest('desti/'))
    .pipe(browserSync.stream())
    cb()
}

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./desti"
        }
    })
    watch('src/**/*.html', html)
    watch('src/scss/**/*.scss', css)
    watch('src/images/**/*.+(jpg|png|svg)', img)
    cb()
}

exports.html= html;
exports.css= css;
exports.server= server;
exports.img= img;

exports.default = series(html, css, img, server);
