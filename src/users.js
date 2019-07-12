/**
 * @file
 * Defines Testcafe Roles (https://devexpress.github.io/testcafe/documentation/test-api/authentication/user-roles.html).
 */

const { Role } = require("testcafe");
const { getConfig } = require("./system");
const { getSafe } = require("./helpers");

const config = getConfig();

const loginUrl = `${getSafe(() => config.baseUrl)}${getSafe(
  () => config.user.login.path
)}`;
const userNameFieldSelector = getSafe(
  () => config.user.login.selectors.username
);
const passwordFieldSelector = getSafe(
  () => config.user.login.selectors.password
);
const loginButtonSelector = getSafe(
  () => config.user.login.selectors.login_button
);

/**
 * Authenticated user.
 */
const authenticatedUser = Role(
  loginUrl,
  async t => {
    await t
      .typeText(
        userNameFieldSelector,
        getSafe(() => config.users.authenticated_user.username)
      )
      .typeText(
        passwordFieldSelector,
        getSafe(() => config.users.authenticated_user.password)
      )
      .click(loginButtonSelector);
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
      .typeText(
        userNameFieldSelector,
        getSafe(() => config.users.editor.username)
      )
      .typeText(
        passwordFieldSelector,
        getSafe(() => config.users.editor.password)
      )
      .click(loginButtonSelector);
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
      .typeText(
        userNameFieldSelector,
        getSafe(() => config.users.admin.username)
      )
      .typeText(
        passwordFieldSelector,
        getSafe(() => config.users.admin.password)
      )
      .click(loginButtonSelector);
  },
  { preserveUrl: true }
);

module.exports = { authenticatedUser, administratorUser, editorUser };
