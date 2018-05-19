/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const size = require('gulp-size');
const cleanss = require('gulp-cleancss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const gulpSequence = require('gulp-sequence');
const newer = require('gulp-newer');
const image = require('gulp-image');
const postcss = require('gulp-postcss');
// const uncss = require('postcss-uncss');

const dirs = {
  srcPath: './src/',
  buildPath: './build/'
};

const copiedJs = [
  // './node_modules/whatwg-fetch/fetch.js',
  // './node_modules/es6-promise/dist/es6-promise.auto.js',
  './node_modules/loglevel/dist/loglevel.js'
];

const postCssPlugins = [
  autoprefixer({ browsers: ['last 2 version', 'Safari >= 8'] })//,
  // uncss({ html: [`${dirs.srcPath}/*.html`] })
  // mqpacker({
  //   sort: true
  // }),
  // atImport(),
  // inlineSVG()
];

gulp.task('clean', () => {
  console.log('---------- Очистка папки сборки');
  return del([
    `${dirs.buildPath}/**/*`,
    `!${dirs.buildPath}/readme.md`
  ]);
});

gulp.task('style', () => {
  const sourcemaps = require('gulp-sourcemaps');
  const wait = require('gulp-wait');
  console.log(dirs.srcPath + '/style.css');
  return gulp.src(dirs.srcPath + '/style.css')
    .pipe(plumber({
      errorHandler: (err) => {
        notify.onError({
          title: 'Single style compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(wait(100))
    .pipe(sourcemaps.init())
    .pipe(postcss(postCssPlugins))
    .pipe(cleanss())
    .pipe(sourcemaps.write('/'))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('html', () => {
  return gulp.src(dirs.srcPath + '/*.html')
    .pipe(plumber({
      errorHandler: (err) => {
        notify.onError({
          title: 'HTML compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(dirs.buildPath));
});

gulp.task('copy:js', (callback) => {
  if (copiedJs.length) {
    return gulp.src(copiedJs)
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/js'));
  } else callback();
});

gulp.task('img:opt',  (callback) => {
  const imagemin = require('gulp-imagemin');
  return gulp.src(dirs.srcPath + '/img/*.{jpg,jpeg,gif,png,svg}')
    .pipe(image({
      jpegRecompress: false//,
    }))
    .pipe(gulp.dest(dirs.buildPath));
});

gulp.task('copy:img', () => {
  return gulp.src(dirs.srcPath + '/img' + '/*.{jpg,jpeg,gif,png,svg}')
    .pipe(newer(dirs.buildPath + '/img'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/img'));
});

gulp.task('build', (callback) => {
  gulpSequence(
    'clean',
    ['style', 
     'js',
     'copy:img'],
    'html',
    callback
  );
});

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', () => {
  const ghPages = require('gulp-gh-pages');
  console.log('---------- Публикация содержимого ./build/ на GH pages');
  return gulp.src(dirs.buildPath + '**/*')
    .pipe(ghPages());
});

// Сборка пакета с production настройками
gulp.task('js', () => {
  const webpack = require('webpack');
  const gulpWebpack = require('webpack-stream');
  const webpackSettings = require('./webpack.prod.js')
  return gulp.src(dirs.srcPath + '/js/index.jsx')
    .pipe(gulpWebpack(webpackSettings, webpack, (err, stats) => {
    if (err) {
      console.log(JSON.stringify(err));
      return err
    }
    if (stats.hasErrors() || stats.hasWarnings()) {
      console.log(stats.toString());
      return stats.toJson();
    }
      // console.log(stats.toString());
    }))
    .pipe(plumber({
      errorHandler: (err) => {
        notify.onError({
          title: 'JS compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(dirs.buildPath));
})

// Задача по умолчанию
gulp.task('default', ['serve']);

gulp.task('serve', ['build'], () => {
  let webpack = require('webpack');
  let webpackDevMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let webpackSettings = require('./webpack.dev.js')
  let bundler = webpack(webpackSettings);
  browserSync.init({
    server: {
      baseDir: [dirs.buildPath],
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackSettings.output.publicPath,
          clientLogLevel: 'error',
          hot: true,
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    startPath: 'index.html',
    open: false,
    host: 'localhost',
    port: 8080
  });
  // Слежение за стилями
  gulp.watch(dirs.srcPath + '/*.css', ['watch:style']);
  // Слежение за добавочными JS
  // if (copiedJs.length) {
  //   gulp.watch(copiedJs, ['watch:copy:js']);
  // }
  // Слежение за html
  gulp.watch([
    '*.html',
    dirs.blocksDirName + '/**/*.html'
  ], { cwd: dirs.srcPath }, ['watch:html']);
});

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('watch:img', ['copy:img'], reload);
// gulp.task('watch:copied:js', ['copy:js'], reload);
gulp.task('watch:html', ['html'], reload);
gulp.task('watch:style', ['style'], reload);
