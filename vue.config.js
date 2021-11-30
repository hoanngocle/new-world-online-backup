const fs = require('fs');
const path = require('path');

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    host: process.env.WEB_HOST || 'http://localhost', // default: localhost
    port: process.env.WEB_HTTPS ? process.env.WEB_PORT_HTTPS : process.env.WEB_PORT_HTTP,
    https: {
      key: fs.readFileSync('./.cert/newworld.online+3-key.pem'),
      cert: fs.readFileSync('./.cert/newworld.online+3.pem'),
    },
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        };
        return options;
      });
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
};
