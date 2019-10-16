const createTestCafe = require("testcafe");
const { TestRunner } = require("testcafe-drupal");

const testRunner = new TestRunner(
  createTestCafe,
  ["chrome"],
  ["tests/fixtures/pages.js", "tests/fixtures/content.js"]
);

testRunner.runTests();
