import { Selector, ClientFunction } from "testcafe";
import { administratorUser, authenticatedUser } from "./drupal/users.js";

const system = require("./drupal/system.js");
const userProfilePagePathPattern = /\/user\/[0-9]*$/;

fixture("Login tests").page(system.getTestDomain);

test("Login as authenticated user", async t => {
  await t.useRole(authenticatedUser);
  await t.expect(system.getPath()).match(userProfilePagePathPattern);
});

test("Login as admin user", async t => {
  await t.useRole(administratorUser);
  await t.expect(system.getPath()).match(userProfilePagePathPattern);
});
