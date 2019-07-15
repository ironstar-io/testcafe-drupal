# TestCafe Drupal

## Introduction

This library provides a set of handy helper functions for running TestCafe tests on your Drupal application

There is also a set of baseline tests for your project provided in the `example` directory. You can also find an example repo [here](https://github.com/ironstar-io/testcafe-drupal-example).

## Prerequisites

- A Drupal project. **Note:** only Drupal 8 projects are supported.
- Access to the Drush command line tool.
- Node.js 8.6+

## Setup

### Preparing Your Tests

- Install this library and dependencies: `npm install --save-dev testcafe-drupal testcafe testcafe-browser-provider-puppeteer` or `yarn add -D ...`
- Create a directory `tests` in the root of your project
- Create a file called `config.js` in the `tests` directory (See [Config](##Config) for more information)
- Set your configuration including base URL and other parameters (Again see [Config](##Config))
- Optionally copy in the tests from this repository's `example` folder, or write and add your own

### Preparing Drupal

- Install the Drupal site: `drush si`. Assumes we are using standard install profile.
- Import site specific configuration: `drush cim`
- Create an authenticated user: `drush user-create testcafe_user --password="testcafe_user" --mail="testcade_user@localhost"`
- Create an admin user: `drush user-create testcafe_admin --password="testcafe_admin" --mail="testcade_admin@localhost" && drush user-add-role "administrator" testcafe_admin`
- Create an editor user: `drush user-create testcafe_editor --password="testcafe_editor" --mail="testcafe_editor@localhost" && drush user-add-role "editor" testcafe_editor`

## Config

Some configuration is required to be set in order for your tests to work.

Configuration is set in the following order of precedence, and can be composed with a combination:

1. Environment variables
2. `{PROJECT_ROOT}/tests/config.js`
3. A set of fallback defaults

Here is a full list of available configuration and their default values

```js
{
  baseUrl: "http://localhost:8080",
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
```

## Usage

Drupal TestCafe supports a number of general tests which should be applicable to the majority of Drupal 8 sites. One can also create custom, project specific tests.

To run all tests on Chrome Headless run the following command from the Drupal TestCafe project directory:

```
// Run all tests using Chrome Headless.
npm run tests:headless:all

// Run all tests using locally install Chrome browser.
npm run tests:chrome:all
```

Individual tests, such as checking whether the home page is accessible, can be run using one of the follow commands:

```
// Run pages tests on Chrome headless.
testcafe puppeteer tests/pages.js

// To see the pages tests run in your locally installed chrome browser.
testcafe chrome tests/pages.js

// To prevent tests from failing due to client side javascript use the `--skip-js-errors` 
// argument. By default tests will fail if there are client side errors in the javascript.
testcafe puppeteer tests/pages.js --skip-js-errors
testcafe chrome tests/pages.js --skip-js-errors
```

## API Reference

### Field

_{class}_

```
 @param object t
   TestCafe test controller.
```

Provides methods for interacting with Drupal fields created using the Field API. Should not be used with Webforms as they use a different API.

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
  Path to the image file to upload. Will use a default JPG image if this
  argument is not provided.
```

Add file to a Drupal file upload field.

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

Add Image to a Drupal file upload field. 

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
@param {string} text
  Select element option text to find. This value should be the text that
  is visible to the site visitor and is case sensitive.
```

Check `<select>` contains a given option.

Usage:

```js
const { Field } = require("testcafe-drupal");
...
test("Example test", async t => {
  const field = new Field(t);

  await field.checkSelectFieldHasOption("edit-field-options", "Australia")
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

## Node

Provides methods for interacting with Drupal node entities.

_{class}_

```
@param {object} t
  TestCafe test controller.
@param {string} nodeType
  Machine name of the node type.
@param {string} testDomain
  The target domain on which to run tests (e.g. "http://www.example.com").
```

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  // Use node methods
});
```

### checkOnNodePage

Check if currently on view node page.

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  await node.checkOnNodePage()
});
```

### goToNodeCreationPage

Go to node creation page of given node type.

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  await node.goToNodeCreationPage()
});
```

### saveNode

Save node. Clicks save button on node add/edit form.

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  await node.saveNode()
});
```

### setNodeBasePath

Set node base path. Overrides the default base path to the add node pages

```
@param {string} path
  The base path to add node form. Path should begin with '/' and not
  contain trailing forward slash (e.g. "/node/add")
```

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  node.setNodeBasePath("/node/add")
});
```

### setNodeTitleField

Set selector for node title field.

```
@param {string} selectorString
  A CSS selector (e.g. ".element-class-name", "#element-id", etc.).
```

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  await node.setNodeTitleField(".some-element")
});
```

### setNodeSaveButton

Set selector for node save button.

```
@param {string} selectorString
  A CSS selector (e.g. ".element-class-name", "#element-id", etc.).
```

Usage:

```js
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  await node.setNodeSaveButton(".some-element")
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
const { Node, getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, getBaseUrl());

  node.setTitle("This is the title")
});
```

## System

### getConfig

Return an object containing the users' specified Drupal TestCafe configuration
Order of precedence

1. Environment variables
2. tests/config.js
3. package.json
   Note that environment variables will overwrite individual properties, however for
   config files, it's all or none.

Usage:

```js
const { getConfig } = require("testcafe-drupal");
...
test("Example test", async t => {
  const config = getConfig();

  // Use the config in your tests, or pre-test setup
});
```

### getBaseUrl

Return the target test site domain as defined in the configuration (e.g. "http://www.mysite.com").

Usage:

```js
const { getBaseUrl } = require("testcafe-drupal");
...
test("Example test", async t => {
  const baseUrl = getBaseUrl();

  // Use the base URL in your tests, or pre-test setup
});
```

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

---

Built by the teams at [Technocrat](https://www.technocrat.com.au/) and [Ironstar](https://ironstar.io)
