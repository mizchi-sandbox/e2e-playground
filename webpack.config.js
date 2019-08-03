const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ASSET_HOST = process.env.ASSET_HOST || "/";

module.exports = {
  mode: process.env.WEBPACK_MODE || "production",
  output: {
    publicPath: ASSET_HOST
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        ASSET_HOST: JSON.stringify(process.env.ASSET_HOST),
        BROWSERSTACK: JSON.stringify(process.env.BROWSERSTACK || "/")
      }
    }),
    new CleanWebpackPlugin()
  ]
};
