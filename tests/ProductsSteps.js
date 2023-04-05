const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, RANDOM} = require('./src/constants.js');
const {selectMultipleProducts, getProductAtPosition, validateProductShoppingCartOption, getProductsAndRandomIndexesFor, getProductForIndex, validLogin, selectStepRequiredProducts} = require('./src/utils.js');
const {expect} = require('@playwright/test');

Given(/^I select "(Add To Cart)" option for "(\d)" "(unselected)" random products when logged as "(standard_user)" user$/, async function(option, quantity, status, user) {
    await validLogin(user);
    await selectStepRequiredProducts(option, quantity, status);
});

Then(/^I see "(Products)" page$/, {timeout: 10000}, async function(pageTitle) {
    await expect(global.productsPage.getTitleElement(global.page)).toHaveText(pageTitle);
});

When(/^I select "(Add To Cart|Remove)" option for "(\d)" "(selected|unselected)" random products at "Products" page$/, async function(option, quantity, status) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(status, quantity);
    await selectMultipleProducts(productsToSelectIndexes, products, option);
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(selected|unselected|all)" products at "Products" page$/, async function(option, status) {
    const stepProducts = status === productStatuses.ALL? await global.productsPage.getAllProductNames(global.page) : global.productsStatus[status];
    for (const productName of stepProducts) {
        await validateProductShoppingCartOption(productName, option);
    }
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(last)" "(selected|unselected)" product at "Products" page$/, async function(option, position, status) {
    await validateProductShoppingCartOption(getProductAtPosition(position, status), option);
});

Then(/^I see "(\d)" badge in shopping cart at "Products" page$/, async function(badgeValue) {
    expect(await global.productsPage.getShoppingCartBadgeValue(global.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "Products" page$/, async function() {
    await expect(global.productsPage.getShoppingCartBadge(global.page)).toHaveCount(0);
});

When(/^I select "(unselected)" "(random)" product "(image|name)"$/, async function(status, option, component) {
    var products = [];
    var productsToSelectIndexes = new Set();
    var product = '';
    var productText = '';
    if (option === RANDOM) {
        ({products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(status, 1));
        ({product, productText} = await getProductForIndex(products, Array.from(productsToSelectIndexes)[0]));
    }
    await global.productsPage.selectProductOption(product, component);
    [global.detailProduct.name, global.detailProduct.description, global.detailProduct.price] = productText.split('\n');
});

When(/^I select "(Shopping Cart|Menu)" option at "Products" page$/, async function(option) {
    await global.productsPage.selectPageOption(global.page, option);
});

Then(/^I see "(Menu)" option at "Products" page$/, async function(option) {
    //await expect(global.productsPage.getPageOption(global.page, option)).toBeVisible();
    expect(await global.productsPage.getPageOption(global.page, option).isVisible()).toEqual('"Menu" option is hidden but Playwright does not detect it ... grrrr');
});

Then(/^I see the "products grid" at "Products" page$/, async function() {
    //await expect(global.productsPage.getProductsGrid(global.page)).toBeVisible();
    expect(await global.productsPage.getProductsGrid(global.page).isVisible()).toEqual('"Products Grid" is partialy hidden but Playwright does not detect it ... grrrr');
});
