const path = require("path");
const { getSafe } = require("./helpers");

const defaultConfig = require("./config.default.js");
const configuration = require(path.join(process.cwd(), "/tests/config.js"));

/**
 * Get user configuration.
 *
 * @return {object}
 *  An object containing the users' specified Drupal TestCafe configuration
 *  Order of precedence
 *    1. Environment variables
 *    2. tests/config.js
 *    3. package.json
 *
 *  Note that environment variables will overwrite individual properties, however for
 *  config files, it's all or none.
 */
const getConfig = () => {
  const resolvedConfig = Object.assign({}, defaultConfig, configuration);

  // Allow config overrides using environmental variables.
  if (typeof process.env.TESTCAFE_BASEURL !== "undefined") {
    resolvedConfig.baseUrl = process.env.TESTCAFE_BASEURL;
  }
  if (typeof process.env.TESTCAFE_DRUPAL_USERS_ADMIN_USERNAME !== "undefined") {
    resolvedConfig.users.admin.username = process.env.TESTCAFE_DRUPAL_USERS_ADMIN_USERNAME;
  }
  if (typeof process.env.TESTCAFE_DRUPAL_USERS_ADMIN_PASSWORD !== "undefined") {
    resolvedConfig.users.admin.password = process.env.TESTCAFE_DRUPAL_USERS_ADMIN_PASSWORD;
  }
  if (typeof process.env.TESTCAFE_DRUPAL_USERS_EDITOR_USERNAME !== "undefined") {
    resolvedConfig.users.editor.username = process.env.TESTCAFE_DRUPAL_USERS_EDITOR_USERNAME;
  }
  if (typeof process.env.TESTCAFE_DRUPAL_USERS_EDITOR_PASSWORD !== "undefined") {
    resolvedConfig.users.editor.password = process.env.TESTCAFE_DRUPAL_USERS_EDITOR_PASSWORD;
  }
  if (typeof process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_USERNAME !== "undefined") {
    resolvedConfig.users.authenticated_user.username = process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_USERNAME;
  }
  if (typeof process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_PASSWORD !== "undefined") {
    resolvedConfig.users.authenticated_user.password = process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_PASSWORD;
  }

  return resolvedConfig;
};

/**
 * @var {object} config
 *   An object containing the users' Drupal TestCafe configuration. This is the
 *   final configuration after all environment variable and user specific 
 *   overrides have been applied. @see getConfig().
 */
const config = getConfig();

/**
 * Get domain of the test target site.
 *
 * @return {string}
 *   The target test site domain as defined in the configuration (e.g. "http://www.mysite.com").
 */
const getBaseUrl = () => {
  const { baseUrl } = getConfig();

  return baseUrl;
};

/**
 * @var {string} baseUrl
 *   Base URL of the target test site (e.g. "http://www.testsite.com").
 */
const baseUrl = getBaseUrl();

module.exports = {
  config,
  baseUrl,
  getConfig,
  getSafe
};
