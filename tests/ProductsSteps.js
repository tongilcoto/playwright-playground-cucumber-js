const {Given, When, Then} = require('@cucumber/cucumber');
const {shoppingCartOptions, productStatuses} = require('./src/constants.js');
const {getNotRepeatedRandomList, selectMultipleProducts, getProductAtPosition, validateProductShoppingCartOption} = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Products)" page$/, {timeout: 10000}, async function(pageTitle) {
    await expect(global.productsPage.getTitleElement(global.page)).toHaveText(pageTitle);
});

When(/^I select "(Add To Cart|Remove)" option for "(\d)" "(selected|unselected)" random products at "(Products)" page$/, async function(option, quantity, status, page) {
    const products = await global.productsPage.getListOfProductsFor(global.page, status === productStatuses.SELECTED ? shoppingCartOptions.REMOVE : shoppingCartOptions.ADDTOCART);
    const numberOfProducts = await products.count();
    const productsToSelectIndexes = getNotRepeatedRandomList(quantity, numberOfProducts);
    await selectMultipleProducts(productsToSelectIndexes, products, option);
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(selected|unselected|all)" products at "(Products)" page$/, async function(option, status, page) {
    const stepProducts = status === productStatuses.ALL? await global.productsPage.getAllProductNames(global.page) : global.productsStatus[status];
    for (const productName of stepProducts) {
        await validateProductShoppingCartOption(productName, option);
    }
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(last)" "(selected|unselected)" product at "(Products)" page$/, async function(option, position, status, page) {
    await validateProductShoppingCartOption(getProductAtPosition(position, status), option);
});

Then(/^I see "(\d)" badge in shopping cart at "(Products)" page$/, async function(badgeValue, page) {
    expect(await global.productsPage.getShoppingCartBadgeValue(global.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "(Products)" page$/, async function(page) {
    await expect(global.productsPage.getShoppingCartBadge(global.page)).toHaveCount(0);
});