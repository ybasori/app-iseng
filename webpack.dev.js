const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const fs = require("fs");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
    },
    proxy: {
      "*": {
        target: `https://0.0.0.0:5000/`,
        secure: false, // ⛔ disables SSL cert check
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
    static: "./public",
    client: {
      overlay: {
        errors: false,
        runtimeErrors: false,
      },
    },
  },
  output: {
    clean: true,
    publicPath: "/assets/js",
  },
});
