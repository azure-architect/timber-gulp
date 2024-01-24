const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const tailwindcss = require('tailwindcss'); // Include Tailwind CSS
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

// CSS processing task
gulp.task('css', () => {
  return gulp.src('src/css/style.css') // Ensure this is the entry point file for your CSS
    .pipe(sourcemaps.init())
    .pipe(postcss([
      tailwindcss, // Add Tailwind CSS as a PostCSS plugin
      autoprefixer(),
      postcssNested
      // Add other PostCSS plugins here if needed
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(rename('prod.css')) // Renaming the output file
    .pipe(gulp.dest('dist/css')) // Output directory
    .pipe(browserSync.stream());
});

// Watch task with BrowserSync
gulp.task('watch', () => {
  browserSync.init({
    proxy: "http://timber.local",
    notify: true
  });

  gulp.watch('src/css/**/*.css', gulp.series('css'));
  gulp.watch('./views/**/*.twig').on('change', browserSync.reload);
  gulp.watch('./*.php').on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('css', 'watch'));
