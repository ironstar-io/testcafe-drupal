import { Selector, ClientFunction } from "testcafe";
import { administratorUser } from "./drupal/users.js";
import { Node } from "./drupal/node.js";

const system = require("./drupal/system.js");

fixture("Content (node) tests").page(system.getTestDomain);

test("Create article content", async t => {
  const nodeType = "article";
  const node = new Node(t, nodeType, system.getTestDomain);
  const nodeFormExists = Selector("#node-" + nodeType.replace(/_/g, "-") + "-form").exists;

  await t.useRole(administratorUser);
  await node.goToNodeCreationPage();
  await t.expect(nodeFormExists).ok();
  await node.setTitle("TESTCAFE");
  await node.addTextToField(
    "edit-body-0-value",
    "Here is my test text. What do you think? Something else here as well."
  );
  await node.chooseSelectFieldOption('edit-body-0-format--2', "Full HTML");
  await node.checkSelectFieldHasOption('edit-body-0-format--2', "Basic HTML");
  await node.saveNode();
  // await node.checkOnNodePage();
});
