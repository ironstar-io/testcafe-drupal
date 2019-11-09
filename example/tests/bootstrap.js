const createTestCafe = require("testcafe");
const { TestRunner } = require("testcafe-drupal");

/**
 * Create Test Runner.
 * 
 * Test should be run using the TestRunner class, which enables you to configure
 * which browsers to run tests with and specifically which tests to run. The 
 * TestRunner also provides error logging and screen capture functionality to 
 * your tests.
 * 
 * Examples:
 * 
 * -- Run a series of test using Puppeteer headless browser.
 * 
 *   const testRunner = new TestRunner(
 *     createTestCafe,
 *       ["puppeteer"],
 *       [
 *         "tests/fixtures/pages.js",
 *         "tests/fixtures/content.js"
 *       ]
 *    ); 
 *
 * -- Run a series of test using local Chrome browser.
 * 
 *   const testRunner = new TestRunner(
 *     createTestCafe,
 *       ["chrome"],
 *       [
 *         "tests/fixtures/pages.js",
 *         "tests/fixtures/content.js"
 *       ]
 *    );
 *  
 * -- Run a series of test using local Chrome and Firefox browsers.
 * 
 *   const testRunner = new TestRunner(
 *     createTestCafe,
 *       ["chrome", "firefox"],
 *       [
 *         "tests/fixtures/pages.js",
 *         "tests/fixtures/content.js"
 *       ]
 *    ); 
 */

const testRunner = new TestRunner(
  createTestCafe,
  ["chrome"],
  [
    "tests/fixtures/pages.js",
    "tests/fixtures/content.js"
  ]
);

testRunner.runTests();
