/* eslint-disable comma-dangle */
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const rebaseUrls = require('postcss-url');
const minify = require('postcss-csso');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('images-clean-dist', () =>
  gulp.src('public/dist/images', { read: false })
    .pipe(clean())
);

gulp.task('images', ['images-clean-dist'], () =>
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('public/dist/images'))
);

gulp.task('css', () =>
  gulp.src('src/scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      atImport(),
      rebaseUrls({ url: 'rebase' }),
      autoprefixer({ browsers: ['>1%'] }),
      minify()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/dist/css'))
);

gulp.task('js', ['css'], () =>
  gulp.src('src/js/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
  // .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
);

gulp.task('images:watch', ['images'], () =>
  gulp.watch('src/images/**/*', ['images'])
);

gulp.task('css:watch', ['css'], () =>
  gulp.watch('src/scss/**/*.scss', ['css'])
);

gulp.task('js:watch', ['js'], () =>
  gulp.watch('src/js/**/*.js', ['js'])
);

gulp.task('build', ['css', 'images', 'js']);
gulp.task('default', ['css:watch', 'images:watch', 'js:watch']);
