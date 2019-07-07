import { RequestLogger } from "testcafe";

const config = require("config");
const system = require("./drupal/system.js");
const logger = RequestLogger(system.getTestDomain);

fixture("Site page accessibility tests");

test.requestHooks(logger).page(system.getTestDomain)(
  "Homepage is accessible",
  async t => {
    // Ensure that the response has been received and that its status code is
    // 200.
    await t
      .expect(logger.contains(record => record.response.statusCode === 200))
      .ok();
  }
);
