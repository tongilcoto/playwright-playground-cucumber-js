const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions} = require('./src/constants.js');
const {validLogin, selectStepRequiredProducts, fillAndProceedYourInformationPage } = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Overview)" page$/, async function(pageTitle) {
    await expect(this.overviewPage.getTitle(this.page)).toContainText(pageTitle);
});

Given(/^I checkout the purchase with "(\d)" selected random products when logged as "(standard_user)" user$/, async function(quantity, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    this.productsStatus[productStatuses.SELECTED] = await selectStepRequiredProducts(this.page, shoppingCartOptions.ADDTOCART, quantity, productStatuses.UNSELECTED, this.productsPage);
    await this.productsPage.selectPageOption(this.page, this.productsPage.nextPageOption);
    await this.shoppingCartPage.selectPageOption(this.page, this.shoppingCartPage.nextPageOption);
    this.filledFields = await fillAndProceedYourInformationPage(this.page, this.yourInformationPage);
});

When(/^I select "(Cancel|Finish|Menu|ShoppingCart)" option at "Overview" page$/, async function(option) {
    await this.overviewPage.selectPageOption(this.page, option); 
});

Then(/^I see "(Menu)" option at "Overview" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nKnown Hack: Clicking " + option + " option")
        await this.yourInformationPage.selectPageOption(this.page, option);
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.yourInformationPage.getPageOption(this.page, option)).toBeVisible();
    }
});