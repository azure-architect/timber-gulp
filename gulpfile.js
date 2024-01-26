const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const tailwindcss = require('tailwindcss');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const globby = require('globby');
const uglify = require('gulp-uglify');

// CSS processing task
function css() {
    return gulp.src('src/css/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            tailwindcss,
            autoprefixer(),
            postcssNested
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(rename('prod.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// JavaScript bundling and minification task
function bundleJS(files) {
    return browserify({ entries: files, debug: true })
        .transform('babelify', { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('custom.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function js() {
    return globby(['src/js/**/*.js'])
        .then(files => {
            if (files.length === 0) {
                console.log('No JavaScript files found in src/js/');
                return;
            }
            return bundleJS(files);
        })
        .catch(err => {
            console.log('Error in globby:', err);
        });
}

// Watch task
function watchFiles() {
    browserSync.init({
        proxy: "http://timber.local",
        notify: true
    });

    gulp.watch('src/css/**/*.css', css);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('./views/**/*.twig').on('change', browserSync.reload);
    gulp.watch('./*.php').on('change', browserSync.reload);
}

// Export tasks
exports.css = css;
exports.js = js;
exports.watch = watchFiles;
exports.default = gulp.series(css, js, watchFiles);
