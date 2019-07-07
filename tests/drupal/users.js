/**
 * @file
 * Defines Testcafe Roles (https://devexpress.github.io/testcafe/documentation/test-api/authentication/user-roles.html).
 */

import { Role } from "testcafe";
const config = require("config");

const loginUrl = config.get("system.domain") + config.get("user.login.path");
const userNameFieldSelector = config.get("user.login.selectors.username");
const passwordFieldSelector = config.get("user.login.selectors.password");
const loginButtomSelector = config.get("user.login.selectors.login_button");

/**
 * Authenticated user.
 */
const authenticatedUser = Role(
  loginUrl,
  async t => {
    await t
      .typeText(userNameFieldSelector, config.get("users.authenticated_user.username"))
      .typeText(passwordFieldSelector, config.get("users.authenticated_user.password"))
      .click(loginButtomSelector);
  },
  { preserveUrl: true }
);

/**
 * User with editor role.
 */
const editorUser = Role(
  loginUrl,
  async t => {
    await t
      .typeText(userNameFieldSelector, config.get("users.editor.username"))
      .typeText(passwordFieldSelector, config.get("users.editor.password"))
      .click(loginButtomSelector);
  },
  { preserveUrl: true }
);

/**
 * User with administrator role.
 */
const administratorUser = Role(
  loginUrl,
  async t => {
    await t
      .typeText(userNameFieldSelector, config.get("users.admin.username"))
      .typeText(passwordFieldSelector, config.get("users.admin.password"))
      .click(loginButtomSelector);
  },
  { preserveUrl: true }
);

export { authenticatedUser, administratorUser, editorUser };
