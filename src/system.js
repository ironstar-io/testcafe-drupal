const path = require("path");
const { getSafe } = require("./helpers");

const configuration = require(path.join(process.cwd(), "/tests/config.js"));

/**
 * @var {object} defaultConfig
 *   Default values for Drupal TestCafe configuration.
 */
const defaultConfig = {
  baseUrl: "http://localhost:8080",
  node: {
    create: {
      path: "/node/add",
      selectors: {
        title: "#edit-title-0-value",
        save_button: "#edit-submit"
      }
    }
  },
  users: {
    admin: {
      username: "testcafe_admin",
      password: "testcafe_admin",
      role: "administrator"
    },
    editor: {
      username: "testcafe_editor",
      password: "testcafe_editor",
      role: "editor"
    },
    authenticated_user: {
      username: "testcafe_user",
      password: "testcafe_user"
    }
  },
  user: {
    login: {
      path: "/user/login",
      selectors: {
        username: "#edit-name",
        password: "#edit-pass",
        login_button: "form.user-login-form #edit-submit"
      }
    },
    add: {
      path: "/admin/people/create"
    }
  }
};

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

  if (typeof process.env.TESTCAFE_BASEURL !== "undefined") {
    resolvedConfig.baseUrl = process.env.TESTCAFE_BASEURL;
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
