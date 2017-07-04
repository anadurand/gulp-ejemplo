var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var config = {
  source: './src/',
  dist: './public/'
};
var paths = {
  assets: 'assets/',
  html: '**/*.html',
  sass: 'scss/**/*.scss',
  js: 'js/**/*.js',
  mainSass: 'scss/main.scss',
  mainJS: 'js/app.js'
};
var sources = {
  assets: config.source + paths.assets,
  html: config.source + paths.html,
  sass: config.source + paths.assets + paths.sass,
  js: config.source + paths.assets + paths.js,
  rootSass: config.source + paths.assets + paths.mainSass,
  rootJS: config.source + paths.assets + paths.mainJS
};
gulp.task('html', ()=> {
  gulp.src(sources.html).pipe(gulp.dest(config.dist));
});
gulp.task('sass', ()=> {
  gulp.src(sources.rootSass)
    .pipe(sass({
      outStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(gulp.dest(config.dist + paths.assets + "css"))
    .pipe(browserSync.stream());

});

gulp.task('js', ()=> {
   gulp.src(sources.rootJS)
      .pipe(browserify())
      .pipe(rename("bundle.js"))
      .pipe(gulp.dest(config.dist + paths.assets + "js"))
      .pipe(browserSync.stream());
});

gulp.task('html-watch', ["html"], function (done) {
  browserSync.reload();
  done();
});

gulp.task('serve', ()=> {
  browserSync.init({
    server: {
      baseDir: config.dist
    }
  });
  gulp.watch(sources.sass, ['sass']);
  gulp.watch(sources.js, ['js']);
  gulp.watch(sources.html, ['html-watch']);
});

gulp.task('default', ['serve']);
