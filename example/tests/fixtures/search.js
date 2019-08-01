const { Selector } = require("testcafe");
const { baseUrl } = require("testcafe-drupal");

fixture("Search Tests")
  .page(baseUrl)
  .beforeEach(async t => {
    await t.maximizeWindow();
  });

const searchTextField = Selector("#edit-query");
const searchSubmitBtn = Selector("#edit-submit-search");
const searchText = "about";

test("Search results page contains results", async t => {
  await t
    .typeText(searchTextField, searchText, { speed: 0.5 })
    .click(searchSubmitBtn);

  const resultsCount = Selector(".list--results .list__item").count;

  await t.expect(resultsCount).gt(0);
});

test("Search autocomplete displays results", async t => {
  await t.typeText(searchTextField, searchText, { speed: 0.5 });

  const resultsCount = Selector("#ui-id-1 .ui-menu-item").count;

  await t.expect(resultsCount).gt(0);
});
