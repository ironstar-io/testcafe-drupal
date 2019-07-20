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

  return {
    baseUrl:
      process.env.TESTCAFE_BASEURL || getSafe(() => resolvedConfig.baseUrl),
    node: {
      create: {
        path:
          process.env.TESTCAFE_DRUPAL_NODE_CREATE_PATH ||
          getSafe(() => resolvedConfig.node.create.path),
        selectors: {
          title: 
            process.env.TESTCAFE_DRUPAL_NODE_CREATE_SELECTORS_TITLE ||
            getSafe(() => resolvedConfig.node.create.selectors.title),
          save_button: 
            process.env.TESTCAFE_DRUPAL_NODE_CREATE_SELECTORS_SAVE_BUTTON ||
            getSafe(() => resolvedConfig.node.create.selectors.save_button)
        }
      }
    },
    users: {
      admin: {
        username:
          process.env.TESTCAFE_DRUPAL_USERS_ADMIN_USERNAME ||
          getSafe(() => resolvedConfig.users.admin.username),
        password:
          process.env.TESTCAFE_DRUPAL_USERS_ADMIN_PASSWORD ||
          getSafe(() => resolvedConfig.users.admin.password),
        role:
          process.env.TESTCAFE_DRUPAL_USERS_ADMIN_ROLE ||
          getSafe(() => resolvedConfig.users.admin.role)
      },
      editor: {
        username:
          process.env.TESTCAFE_DRUPAL_USERS_EDITOR_USERNAME ||
          getSafe(() => resolvedConfig.users.editor.username),
        password:
          process.env.TESTCAFE_DRUPAL_USERS_EDITOR_PASSWORD ||
          getSafe(() => resolvedConfig.users.editor.password),
        role:
          process.env.TESTCAFE_DRUPAL_USERS_EDITOR_ROLE ||
          getSafe(() => resolvedConfig.users.editor.role)
      },
      authenticated_user: {
        username:
          process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_USERNAME ||
          getSafe(() => resolvedConfig.users.authenticated_user.username),
        password:
          process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_PASSWORD ||
          getSafe(() => resolvedConfig.users.authenticated_user.password)
      }
    },
    user: {
      login: {
        path:
          process.env.TESTCAFE_DRUPAL_USER_LOGIN_PATH ||
          getSafe(() => resolvedConfig.user.login.path),
        selectors: {
          username:
            process.env.TESTCAFE_DRUPAL_USER_LOGIN_SELECTORS_USERNAME ||
            getSafe(() => resolvedConfig.user.login.selectors.username),
          password:
            process.env.TESTCAFE_DRUPAL_USER_LOGIN_SELECTORS_PASSWORD ||
            getSafe(() => resolvedConfig.user.login.selectors.password),
          login_button:
            process.env.TESTCAFE_DRUPAL_USER_LOGIN_SELECTORS_LOGINBUTTON ||
            getSafe(() => resolvedConfig.user.login.selectors.login_button)
        }
      },
      add: {
        path:
          process.env.TESTCAFE_DRUPAL_USER_ADD_PATH ||
          getSafe(() => resolvedConfig.user.add.path)
      }
    }
  };
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
