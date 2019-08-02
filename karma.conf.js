const webpack = require("webpack");
const browserStack = require("./browserstack.config");
const isCI = !!process.env.CI;

module.exports = config => {
  config.set({
    browserStack,
    customLaunchers: {
      bs_ie_11: {
        base: "BrowserStack",
        browser: "IE",
        browser_version: "11.0",
        os: "Windows",
        os_version: "10"
      }
    },
    browsers: isCI ? ["bs_ie_11"] : ["ChromeHeadless"],
    frameworks: ["mocha"],
    singleRun: true,

    files: ["test/*_test.ts", "test/*_test.html"],

    preprocessors: { "test/*_test.ts": ["webpack"] },

    webpack: {
      mode: process.env.WEBPACK_MODE || "production",
      resolve: {
        extensions: [".js", ".mjs", ".ts", ".tsx"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
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
    },
    reporters: ["mocha"],
    colors: true,
    logLevel: config.LOG_INFO
  });
};
