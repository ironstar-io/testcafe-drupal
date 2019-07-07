import { ClientFunction } from "testcafe";

const config = require("config");

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
 *   The target test site domain as defined in the app's configuration (e.g. "http://www.mysite.com").
 */
const getTestDomain = config.get("system.domain");

exports.getPath = getPath;
exports.getTestDomain = getTestDomain;
