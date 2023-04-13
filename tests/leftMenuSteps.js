const {Given, When, Then} = require('@cucumber/cucumber');
const {SAUCELABS_TITLE} = require('./src/constants.js');
const {expect} = require('@playwright/test');


When(/^I see the left menu$/, async function() {
    // HEADS UP. While not "active", the left menu starts as visible BUT then changes to not visible 
    // So, isVisible returns true and then expect toBeVisible also true
    // and expect.not.toBeVisible detects a false but keeps polling until true, so finally is correct too
    // Then the only way to go is to wait for be HIDDEN
    // Snippet when the Left Menu IS NOT ACTIVE
    // console.log('Visible -> Not Visible')
    // const isVisible = await this.leftMenu.getLeftMenu(this.page).isVisible();
    // await expect(this.leftMenu.getLeftMenu(this.page)).toBeVisible();
    // console.log('started visible is ' + isVisible)
    // await expect(this.leftMenu.getLeftMenu(this.page)).not.toBeVisible();
    // const isVisible2 = await this.leftMenu.getLeftMenu(this.page).isVisible();
    // console.log('finished visible is ' + isVisible2)

    await this.leftMenu.getLeftMenu(this.page).waitFor('hidden');

});

When(/^I select "(About|All Items|Close|Logout|Reset App State)" option at the left menu$/, async function(option) {
    await this.leftMenu.selectOption(this.page, option);
});

Then(/^I see "Saucelabs" page$/, async function() {
    expect(await this.page.title()).toEqual(SAUCELABS_TITLE)
});
