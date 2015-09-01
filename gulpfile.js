var gulp = require ('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var reactify = require('reactify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var path = {
  HTML: 'src/index.html',
  MINIFIED_BUILD: 'build.min.js',
  BUILD: 'build.js',
  BUILD_VENDOR: 'build.vendor.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/app.js',
  CSS_SRC: './src/css/**/*.css'
};

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy', browserSync.reload]);
  gulp.watch(path.DEST_SRC + '/' + path.BUILD, ['copy', browserSync.reload]);

  watch(path.CSS_SRC, function(){
      gulp.start('minify-css');
  });

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.BUILD))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');

  })
    .bundle()
    .pipe(source(path.BUILD))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('browser-sync', function() {
    browserSync({
        open: false,
        server: {
            baseDir: "./dist/"
        },
        ui: {
            port: 9000,
            weinre: {
                port: 9090
            }
        }
    });
});

gulp.task('minify-css', function() {
  return gulp.src(path.CSS_SRC)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(path.DEST_BUILD))
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_BUILD))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_BUILD
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch', 'browser-sync']);