const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const rebaseUrls = require('gulp-css-rebase-urls');

gulp.task('images-clean-dist', () =>
    gulp.src('dist/images', { read: false })
        .pipe(clean())
);

gulp.task('images', ['images-clean-dist'], () =>
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
);

gulp.task('images:watch', ['images'],  () =>
    gulp.watch('src/images/**/*', ['images'])
);

gulp.task('scss', () =>
    gulp.src('src/css/**/main.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(rebaseUrls())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
);

gulp.task('scss:watch', ['scss'], () =>
    gulp.watch('src/styles/**/*.scss', ['scss'])
);

gulp.task('build', ['scss', 'images']);
gulp.task('default', ['scss:watch', 'images:watch']);