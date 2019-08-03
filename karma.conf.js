let browserStackConfig = {};
try {
  browserStackConfig = require("./browserstack.config");
} catch (e) {}

const webpackConfig = require("./webpack.config");

const isBS = !!process.env.BROWSERSTACK;

module.exports = config => {
  config.set({
    frameworks: ["mocha"],
    reporters: ["mocha"],
    // singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO,
    timeout: 30 * 1000,
    preprocessors: {
      "test/*.test.ts": ["webpack"]
    },
    webpack: webpackConfig,
    files: ["test/*.test.ts"],
    browsers: process.env.TARGET
      ? process.env.TARGET.split(",")
      : isBS
      ? ["bs_ie11"]
      : ["ChromeHeadless"],

    browserStack: browserStackConfig,
    customLaunchers: {
      bs_ie11: {
        base: "BrowserStack",
        browser: "IE",
        browser_version: "11.0",
        os: "Windows",
        os_version: "10"
      },
      bs_firefox: {
        base: "BrowserStack",
        browser: "firefox",
        browser_version: "65",
        os: "Windows",
        os_version: "10"
      },
      bs_chrome: {
        base: "BrowserStack",
        browser: "chrome",
        browser_version: "72",
        os: "Windows",
        os_version: "10"
      },
      bs_safari_10: {
        base: "BrowserStack",
        os: "OS X",
        os_version: "Sierra",
        browser: "Safari",
        browser_version: "10"
      },
      bs_ios_safari: {
        base: "BrowserStack",
        os: "ios",
        os_version: "10.3",
        device: "iPhone 7",
        // base: "BrowserStack",
        real_mobile: true
        // os: "ios",
        // os_version: "10.3",
        // device: "iPhone 7"
      },
      bs_android: {
        base: "BrowserStack",
        real_mobile: true,
        os: "android",
        os_version: "9.0",
        device: "Google Pixel 3"
      }
    }
  });
};
