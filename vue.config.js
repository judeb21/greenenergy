// const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    manifestOptions: {
      name: "Green Energy",
      short_name: "GE",
      theme_color: "#0066F5",
      msTileColor: "#0066F5",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "#0066F5",
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/abstracts/variables.scss";
          @import "@/styles/abstracts/mixins.scss";
          @import "@/styles/mixins/responsive.scss";
        `,
      },
    },
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  devServer: {
    // 'auto' | 'all' [string] here
    allowedHosts: "all",
  },
};

// module.exports = defineConfig({
//   transpileDependencies: true,
// });
