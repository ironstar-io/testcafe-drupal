const { Selector } = require("testcafe");

/**
 * Defines Message class.
 *
 * Provides methods for interacting with Drupal messages.
 */
class Message {

  /**
   * Constructor
   * 
   * @param {object} t
   *   Testcafe test controller.
   * @param {object} config
   *   Drupal Testcafe configuration.
   * 
   * @var {object} t
   *   Testcafe test controller.
   * @var {object} config
   *   Drupal Testcafe configuration.
   * @var {object} errorMessage
   *   Instance of Testcafe Selector class for Drupal error messages. 
   * @var {object} statusMessage
   *   Instance of Testcafe Selector class for Drupal status messages. 
   */
  constructor(t, config) {
    this.t = t;
    this.config = config;
    this.statusMessage = Selector(config.message.selectors.status);
    this.errorMessage = Selector(config.message.selectors.error);
  }

  /**
   * Check if Drupal generated status message contains given text.
   * 
   * @param {string} text
   *   Text to search for within message.
   */
  async statusMessageContainsText(text) {
    await this.t
      .expect(this.statusMessage.withText(text).exists).ok();
  }

  /**
   * Check if Drupal generated error message contains given text.
   * 
   * @param {string} text 
   *   Text to search for within message.
   */
  async errorMessageContainsText(text) {
    await this.t
      .expect(this.errorMessage.withText(text).exists).ok();
  }
}

module.exports = { Message };
