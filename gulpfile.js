"use strict"
/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var path = {
  build: {
    html:  'build/',
    css:   'build/css/',
    js:    'build/js/',
    img:   'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html:  'src/*.html',
    scss:  'src/scss/main.scss',
    js:    'src/js/main.js',
    img:   'src/img/**/*.*',
    svg:   'src/img/svg/*.svg',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html:   'src/**/*.html',
    scss:   'src/scss/**/*.scss',
    js:     'src/js/**/*.js'
  },
  clean:    './build'
};

var gulp = require("gulp"), // подключение gulp
    webserver = require("browser-sync"), // сервер для работы и автоматического обновления страниц
    plumber = require("gulp-plumber"), // модуль для отслеживания ошибок
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    postcss = require("gulp-postcss"), // подключение postcss
    autoprefixer = require("autoprefixer"), // модуль для автоматической установки автопрефиксов
    mqpacker = require("css-mqpacker"), // модуль для обьединения медиа выражений
    sass = require("gulp-sass"), // модуль для компиляции SASS (SCSS) в CSS
    minifyCSS = require("gulp-csso"), // плагин для минимизации CSS
    uglify = require("gulp-uglify"), // плагин для минимизации JS
    rename = require("gulp-rename"), // плагин для переименования файлов
    imagemin = require("gulp-imagemin"), // плагин для минимизации изображений
    svgstore = require("gulp-svgstore"), // плагин для создания svg спрайтов
    svgmin = require("gulp-svgmin"), // плагин для минимизации svg
    cache = require('gulp-cache'), // модуль для кэширования
    runSequence = require("run-sequence"), // плагин для последовательного запуска задач
    del = require("del"); // плагин для удаления файлов и каталогов

gulp.task("clean", function () { // удаляет build
  return del(path.clean);
});

// очистка кэша
gulp.task('cache', function () {
  cache.clearAll();
});

gulp.task("copy", function() { // копирует необходимые файлы в build
  return gulp.src([
    path.src.html,
    path.src.js,
    path.src.img,
    path.src.fonts,
  ], {
    base: "./src/" // если не указать то все файлы будут лежать в корне, а не по папкам
  })
  .pipe(gulp.dest("build"));
});

gulp.task("html", function() { // сбор html
  gulp.src(path.src.html) //  выбор всех html файлов по указанному пути
    .pipe(plumber()) // отслеживание ошибок
    .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
    .pipe(webserver.reload({stream: true})); // команда перезагрузки сервера
});

gulp.task("css", function() { // сбор стилей
  gulp.src(path.src.scss) // получаем main.scss
  .pipe(plumber()) // чтобы не падал процесс автоматизации при ошибках
  .pipe(sass()) // проганяем через компилятор sass
  .pipe(postcss([
    autoprefixer({browsers: [
      'last 15 versions',
      '> 1%',
      'ie 8',
      'ie 7'
    ]}),
    mqpacker({
      sort: true
    })
  ]))
  .pipe(gulp.dest(path.build.css)) // исходный результат записываем в css
  .pipe(minifyCSS()) // минифицируем
  .pipe(rename("main.min.css"))
  .pipe(gulp.dest(path.build.css))
  .pipe(webserver.reload({stream: true})); // команда перезагрузки странички
});

gulp.task('js', function() {
  gulp.src(path.src.js) // получаем main.js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указынные файлы в main.js
    .pipe(gulp.dest(path.build.js)) // выгружаем в папку build/js
    .pipe(uglify()) // минифицируем js
    .pipe(rename({suffix: '.min'})) //добавляем суффикс .min
    .pipe(gulp.dest(path.build.js)) // выгружаем в папку build/js
    .pipe(webserver.reload({stream: true})); // команда перезагрузки сервера
});

gulp.task("img", function() { // создание таска images
  return gulp.src("build/img/**/*.{png,jpg,gif}") // указываем откуда брать изображения
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}), // безопастное сжатие (1 - макс. сжатие, 10 - без сжатия)
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest(path.build.img)); // указываем куда ложить минифицированные изображения
});

gulp.task("svgSprite", function () { // таск для сборки svg-спрайта
  return gulp.src(path.src.svg) // указываем откуда брать изображения svg
  .pipe(svgmin()) // минимизируем svg перед созданием спрайта
  .pipe(svgstore({ // создаем спрайт
    inlineSvg: true // уберет из файла все не нужное (doctype, xml и прочее)
  }))
  .pipe(rename("svgSprite.svg")) // переименовываем спрайт
  .pipe(gulp.dest(path.build.img)); // указываем куда ложить готовый спрайт
});

gulp.task("webserver", function () {
  webserver.init({
    server: "./build" // откуда browser-sync будет смотреть на наш сайт
  });
  gulp.watch(path.watch.html, ["html"]); // watch'ер который следит за изменениями файлов html
  gulp.watch(path.watch.scss, ["css"]); // watch'ер который следит за изменениями файлов scss (если один из этих файлов изменился то выполняем необходимый таск)
  gulp.watch(path.watch.js, ["js"]); // watch'ер который следит за изменениями файлов js
});

gulp.task("build", function (fn) {
  runSequence("clean", "copy", "css", "js", "img", "svgSprite", fn);
});
