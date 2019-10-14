# TestCafe Drupal

## Introduction

This library provides a set of handy helper functions for running TestCafe tests on your Drupal application.

Example tests are provided are provided in the project's `/example` directory. 

## Prerequisites

- A Drupal project. **Note:** only Drupal 8 projects are officially supported.
- Access to the Drush command line tool.
- Node.js 8.6+

## Setup

### Preparing Your Tests

- Install this library and dependencies: `npm install --save-dev testcafe-drupal` or `yarn add -D ...`
- Create a directory `tests` in the root of your project
- Create a file called `config.js` in the `tests` directory (See [Config](#config) for more information)
- Set your configuration including base URL and other parameters (Again see [Config](#config))
- Optionally copy in the tests from this repository's [example](example) folder, or write and add your own.

### Preparing Drupal

- Make sure you have a running Drupal site which is browser accessible.
- Create an authenticated user: `drush user-create testcafe_user --password="testcafe_user" --mail="testcade_user@localhost"`
- Create an admin user: `drush user-create testcafe_admin --password="testcafe_admin" --mail="testcade_admin@localhost" && drush user-add-role "administrator" testcafe_admin`
- Create an editor user: `drush user-create testcafe_editor --password="testcafe_editor" --mail="testcafe_editor@localhost" && drush user-add-role "editor" testcafe_editor`

> The above instructions assume that Drupal user roles `administrator` and `editor` exist on the site. If your site uses different names for the "admin" and "editor" roles, then you should update the roles in the config.js file. 
>
> In addition you would need to modify the create user drush commands above.
>
> For example, if the maching name of the editor role is `ed`, then the modified Drush command whould be:
>
>     drush user-create testcafe_editor --password="testcafe_editor" --mail="testcafe_editor@localhost" && drush user-add-role "ed" testcafe_editor

## Config

Some configuration is required to be set in order for your tests to work.

Configuration is set in the following order of precedence, and can be composed with a combination:

1. [Environment variables](#environment-variables)
2. `{PROJECT_ROOT}/tests/config.js`
3. A set of fallback defaults

Here is a full list of available configuration and their default values

```js
{
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
  },
  message: {
    selectors: {
      status: ".messages--status",
      error: ".messages--error"
    }
  }
};
```

## Running tests

To run all tests on Chrome Headless run the following command from the `{PROJECT_ROOT}` directory:

```
// Run all tests using Chrome Headless.
npm run tests:headless:all

// Run all tests using locally install Chrome browser.
npm run tests:chrome:all
```

Individual tests, such as checking whether the home page is accessible, can be run using one of the follow commands:

```
// Run pages tests on Chrome headless.
testcafe puppeteer tests/fixtures/pages.js

// To see the pages tests run in your locally installed chrome browser.
testcafe chrome tests/fixtures/pages.js

// To prevent tests from failing due to client side javascript use the `-e` or `--skip-js-errors` 
// argument. By default tests will fail if there are client side errors in the javascript.
testcafe -e puppeteer tests/fixtures/pages.js
testcafe -e chrome tests/fixtures/pages.js --skip-js-errors
```

## API Reference

### Field

_{class}_

```
 @param object t
   TestCafe test controller.
```

Provides methods for interacting with Drupal fields created using the Field API.

Whilst the Field class can be used directly it should be noted that these methods can be accessed by other classes which extend the Field class. For example, the [Node](#node) class provides useful methods for working with node related tests, whilst also having access to all Field class methods.


Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);
  // Use field methods
});
```

#### addFileToField

```
@param {string} fileFieldId
  ID property of the file field.
@param {string} file
  Path to the image file to upload. Will use a default PDF image if this
  argument is not provided.
```

Add file to a Drupal file upload field. By default it will use a placeholder PDF file.

Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);
  await field.addFileToField("edit-field-file-0-upload");
}); 
```

#### addImageToField

```
@param {string} fileFieldId
  ID property of the file field.
@param {object} options
  An optional argument which can contain following key-value pairs:
  - "alt": image alt text. Note that if alt text is provided but the image 
    alt text has not been enabled in Drupal, then this function will throw
    an error.
  - "title": image title text. Note that if title text is provided but the 
    image title has not been enabled in Drupal, then this funciton will 
    throw an error. 
@param {string} image
  Path to the image file to upload. Will use a default JPG image if this
  argument is not provided.
```

Add Image to a Drupal file upload field. By default it will use a placeholder JPEG file. 

Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);
  await field.addImageToField(
    "edit-field-image-0-upload",
    { alt: "my alt text", title: "my title text" }
  );
}); 
```

#### addTextToField

```
@param {string} id
  CSS id selector of the form field.
