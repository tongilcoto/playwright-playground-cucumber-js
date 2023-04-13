const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions, SHOPPINGCART_OPTION, optionStatuses, positions} = require('./src/constants.js');
const {validLogin, selectStepRequiredProducts, getProductsAndRandomIndexesFor, selectMultipleProducts, getProductNameAtPosition} = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Your Cart)" page$/, async function(pageTitle) {
    await expect(global.shoppingCartPage.getTitle(global.page)).toHaveText(pageTitle);
});

Given(/^I proceed to "Your Cart" page with "(\d)" selected random products when logged as "(standard_user)" user$/, async function(quantity, user) {
    await validLogin(user);
    await selectStepRequiredProducts(shoppingCartOptions.ADDTOCART, quantity, productStatuses.UNSELECTED, global.productsPage);
    await global.productsPage.selectPageOption(global.page, SHOPPINGCART_OPTION);
});

When(/^I select "(Checkout|Continue Shopping)" option at "Your Cart" page$/, async function(option) {
    await global.shoppingCartPage.selectPageOption(global.page, option);
});

Then(/^I see "(Checkout)" option is "(disabled)" at "Your Cart" page$/, async function(option, status) {
    if (status === optionStatuses.DISABLED) {
        await expect(global.shoppingCartPage.getPageOption(global.page, option)).toBeDisabled();
    }
});

When(/^I select "(Remove)" option for random Cart product$/, async function(option) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(productStatuses.SELECTED, 1, global.shoppingCartPage);
    await selectMultipleProducts(productsToSelectIndexes, products, option, global.shoppingCartPage);
});

Then(/^I don't see "(any|selected)" product at "Your Cart" page$/, async function(option) {
    const {products} = await getProductsAndRandomIndexesFor(productStatuses.SELECTED, 1, global.shoppingCartPage);
    if (option === productStatuses.SELECTED) {
        const productsInfo = await products.allTextContents()
        expect(productsInfo.filter(product => product.includes(getProductNameAtPosition(positions.LAST, productStatuses.UNSELECTED))).length).toEqual(0);
    } else {
        expect(await products.count()).toEqual(0)
    }

})

Then(/^I see "(\d)" badge in shopping cart at "Your Cart" page$/, async function(badgeValue) {
    expect(await global.shoppingCartPage.getShoppingCartBadgeValue(global.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "Your Cart" page$/, async function() {
    await expect(global.shoppingCartPage.getShoppingCartBadge(global.page)).toHaveCount(0);
});