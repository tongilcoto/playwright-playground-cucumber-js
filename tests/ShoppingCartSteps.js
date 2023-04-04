const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses} = require('./src/constants.js');
const {selectMultipleProducts, getProductAtPosition, validateProductShoppingCartOption, getProductsAndRandomIndexesFor, getProductForIndex} = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Your Cart)" page$/, async function(pageTitle) {
    await expect(global.shoppingCartPage.getTitle(global.page)).toHaveText(pageTitle);
});