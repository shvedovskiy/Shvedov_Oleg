let gulp = require('gulp');
let postcss = require('gulp-postcss');
let atImport = require('postcss-import');
let rebaseUrls = require('postcss-url');
let minify = require('postcss-csso');
let autoprefixer = require('autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let clean = require('gulp-clean');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');

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
  gulp.src('public/dist/js/app.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
);

gulp.task('images:watch', ['images'], () =>
  gulp.watch('src/images/**/*', ['images'])
);

gulp.task('css:watch', ['css'], () =>
  gulp.watch('src/scss/**/*.scss', ['css'])
);

gulp.task('build', ['css', 'images', 'js']);
gulp.task('default', ['css:watch', 'images:watch']);
