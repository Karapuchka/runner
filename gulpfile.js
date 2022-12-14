const {src, parallel, series, dest, watch} = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const imagemin     = require('gulp-imagemin');
const htmlmin      = require('gulp-htmlmin');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const webp         = require('gulp-webp');
const sass         = require('gulp-sass')(require('sass'));
const del          = require('del');

function html(){
    return src('source/index.html')
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(dest('dist/'))
           .pipe(src('source/pages/**/*'))
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(dest('dist/pages'))
           .pipe(browserSync.stream())
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
}

function cleanDist(){
    return del('dist');
}

function watching(){
    watch(['source/styles/scss/style.scss'], styles)
    watch(['source/scripts/**/*'], scripts)
    watch(['source/index.html'], html)
}

function styles(){
    return src('source/styles/style.scss')
           .pipe(sass({outputStyle: 'compressed'}))
           .pipe(concat('style.min.css'))
           .pipe(autoprefixer({
                overrideBrowserlist: ['last 10 version'],
                grid: true
            }))
           .pipe(dest('dist/styles'))
           .pipe(browserSync.stream())
}

function scripts(){
    return src([               
            'source/scripts/main.js',  
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/scripts'))
        .pipe(browserSync.stream())
}

function scriptsTwo(){
    return src([               
            'source/scripts/Personage.js',  
        ])
        .pipe(concat('Personage.js'))
        .pipe(uglify())
        .pipe(dest('dist/scripts'))
        .pipe(browserSync.stream())
}

function fonts(){
    return src('source/fonts/**/*')
           .pipe(dest('dist/fonts'))
           .pipe(browserSync.stream())
}

function images(){
    return src('source/images/**/*')
            .pipe(imagemin([
                  imagemin.gifsicle({interlaced: true}),
                  imagemin.mozjpeg({quality: 75, progressive: true}),
                  imagemin.optipng({optimizationLevel: 5}),
                  imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
           .pipe(dest('dist/images'))
           .pipe(browserSync.stream())
}

function imgWebp(){
    return src('source/images/**/*')
           .pipe(webp())
           .pipe(dest('dist/images'))
           .pipe(browserSync.stream())
}

const start  = series(cleanDist, html, styles, scripts, scriptsTwo, images, fonts, parallel(browsersync, watching));

exports.browsersync = browsersync;
exports.cleanDist   = cleanDist;
exports.watching    = watching;
exports.scripts     = scripts;
exports.imgWebp     = imgWebp;
exports.styles      = styles;
exports.images      = images;
exports.fonts       = fonts;
exports.html        = html;
exports.scriptsTwo        = scriptsTwo;

exports.start       = start;