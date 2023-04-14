const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions} = require('./src/constants.js');
const {validLogin, selectStepRequiredProducts } = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Your Information)" page$/, async function(pageTitle) {
    await expect(this.yourInformationPage.getTitle(this.page)).toContainText(pageTitle);
});

Given(/^I proceed to "Your Information" page with "(\d)" selected random products when logged as "(standard_user)" user$/, async function(quantity, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    this.productsStatus[productStatuses.SELECTED] = await selectStepRequiredProducts(this.page, shoppingCartOptions.ADDTOCART, quantity, productStatuses.UNSELECTED, this.productsPage);
    await this.productsPage.selectPageOption(this.page, this.productsPage.nextPageOption);
    await this.shoppingCartPage.selectPageOption(this.page, this.shoppingCartPage.nextPageOption);
});

When(/^I fill all fields at "Your Information" page$/, async function() {
    await this.yourInformationPage.fillFirstName(this.page);
    await this.yourInformationPage.fillLastName(this.page);
    await this.yourInformationPage.fillZipCode(this.page);
});

When(/^I select "(Continue)" option at "Your Information" page$/, async function(option) {
    await this.yourInformationPage.selectPageOption(this.page, option); 
});