@param {string} text
  Text to be added to field.
```

Add text for a text based field.

Works with `<input[type='text']>`, `<textarea>` and `CKEditor` based text fields.

Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);

  await field.addTextToField("edit-body-0-value", "hello")
});
```

#### checkSelectFieldHasOption

```
@param {string} id
  CSS id selector of the <select> element.
@param {array} text
  Select element option text to find. This value should be the text that
  is visible to the site visitor and is case sensitive.
```

Check `<select>` contains one or more given options.

Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);

  await field.checkSelectFieldHasOption(
    "edit-field-country",
    ["Australia", "China", "Mali"]
  )
});
```

#### chooseSelectFieldOption

```
@param {string} id
  Id property of the <select> element.
@param {string} text
  Select element option text. This value is case sensitve.
```

Choose `<select>` element option

Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);

  await field.chooseSelectFieldOption("edit-field-options", "Australia")
});
```

#### removeFileFromField

```
@param {string} id
  Id property of the Drupal file field.
```

Remove a file from a Drupal file field.

Usage:

```js
test("Example test", async t => {
  const field = new Field(t);
  await field.removeFileFromField(
    "edit-field-file-0-upload"
  );
});
```

#### removeImageFromField

```
@param {string} id
  Id property of the Drupal file field.
```

Remove an image file from a Drupal image field.

Usage:

```js
test("Example test", async t => {
  const field = new Field(t);
  await field.removeImageFromField(
    "edit-field-image-0-upload"
  );
});
```


## Node

Provides methods for interacting with Drupal node entities. 

_{class}_

```
@param {object} t
  TestCafe test controller.
@param {string} nodeType
  Machine name of the node type.
@param {object} config
  User's specific Drupal Testcafe configuration.
```

Usage:

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);

  // Use node methods
});
```

The Node class extends the [Field](#field) class so you can access the various field methods directly via the Node class.

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);

  await node.goToNodeCreationPage();
  await node.addTextToField(
    "edit-body-0-value",
    "Here is my test text. What do you think? Something else here as well."
  );
}
```

### checkOnNodePage

Check if currently on view node page.

Usage:

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);
  
  await node.goToNodeCreationPage();
  await node.checkOnNodePage()
});
```

### goToNodeCreationPage

Go to node creation page of given node type.

Usage:

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);

  await node.goToNodeCreationPage()
});
```

### saveNode

Save node. Clicks save button on node add/edit form.

Usage:

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);

  await node.goToNodeCreationPage();
  ...
  await node.saveNode()
});
```

### setTitle

Set node title text.

```
@param {string} text
  Node title text.
```

Usage:

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);

  await node.goToNodeCreationPage();
  node.setTitle("This is the title")
  ...
});
```

## Message

Provides methods for interacting with Drupal generated messages. 

_{class}_

```
@param {object} t
  Testcafe test controller.
@param {object} config
  Drupal Testcafe configuration.
```

Usage:

```js
const { Message, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const message = new Message(t, config);

  // Use message methods.
  ...
});
```

### statusMessageContainsText

Check if Drupal generated status message contains given text.

```
@param {string} text
  Text to search for within message.
```

Usage:

```js
const { Message, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const title = "MY NODE TITLE";
  const message = new Message(t, config);
  message.statusMessageContainsText(title + " has been created");
});
```

### errorMessageContainsText

Check if Drupal generated error message contains given text.

```
@param {string} text
  Text to search for within message.
```

Usage:

```js
const { Message, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  const message = new Message(t, config);
  message.errorMessageContainsText("Oops, you can't do that");
});
```

## System

### config

Return an object containing the users' specified Drupal TestCafe configuration
Order of precedence

