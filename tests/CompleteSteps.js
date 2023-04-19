const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');


Then(/^I see "(Complete)" page$/, async function(pageTitle) {
    await expect(this.completePage.getTitle(this.page)).toContainText(pageTitle);
});
