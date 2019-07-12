const {
  administratorUser,
  authenticatedUser,
  getPath,
  getBaseUrl
} = require("testcafe-drupal");

const userProfilePagePathPattern = /\/user\/.*$/;

fixture("Login tests").page(getBaseUrl());

test("Login as authenticated user", async t => {
  await t.useRole(authenticatedUser);
  await t.expect(getPath()).match(userProfilePagePathPattern);
});

test("Login as admin user", async t => {
  await t.useRole(administratorUser);
  await t.expect(getPath()).match(userProfilePagePathPattern);
});
