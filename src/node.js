const { Selector } = require("testcafe");
const { Field } = require("./field");

/**
 * Defines Node class.
 *
 * Provides methods for interacting with Drupal node entities.
 */
class Node extends Field {
  /**
   * @var {string} addNodeBasePath
   * Path to the add node form page.
   */
  addNodeBasePath;

  /**
   * @var {string} testDomain
   * Domain of target test site.
   */
  config;

  /**
   * @var {object} t
   * Testcafe test controller.
   */
  t;

  /**
   * @var {string} nodeType
   * Node type.
   */
  nodeType;

  /**
   * @var {string} nodeTitleField
   * Selector for node title field.
   */
  nodeTitleField;

  /**
   * @var {string} nodeSavebutton
   * Selector for node form save button.
   */
  nodeSaveButton;

  /**
   * Constructor.
   *
   * @param {object} t
   *   Testcafe test controller.
   * @param {string} nodeType
   *   Machine name of the node type.
   * @param {string} testDomain
   *   The target domain on which to run tests (e.g. "http://www.example.com").
   */
  constructor(t, nodeType, testDomain) {
    super(t);

    this.t = t;
    this.nodeType = nodeType;
    this.testDomain = testDomain;
    this.addNodeBasePath = "/node/add";
    this.nodeTitleField = Selector("#edit-title-0-value");
    this.nodeSaveButton = Selector("#edit-submit");
  }

  /**
   * Check if currently on view node page.
   */
  async checkOnNodePage() {
    const nodePageExists = Selector(
      "body.page-node-type-" + this.nodeType.replace(/_/g, "-")
    ).exists;

    await this.t.expect(nodePageExists).ok();
  }

  /**
   * Go to node creation page of given node type.
   */
  async goToNodeCreationPage() {
    await this.t.navigateTo(
      this.testDomain + this.addNodeBasePath + "/" + this.nodeType
    );
  }

  /**
   * Save node.
   *
   * Clicks save button on node add/edit form.
   */
  async saveNode() {
    await this.t.click(this.nodeSaveButton);
  }

  /**
   * Set node base path.
   *
   * Overrides the default base path to the add node page.
   *
   * @param {string} path
   *   The base path to add node form. Path should begin with '/' and not
   *   contain trailing forward slash (e.g. "/node/add")
   */
  setNodeBasePath(path) {
    this.addNodeBasePath = path;
  }

  /**
   * Set selector for node title field.
   *
   * @param {string} selectorString
   *   A CSS selector (e.g. ".element-class-name", "#element-id", etc.).
   */
  async setNodeTitleField(selectorString) {
    this.nodeTitleField = Selector(selectorString);
  }

  /**
   * Set selector for node save button.
   *
   * @param {string} selectorString
   *   A CSS selector (e.g. ".element-class-name", "#element-id", etc.).
   */
  async setNodeSaveButton(selectorString) {
    this.nodeSaveButton = Selector(selectorString);
  }

  /**
   * Set node title text.
   *
   * @param {string} text
   *   Node title text.
   */
  async setTitle(text) {
    await this.t.typeText(this.nodeTitleField, text);
  }
}

module.exports = { Node };
