const { Selector } = require("testcafe");

/**
 * Defines Field class.
 *
 * Provides methods for interacting with Drupal fields created using the Field
 * API. Should not be used with Webforms as they use a different API.
 */
class Field {
  /**
   * Constructor.
   *
   * @param object t
   *   Testcafe test controller.
   */
  constructor(t) {
    this.t = t;
  }

  /**
   * Add text for a text based field.
   *
   * Works with <input[type='text']>, <textarea> and CKEditor based text
   * fields.
   *
   * @param {string} id
   *   Id property of the form field.
   * @param {string} text
   *   Text to be added to field.
   */
  async addTextToField(id, text) {
    const field = Selector("#" + id, { visibilityCheck: false });
    if ((await field.exists) && (await field.visible) === false) {
      // Check if uses WYSIWYG.
      const parent = await field.sibling("#cke_" + id);
      if (parent.exists) {
        await this.t
          .switchToIframe("#cke_" + id + " .cke_wysiwyg_frame")
          .typeText("body", text)
          .switchToMainWindow();
      }
    } else {
      await this.t.typeText(field, text);
    }
  }

  /**
   * Check <select> contains a given option.
   *
   * @param {string} id
   *   Id property of the <select> element.
   * @param {string} text
   *   Select element option text to find. This value should be the text that
   *   is visible to the site visitor and is case sensitive.
   */
  async checkSelectFieldHasOption(id, text) {
    const select = Selector("#" + id, { visibilityCheck: false });
    const optionsCount = select.find("option").withExactText(text).count;
    await this.t
      .expect(optionsCount)
      .eql(1, "The option was not found in the select element.");
  }

  /**
   * Choose <select> element option
   *
   * @param {string} id
   *   Id property of the <select> element.
   * @param {string} text
   *   Select element option text. This value is case sensitve.
   */
  async chooseSelectFieldOption(id, text) {
    const select = Selector("#" + id, { visibilityCheck: false });
    const option = select.find("option");

    await this.t.click(select).click(option.withText(text));
  }
}

module.exports = { Field };
