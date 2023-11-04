const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions, TAX_PERCENTAGE} = require('./src/constants.js');
const {fillAndProceedYourInformationPage, getDataForIndexFromArrayOfTextArrays, selectStepRequiredProducts, validLogin } = require('./src/utils.js');
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
        await this.overviewPage.selectPageOption(this.page, option);
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.overviewPage.getPageOption(this.page, option)).toBeVisible();
    }
});

Then(/^I don't see any badge in shopping cart at "Overview" page$/, async function() {
    await expect(this.overviewPage.getShoppingCartBadge(this.page)).toHaveCount(0);
});

Then(/^I don't see "any" product at "Overview" page$/, async function() {
    await expect(this.overviewPage.getListOfProducts(this.page)).toHaveCount(0);
});

Then(/^I see correct name and price for "selected" products at "Overview" page$/, async function() {
    const webNames = await this.overviewPage.getProductNames(this.page);
    expect(webNames).toHaveLength(this.productsStatus.selected.length)
    expect(webNames).toEqual(this.productsStatus.selected.map(item => item.name))
    const webPrices = await this.overviewPage.getProductPrices(this.page);
    expect(webPrices).toHaveLength(this.productsStatus.selected.length)
    expect(webPrices).toEqual(this.productsStatus.selected.map(item => item.price))
});

Then(/^I see correct quantity for selected products at "Overview" page$/, async function() {
    const webQuantities = await this.overviewPage.getProductQuantities(this.page);
    expect(webQuantities).toHaveLength(this.productsStatus.selected.length)
    const expectedQuantities = []
    this.productsStatus.selected.forEach(product => expectedQuantities.push("1"))
    expect(webQuantities).toEqual(expectedQuantities)
});

Then(/^I see correct total price for selected products$/, async function() {
    const webItemsTotalPrice = await this.overviewPage.getItemsTotalPrice(this.page);
    const expectedItemsPrices = this.productsStatus.selected.map(item => item.price)
    let expectedItemsTotal = 0
    expectedItemsPrices.forEach(price => expectedItemsTotal += parseFloat(price.slice(1)))
    expect(parseFloat(webItemsTotalPrice.slice(1))).toEqual(expectedItemsTotal)
    const webTotalPrice = parseFloat((await this.overviewPage.getTotalPrice(this.page)).slice(1))
    expect(webTotalPrice.toFixed(2)).toEqual((expectedItemsTotal * (1 + TAX_PERCENTAGE/100)).toFixed(2))
});
