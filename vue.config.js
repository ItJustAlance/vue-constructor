const path = require("path");
// const resolve = dir => path.join(__dirname, dir);

module.exports = {
  // devServer: {
  //   proxy: {
  //     '^/api/v1': {
  //       target: 'http://backend.ru/',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //   }
  // },
  devServer: {
    // disableHostCheck: true
    proxy: "http://31.31.203.22"
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/scss/_app.scss";`,
      }
    },
    sourceMap: true
  },
  /*
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    },
  },
*/
  chainWebpack: config => {
    config.module
      .rule("svg-sprite")
      .use("svgo-loader")
      .loader("svgo-loader");
    config.resolve.alias.set(
      "@img",
      path.resolve(__dirname, "./src/assets/img")
    );
  },
  publicPath: "/",
  // outputDir: 'assets',
  assetsDir: "assets"
};
