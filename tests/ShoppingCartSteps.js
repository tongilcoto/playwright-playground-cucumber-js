const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions, optionStatuses, positions} = require('./src/constants.js');
const {validLogin, selectStepRequiredProducts, getProductsAndRandomIndexesFor, selectMultipleProducts, getProductNameAtPosition, validateActualProductsForStatus} = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Your Cart)" page$/, async function(pageTitle) {
    await expect(this.shoppingCartPage.getTitle(this.page)).toHaveText(pageTitle);
});

Given(/^I proceed to "Your Cart" page with "(\d)" selected random products when logged as "(standard_user)" user$/, async function(quantity, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    this.productsStatus[productStatuses.SELECTED] = await selectStepRequiredProducts(this.page, shoppingCartOptions.ADDTOCART, quantity, productStatuses.UNSELECTED, this.productsPage);
    await this.productsPage.selectPageOption(this.page, this.productsPage.nextPageOption);
});

When(/^I select "(Checkout|Continue Shopping|Menu|Shopping Cart)" option at "Your Cart" page$/, async function(option) {
    await this.shoppingCartPage.selectPageOption(this.page, option);
});

Then(/^I see "(Checkout)" option is "(disabled)" at "Your Cart" page$/, async function(option, status) {
    if (status === optionStatuses.DISABLED) {
        await expect(this.shoppingCartPage.getPageOption(this.page, option)).toBeDisabled();
    }
});

When(/^I select "(Remove)" option for random Cart product$/, async function(option) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(this.page, productStatuses.SELECTED, 1, this.shoppingCartPage);
    this.productsStatus[option === shoppingCartOptions.ADDTOCART ? productStatuses.SELECTED : productStatuses.UNSELECTED] = await selectMultipleProducts(this.page, productsToSelectIndexes, products, option, this.shoppingCartPage);
});

Then(/^I don't see "(any|selected)" product at "Your Cart" page$/, async function(option) {
    const {products} = await getProductsAndRandomIndexesFor(this.page, productStatuses.SELECTED, 1, this.shoppingCartPage);
    if (option === productStatuses.SELECTED) {
        const productsInfo = await products.allTextContents()
        expect(productsInfo.filter(product => product.includes(getProductNameAtPosition(positions.LAST, this.productsStatus[productStatuses.UNSELECTED]))).length).toEqual(0);
    } else {
        expect(await products.count()).toEqual(0)
    }

})

Then(/^I see "(\d)" badge in shopping cart at "Your Cart" page$/, async function(badgeValue) {
    expect(await this.shoppingCartPage.getShoppingCartBadgeValue(this.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "Your Cart" page$/, async function() {
    await expect(this.shoppingCartPage.getShoppingCartBadge(this.page)).toHaveCount(0);
});

Then(/^I see "selected" products at "Your Cart" page$/, async function() {
    const {products} = await getProductsAndRandomIndexesFor(this.page, productStatuses.SELECTED, 1, this.shoppingCartPage);
    await validateActualProductsForStatus(this.page, products, this.productsStatus[productStatuses.SELECTED], this.shoppingCartPage);
});

Then(/^I see "(Menu)" option at "Your Cart" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nKnown Hack: Clicking " + option + " option")
        await this.shoppingCartPage.selectPageOption(this.page, option);
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.detailPage.getPageOption(this.page, option)).toBeVisible();
    }
});