1. [Environment variables](#environment-variables)
2. tests/config.js
3. package.json
   Note that environment variables will overwrite individual properties, however for
   config files, it's all or none.

Usage:

```js
const { Node, config } = require("testcafe-drupal");
...
test("Example test", async t => {
  // Use config when initializing an instance of the Node class.
  const node = new Node(t, nodeType, config);
});
```

### baseUrl

Return the target test site domain as defined in the configuration (e.g. "http://www.mysite.com").

Usage:

```js
const { baseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  // Use the baseUrl variable in your tests, or pre-test setup.
});
```

### Environment variables

Certain config values can be overridden via the use of environmental variables.

| Variable | Overrides |
|----------|-------------|
| process.env.TESTCAFE_BASEURL | config.baseUrl |
| process.env.TESTCAFE_DRUPAL_USERS_ADMIN_USERNAME | config.users.admin.username |
| process.env.TESTCAFE_DRUPAL_USERS_ADMIN_PASSWORD | config.users.admin.password |
| process.env.TESTCAFE_DRUPAL_USERS_EDITOR_USERNAME | config.users.editor.username |
| process.env.TESTCAFE_DRUPAL_USERS_EDITOR_PASSWORD | config.users.editor.password |
| process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_USERNAME | config.users.authenticated_user.username |
| process.env.TESTCAFE_DRUPAL_USERS_AUTHUSER_PASSWORD | config.users.authenticated_user.password |


## Users

Define your [Testcafe Roles](https://devexpress.github.io/testcafe/documentation/test-api/authentication/user-roles.html).

### administratorUser

Return a user with the administrator role.

Usage:

```js
const { Role } = require("testcafe");
const { administratorUser } = require("testcafe-drupal");
...
test("Example test", async t => {
  await t.useRole(Role(...administratorUser));

  // Expectations based on this role
});
```

### authenticatedUser

Return a regular authenticated user.

Usage:

```js
const { Role } = require("testcafe");
const { authenticatedUser } = require("testcafe-drupal");
...
test("Example test", async t => {
  await t.useRole(Role(...authenticatedUser));

  // Expectations based on this role
});
```

### editorUser

Return an editor user.

Usage:

```js
const { Role } = require("testcafe");
const { editorUser } = require("testcafe-drupal");
...
test("Example test", async t => {
  await t.useRole(Role(...editorUser));

  // Expectations based on this role
});
```

## Setting up local development environment

Provides instructions for developers on how to setup a local environment for development work on Drupal Testcafe package. It is recommended that you use Yarn due to it's support of Workspaces, which makes life easier when developing NPM packages. The following instructions assume you are using Yarn.

1. Create a project directory and add create a `package.json` file with the following content. 
```json
{
  "private": true,
  "name": "my-project-name",
  "version": "1.0.0",
  "workspaces": [
    "workspace",
    "packages/*"
  ]
}
```

2. Create the following directory structure in your project:

```
-- <project root>
  |-- package.json
  |-- packages
  |-- workspace
```

3. Clone the `testcafe-drupal` project in `packages/` directory.
```
cd packages
git clone git@github.com:ironstar-io/testcafe-drupal.git
```

4. Change into `workspace/` directory and then set up new yarn project. Add the `testcafe-drupal` package:

```
cd workspace
yarn init
yarn add testcafe-drupal
yarn install
```

5. Copy the `tests` directory from the `testcafe-drupal/example` directory into the `workspace` directory. If you are intending to work on the example tests, then you may wish to sybolically link the `tests` directory to the `workspace` directory so that any changes will be automatically applied to the tests directory in the cloned `testcafe-drupal` repository.

6. To run tests go to `workspace/tests` directory and run the appropriate command. For example:

```
cd workspace/tests
testcafe -e puppeteer tests/fixtures/pages.js
```

7. Final project structure should be like this:

```
-- <project root>
 |--- package.json
 |--- packages
 |  |-- testcafe-drupal
 |
 |--- workspace
    |--package.json
    |-- tests
```

---

Built by the teams at [Technocrat](https://www.technocrat.com.au/) and [Ironstar](https://ironstar.io)
