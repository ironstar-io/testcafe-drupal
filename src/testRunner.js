const createTestCafe = require("testcafe");

class TestRunner {

  constructor(createTestCafe, browsers, testSources = ["tests/fixtures"]) {
    this.createTestCafe = createTestCafe;
    this.browsers = browsers;
    this.testSources = testSources;
  }

  async runTests() {
    let testcafe; // Outer scope due to use in `finally` block
    try {
      testcafe = await createTestCafe("localhost", 1337, 1338);
      const runner = testcafe.createRunner();
      const callingScriptPath = require('path').dirname(require.main.filename);

      console.log("Starting test runner...");

      const failedCount = await runner
        .src(this.testSources)
        .browsers(this.browsers)
        .screenshots(
          `${callingScriptPath}/reports/screenshots/`,
          true,
          "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"
        )
        .video(
          `${callingScriptPath}/reports/videos/`,
          {
            singleFile: true,
            failedOnly: true,
            pathPattern: "${DATE}_${TIME}/${USERAGENT}/${FILE_INDEX}.mp4"
          },
          {
            r: 20,
            aspect: "4:3"
          }
        )
        .reporter([
          "spec",
          {
            name: "xunit",
            output: `${callingScriptPath}/reports/report.xml`
          }
        ])
        .run({ skipJsErrors: true });

      if (failedCount > 0) {
        throw new Error(`${failedCount} tests failed!`);
      }

      console.log("All tests passing!");
    } catch (ex) {
      console.log(ex.message);
      process.exit(1);
    } finally {
      await testcafe.close();
      process.exit(0);
    }
  }

}

module.exports = { TestRunner };
