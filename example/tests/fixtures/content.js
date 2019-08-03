const { Selector, Role } = require("testcafe");
const { Node, administratorUser, baseUrl, config } = require("testcafe-drupal");

fixture("Content (node) tests").page(baseUrl);

test("Create article content", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);
  const nodeFormExists = Selector(
    "#node-" + nodeType.replace(/_/g, "-") + "-form"
  ).exists;

  // Log into site as administrator user.
  await t.useRole(Role(...administratorUser));
  // Go to create article content/node page.
  await node.goToNodeCreationPage();
  // Check that article node form is present.
  await t.expect(nodeFormExists).ok();
  // Add text to the title field.
  await node.setTitle("TESTCAFE");
  // Check that the body format selection field has "Basic HTML",
  // "Restricted HTML", and "Full HTML" options.
  await node.checkSelectFieldHasOption("edit-body-0-format--2", [
    "Basic HTML",
    "Restricted HTML",
    "Full HTML"
  ]);
  // Select Full HTML option in body format field.
  await node.chooseSelectFieldOption("edit-body-0-format--2", "Full HTML");
  // Add text to body field.
  await node.addTextToField(
    "edit-body-0-value",
    "Here is my test text. What do you think? Something else here as well."
  );
  // Upload an image to Drupal image field.
  await node.addImageToField("edit-field-image-0-upload", {
    alt: "my alt text",
    title: "my title text"
  });
  // Remove image from Drupal image field.
  await node.removeImageFromField("edit-field-image-0-upload");
  // Upload a PDF to Drupal file field.
  await node.addFileToField("edit-field-file-0-upload");
  // Upload images to multivalue Drupal image field.
  await node.addImageToField("edit-field-multi-images-0-upload", {
    alt: "My alt text",
    title: "My title text"
  });
  await node.addImageToField("edit-field-multi-images-1-upload", {
    alt: "My alt text",
    title: "My title text"
  });
  // Save node.
  await node.saveNode();
});
