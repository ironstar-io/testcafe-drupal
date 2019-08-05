const createTestCafe = require("testcafe");

const runTests = async () => {
  let testcafe; // Outer scope due to use in `finally` block
  try {
    testcafe = await createTestCafe("localhost", 1337, 1338);
    const runner = testcafe.createRunner();

    // const remoteConnection = await testcafe.createBrowserConnection();

    // console.log(
    //   `Running tests can be viewed by visiting ${remoteConnection.url}`
    // );

    console.log("Starting test runner...");

    const failedCount = await runner
      .src(["tests/fixtures"])
      .browsers(["chromium:headless"])
      .screenshots(
        `${__dirname}/reports/screenshots/`,
        true,
        "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"
      )
      .video(
        `${__dirname}/reports/videos/`,
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
          output: `${__dirname}/reports/report.xml`
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
};

runTests();
