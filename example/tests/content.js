const { Selector, Role } = require("testcafe");
const { Node, administratorUser, baseUrl, config } = require("testcafe-drupal");

fixture("Content (node) tests").page(baseUrl);

test("Create article content", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, config);
  const nodeFormExists = Selector(
    "#node-" + nodeType.replace(/_/g, "-") + "-form"
  ).exists;

  await t.useRole(Role(...administratorUser));
  await node.goToNodeCreationPage();
  await t.expect(nodeFormExists).ok();
  await node.setTitle("TESTCAFE");
  await node.checkSelectFieldHasOption(
    "edit-body-0-format--2",
    ["Basic HTML", "Restricted HTML", "Full HTML"]
  );
  await node.chooseSelectFieldOption(
    "edit-body-0-format--2",
    "Full HTML"
  );
  await node.addTextToField(
    "edit-body-0-value",
    "Here is my test text. What do you think? Something else here as well."
  );
  // Upload an image to Drupal image field.
  await node.addImageToField(
    "edit-field-image-0-upload",
    { alt: "my alt text", title: "my title text" }
  );
  // Remove image from Drupal image field.
  await node.removeImageFromField(
    "edit-field-image-0-upload"
  );
  // Upload an image to Drupal image field.
  await node.addImageToField(
    "edit-field-image-0-upload",
    { alt: "my alt text", title: "my title text" }
  );
  // Upload a PDF to Drupal file field.
  // await node.addFileToField(
  //   "edit-field-file-0-upload"
  // );
  await node.saveNode();
});
