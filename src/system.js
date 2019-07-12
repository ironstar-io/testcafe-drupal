const { ClientFunction } = require("testcafe");
const { getSafe } = require("./helpers");

const config = require(`${process.cwd()}/tests/config`);

const defaultConfig = {
  system: {
    domain: "http://localhost:8080"
  },
  node: {
    create: {
      path: "/node/add"
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
  const resolvedConfig = Object.assign({}, defaultConfig, config);

  return {
    system: {
      domain:
        process.env.TESTCAFE_DRUPAL_SYSTEM_DOMAIN ||
        getSafe(() => resolvedConfig.baseUrl)
    },
    node: {
      create: {
        path:
          process.env.TESTCAFE_DRUPAL_NODE_CREATE_PATH ||
          getSafe(() => resolvedConfig.node.create.path)
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
 * Get webpage path.
 *
 * @return {string}
 *   The pathname component of the current page's URL (e.g. "/node/12")
 */
const getPath = ClientFunction(() => document.location.pathname);

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

module.exports = {
  getConfig,
  getBaseUrl,
  getPath
};
