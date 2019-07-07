# Drupal Testcafe

## Introduction

- Provides Drupal baseline tests.
- Tests built on Testcafe framework.
- Includes test helpers which provide Drupal integration.
- Tests run on Chrome headless. No browser setup required as Chrome headless browser included as NPM package.

## Prerequisites

- A Drupal project. **Note:** only Drupal 8 projects are supported.
- Local development environment capable of running Drupal (e.g. Tokaido).
- Access to Drush command line tool.
- Node.js and NPM package manager.

## Setup

- Install the Drupal site: `drush si`. Assumes we are using standard install profile.
- Import site specific configuration: `drush cim`
- Create an authenticated user: `drush user-create testcafe_user --password="testcafe_user" --mail="testcade_user@localhost"`
- Create an admin user: `drush user-create testcafe_admin --password="testcafe_admin" --mail="testcade_admin@localhost" && drush user-add-role "administrator" testcafe_admin`
- Create an editor user: `drush user-create testcafe_editor --password="testcafe_editor" --mail="testcafe_editor@localhost" && drush user-add-role "editor" testcafe_editor`
- Install Testcafe dependencies: `npm install`
- Edit `config/default.json` file to include the site domain to test.

## Usage

Drupal Testcafe supports a number of general tests which should be applicable to the majority of Drupal 8 sites. One can also create custom, project specific tests. 

To run all tests on Chrome Headless run the following command from the Drupal Testcafe project directory:

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
```
