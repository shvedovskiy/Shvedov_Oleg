var gulp = require('gulp');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var rebaseUrls = require('postcss-url');
var minify = require('postcss-csso');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('images-clean-dist', function () {
    gulp.src('public/dist/images', {read: false})
      .pipe(clean());
  }
);

gulp.task('images', ['images-clean-dist'], function () {
    gulp.src('src/images/**/*')
      .pipe(gulp.dest('public/dist/images'));
  }
);

gulp.task('css', function () {
    gulp.src('src/scss/**/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
        atImport(),
        rebaseUrls({url: 'rebase'}),
        autoprefixer({browsers: ['>1%']}),
        minify()
      ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/dist/css'));
  }
);

gulp.task('js', ['css'], function () {
    gulp.src('public/dist/js/app.js')
      .pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .pipe(gulp.dest('public/dist/js'));
  }
);

gulp.task('images:watch', ['images'], function () {
    gulp.watch('src/images/**/*', ['images']);
  }
);

gulp.task('css:watch', ['css'], function () {
    gulp.watch('src/scss/**/*.scss', ['css']);
  }
);

gulp.task('build', ['css', 'images', 'js']);
gulp.task('default', ['css:watch', 'images:watch']);
