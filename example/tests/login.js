const { Role, ClientFunction } = require("testcafe");
const {
  administratorUser,
  authenticatedUser,
  baseUrl
} = require("testcafe-drupal");

const pathname = ClientFunction(() => document.location.pathname);

const userProfilePagePathPattern = /\/user\/.*$/;

fixture("Login tests").page(baseUrl);

test("Login as authenticated user", async t => {
  await t.useRole(Role(...authenticatedUser));
  await t.expect(pathname()).match(userProfilePagePathPattern);
});

test("Login as admin user", async t => {
  await t.useRole(Role(...administratorUser));
  await t.expect(pathname()).match(userProfilePagePathPattern);
});
