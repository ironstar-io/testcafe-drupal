module.exports = {
  baseUrl: "https://auspost.local.tokaido.io:5154",
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
  },
  message: {
    selectors: {
      status: ".messages--status",
      error: ".messages--error"
    }
  }
};
