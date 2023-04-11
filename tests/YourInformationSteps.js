const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');


Then(/^I see "(Your Information)" page$/, async function(pageTitle) {
    await expect(global.yourInformationPage.getTitle(global.page)).toContainText(pageTitle);
});

