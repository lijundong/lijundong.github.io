const path = require("path");
const resolve = (dir) => path.resolve(__dirname, "../", dir);

module.exports = {
  entry: "./src/index.js",
  optimization: {
    splitChunks: {
      chunks: "initial",
      maxInitialRequests: 20,
      minSize: 200000,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
        npmVendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
    runtimeChunk: true,
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".css", ".json", ".string", ".tpl"],
    alias: {
      // "~common": resolve("common"),
    },
  },
};
