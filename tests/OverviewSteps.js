const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');


Then(/^I see "(Overview)" page$/, async function(pageTitle) {
    await expect(this.overviewPage.getTitle(this.page)).toContainText(pageTitle);
});
