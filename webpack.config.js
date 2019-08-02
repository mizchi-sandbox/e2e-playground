const webpack = require("webpack");
module.exports = {
  mode: process.env.WEBPACK_MODE || "production",
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
        CI: JSON.stringify(process.env.CI)
      }
    })
  ]
};
