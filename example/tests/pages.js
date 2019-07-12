const { RequestLogger } = require("testcafe");
const { getBaseUrl } = require("testcafe-drupal");

const logger = RequestLogger(getBaseUrl());

fixture("Site page accessibility tests");

test.requestHooks(logger).page(getBaseUrl())(
  "Homepage is accessible",
  async t => {
    // Ensure that the response has been received and that its status code is
    // 200.
    await t
      .expect(logger.contains(record => record.response.statusCode === 200))
      .ok();
  }
);
