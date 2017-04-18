const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const rebaseUrls = require('gulp-css-rebase-urls');
const minify = require('gulp-minify-css');

gulp.task('images-clean-dist', () =>
    gulp.src('public/dist/images', { read: false })
        .pipe(clean())
);

gulp.task('images', ['images-clean-dist'], () =>
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('public/dist/images'))
);

gulp.task('images:watch', ['images'],  () =>
    gulp.watch('src/images/**/*', ['images'])
);

gulp.task('scss', () =>
    gulp.src('src/scss/**/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rebaseUrls())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/css'))
);

gulp.task('scss:watch', ['scss'], () =>
    gulp.watch('src/scss/**/*.scss', ['scss'])
);

gulp.task('build', ['scss', 'images']);
gulp.task('default', ['scss:watch', 'images:watch']);