const {src, dest, parallel, series, watch} = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const sass = require('gulp-sass')(require('sass'));
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fs = require("fs");
const del = require("del");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify");
const image = require("gulp-image");

const fonts = () => {
  src("./src/fonts/**/*.ttf")
  .pipe(ttf2woff())
  .pipe(dest("./app/fonts/"));

  return src("./src/fonts/**/*.ttf")
  .pipe(ttf2woff2())
  .pipe(dest("./app/fonts/"));
}

const svgSprites = () => {
  return src("./src/img/svg/**/*.svg")
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprites.svg"
      }
    }
  }))
  .pipe(dest("./app/img"));
};

const styles = () => {
  return src("./src/scss/**/*.scss")
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: "expanded",
  }).on('error', notify.onError()))
  .pipe(rename({
    suffix: ".min",
  }))
  .pipe(autoPrefixer({
    cascade: false,
  }))
  .pipe(cleanCSS({
    level: 2,
  }))
  .pipe(sourcemaps.write("."))
  .pipe(dest("./app/css/"))
  .pipe(browserSync.stream());
};

const htmlInclude = () => {
  return src("./src/index.html")
  .pipe(fileinclude({
    prefix: "@",
    basepath: "@file",
  }))
  .pipe(dest("./app/"))
  .pipe(browserSync.stream());
};

const imgToApp = () => {
  return src(["./src/img/**/*.jpg", "./src/img/**/*.png", "./src/img/**/*.jpeg", "./src/img/*.svg"])
  .pipe(dest("./app/img"))
};

const resources = () => {
  return src("./src/resources/**")
  .pipe(dest("./app"));
}

const cb = () => {}

let srcFonts = "./src/scss/_fonts.scss";
let appFonts= "./app/fonts";

const fontsStyle = (done) => {
  let file_content = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, "", cb);
  fs.readdir(appFonts, (err, items) => {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
        let fontname = items[i].split(".");
        fontname = fontname[0];
        if (c_fontname != fontname) {
          fs.appendFile(srcFonts, '@include font-face("' + fontname.split("-")[0] + '", "'+ fontname + '", "'+ fontname.split("-")[1] +'");\r\n', cb);
        }
        c_fontname = fontname;
      }
    }
  });

  done();
}

const clean = () => {
  return del("./app/");
}

const scripts = () => {
  return src("./src/js/main.js")
  .pipe(webpackStream({
    output: {
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ]
    }
  }))
  .pipe(sourcemaps.init())
  .pipe(uglify().on('error', function (err) {
    console.error('WEBPACK ERROR', err);
    this.emit('end');
  }))
  .pipe(sourcemaps.write("."))
  .pipe(dest("./app/js"))
  .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  })

  watch("./src/scss/**/*.scss", styles);
  watch("./src/index.html", htmlInclude);
  watch("./src/html/**/*.html", htmlInclude);
  watch("./src/img/**/*.jpg", imgToApp);
  watch("./src/img/**/*.png", imgToApp);
  watch("./src/img/**/*.jpeg", imgToApp);
  watch("./src/img/*.svg", imgToApp);
  watch("./src/img/**/*.svg", svgSprites);
  watch("./src/resources/**", resources);
  watch("./src/fonts/**/*.ttf", fonts);
  watch("./src/fonts/**/*.ttf", fontsStyle);
  watch("./src/js/**/*.js", scripts)
}

exports.styles = styles;
exports.watchFiles = watchFiles;

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, resources, imgToApp, svgSprites), fontsStyle, styles, watchFiles);

const images = () => {
  return src(["./src/img/**/*.jpg", "./src/img/**/*.png", "./src/img/**/*.jpeg",])
  .pipe(image())
  .pipe(dest('./app/img/'));
}

const stylesBuild = () => {
  return src("./src/scss/**/*.scss")
  .pipe(sass({
    outputStyle: "expanded",
  }).on('error', notify.onError()))
  .pipe(rename({
    suffix: ".min",
  }))
  .pipe(autoPrefixer({
    cascade: false,
  }))
  .pipe(cleanCSS({
    level: 2,
  }))
  .pipe(dest("./app/css/"));
};

const scriptsBulid = () => {
  return src("./src/js/main.js")
  .pipe(webpackStream({
    output: {
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ]
    }
  }))
  .pipe(uglify().on('error', function (err) {
    console.error('WEBPACK ERROR', err);
    this.emit('end');
  }))
  .pipe(dest("./app/js"));
}

exports.build = series(clean, parallel(htmlInclude, scriptsBulid, fonts, resources, imgToApp, svgSprites), fontsStyle, stylesBuild, images);
