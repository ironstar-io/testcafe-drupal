const { Selector } = require("testcafe");
const { Field } = require("./field");
const { getSafe } = require("./helpers");

/**
 * Defines Node class.
 *
 * Provides methods for interacting with Drupal node entities.
 */
class Node extends Field {
  /**
   * Constructor.
   *
   * @param {object} t
   * Testcafe test controller.
   * @param {string} nodeType
   * Machine name of the node type.
   * @param {string} testDomain
   * The target domain on which to run tests (e.g. "http://www.example.com").
   *
   * @var {string} addNodeBasePath
   * Path to the add node form page.
   * @var {string} testDomain
   * Domain of target test site.
   * @var {object} t
   * Testcafe test controller.
   * @var {string} nodeType
   * Node type.
   * @var {string} nodeTitleField
   * Selector for node title field.
   * @var {string} nodeSavebutton
   * Selector for node form save button.
   */
  constructor(t, nodeType, config) {
    const nodeTitleFieldId = getSafe(() => config.node.create.selectors.title);
    const nodeSaveButtonId = getSafe(
      () => config.node.create.selectors.save_button
    );

    super(t);

    this.t = t;
    this.nodeType = nodeType;
    this.testDomain = getSafe(() => config.baseUrl);
    this.addNodeBasePath = getSafe(() => config.node.create.path);
    this.nodeTitleField = Selector(nodeTitleFieldId).with({
      boundTestRun: this.t
    });
    this.nodeSaveButton = Selector(nodeSaveButtonId).with({
      boundTestRun: this.t
    });
  }

  /**
   * Check if currently on view node page.
   */
  async checkOnNodePage() {
    const nodePageExists = Selector(
      "body.page-node-type-" + this.nodeType.replace(/_/g, "-")
    ).with({
      boundTestRun: this.t
    }).exists;

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
