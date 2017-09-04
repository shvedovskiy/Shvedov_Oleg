const gulp = require('gulp');
const connect = require('gulp-connect');
const oghliner = require('oghliner');
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

gulp.task('images-clean-dist', () => {
    gulp.src('public/dist/images', {read: false})
      .pipe(clean());
  }
);

gulp.task('images', ['images-clean-dist'], () => {
    gulp.src('src/images/**/*')
      .pipe(gulp.dest('public/dist/images'));
  }
);

gulp.task('css', () => {
    gulp.src('src/scss/**/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
        atImport(),
        autoprefixer({browsers: ['>1%']}),
        minify()
      ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/dist/css'));
  }
);

gulp.task('js', ['css'], () => {
    gulp.src('public/dist/js/app.js')
      .pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .pipe(gulp.dest('public/dist/js'));
  }
);

gulp.task('images:watch', ['images'], () => {
    gulp.watch('src/images/**/*', ['images']);
  }
);

gulp.task('css:watch', ['css'], () => {
    gulp.watch('src/scss/**/*.scss', ['css']);
  }
);

gulp.task('build', ['css', 'images', 'js']);
gulp.task('default', ['css:watch', 'images:watch']);

gulp.task('configure', oghliner.configure);

gulp.task('deploy', () => oghliner.deploy({rootDir: 'public'}));

gulp.task('serve', () => {
  connect.server({root: 'public'});
});

gulp.task('offline', ['build'], () =>
   oghliner.offline(
     {
       rootDir: './public/',
       fileGlobs: [
         'browserconfig.xml',
         'manifest.json',
         'index.html',
         'dist/css/main.css',
         'dist/js/app.js',
         'dist/images/**',
         'favicon.ico',
       ]
     }
   )
);

gulp.task('default', ['build', 'offline']);
