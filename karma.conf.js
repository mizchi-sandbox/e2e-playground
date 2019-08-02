const browserStackConfig = require("./browserstack.config");
const webpackConfig = require("./webpack.config");

const isCI = !!process.env.CI;

module.exports = config => {
  config.set({
    // karma settings
    frameworks: ["mocha"],
    reporters: ["mocha"],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO,

    // target
    preprocessors: {
      "test/*_test.ts": ["webpack"],
      "test-e2e/*_test.ts": ["webpack"]
    },
    webpack: webpackConfig,
    files: [
      "test/*_test.ts",
      "test/*_test.html",
      "test-e2e/*_test.ts",
      "test-e2e/*_test.html"
    ],
    browsers: isCI ? ["IE11"] : ["ChromeHeadless"],

    browserStack: browserStackConfig,
    customLaunchers: {
      IE11: {
        base: "BrowserStack",
        browser: "IE",
        browser_version: "11.0",
        os: "Windows",
        os_version: "10"
      }
    }
  });
};
