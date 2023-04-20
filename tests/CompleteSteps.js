const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions} = require('./src/constants.js');
const {validLogin, selectStepRequiredProducts, fillAndProceedYourInformationPage } = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Complete)" page$/, async function(pageTitle) {
    await expect(this.completePage.getTitle(this.page)).toContainText(pageTitle);
});

Given(/^I finish the purchase with "(\d)" selected random products when logged as "(standard_user)" user$/, async function(quantity, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    this.productsStatus[productStatuses.SELECTED] = await selectStepRequiredProducts(this.page, shoppingCartOptions.ADDTOCART, quantity, productStatuses.UNSELECTED, this.productsPage);
    await this.productsPage.selectPageOption(this.page, this.productsPage.nextPageOption);
    await this.shoppingCartPage.selectPageOption(this.page, this.shoppingCartPage.nextPageOption);
    this.filledFields = await fillAndProceedYourInformationPage(this.page, this.yourInformationPage);
    await this.overviewPage.selectPageOption(this.page, this.overviewPage.nextPageOption);
});

When(/^I select "(Back Home|Menu|Shopping Cart)" option at "Complete" page$/, async function(option) {
    await this.completePage.selectPageOption(this.page, option); 
});