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
   * Add file to Drupal file upload field.
   *
   * @param {string} fileFieldId
   *   ID property of the file field.
   * @param {string} file
   *   Path to the image file to upload. Will use a default JPG image if this
   *   argument is not provided.
   */
  async addFileToField(fileFieldId, { file = "" } = {}) {
    const filePath =
      file === "" ? __dirname + "/assets/drupal_testcafe_file.pdf" : file;

    await this.t.setFilesToUpload("[id^=\"" + fileFieldId + "\"]", [filePath]);
  }

  /**
   * Add image to Drupal image upload field.
   *
   * @param {string} fileFieldId
   *   ID property of the file field.
   * @param {object} options
   *   An optional argument which can contain following key-value pairs:
   *   - "alt": image alt text. Note that if alt text is provided but the image
   *     alt text has not been enabled in Drupal, then this function will throw
   *     an error.
   *   - "title": image title text. Note that if title text is provided but the
   *     image title has not been enabled in Drupal, then this funciton will
   *     throw an error.
   * @param {string} image
   *   Path to the image file to upload. Will use a default JPG image if this
   *   argument is not provided.
   */
  async addImageToField(fileFieldId, { image = "", alt, title } = {}) {
    const filePath =
      image === "" ? __dirname + "/assets/drupal_testcafe_image.jpg" : image;

    this.addFileToField(fileFieldId, { file: filePath });

    // Add image alt text.
    if (alt !== undefined) {
      const imageAltTextFieldId = fileFieldId.replace("-upload", "-alt");
      const imageAltTextField = Selector(
        '[id^="' + imageAltTextFieldId + '"]'
      ).with({
        boundTestRun: this.t
      });

      this.t.typeText(imageAltTextField, alt);
    }

    // Add image title text.
    if (title !== undefined) {
      const imageTitleTextFieldId = fileFieldId.replace("-upload", "-title");
      const imageTitleTextField = Selector(
        '[id^="' + imageTitleTextFieldId + '"]'
      ).with({
        boundTestRun: this.t
      });

      this.t.typeText(imageTitleTextField, title);
    }
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
    const field = Selector("#" + id, { visibilityCheck: false }).with({
      boundTestRun: this.t
    });
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
   * @param {array} optionText
   *   Select element option text to find. This value should be the text that
   *   is visible to the site visitor and is case sensitive.
   */
  async checkSelectFieldHasOption(id, optionText) {
    const select = Selector("#" + id, { visibilityCheck: false }).with({
      boundTestRun: this.t
    });

    for (let text of optionText) {
      let optionCount = select.find("option").withExactText(text).count;
      await this.t
        .expect(optionCount)
        .eql(
          1,
          'The option "' + text + '" was not found in the select element.'
        );
    }
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
    const select = Selector("#" + id, { visibilityCheck: false }).with({
      boundTestRun: this.t
    });
    const option = select.find("option");

    await this.t.click(select).click(option.withText(text));
  }

  /**
   * Remove file from Drupal file field.
   * 
   * @param {string} id
   *   Id property of the file field.
   */
  async removeFileFromField(id) {
    const removeFileButton = Selector("[id^=\"" + id.replace("-upload", "-remove-button") + "\"]").with({
      boundTestRun: this.t
    });

    await this.t.click(removeFileButton);
  }

  /**
   * Remove an image from Drupal image field.
   * 
   * @param {string} id
   *   Id property of the file field.
   */
  async removeImageFromField(id) {
    this.removeFileFromField(id);
  }
}

module.exports = { Field };
