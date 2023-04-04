const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses} = require('./src/constants.js');
const {selectMultipleProducts, getProductAtPosition, validateProductShoppingCartOption, getProductsAndRandomIndexesFor, getProductForIndex} = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see Detail page for "(selected)" product$/, async function(status) {
    await expect(global.detailPage.getProductName(global.page)).toHaveText(global.detailProduct.name);
});