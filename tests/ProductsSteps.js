const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, RANDOM} = require('./src/constants.js');
const {selectMultipleProducts, getProductAtPosition, validateProductShoppingCartOption, getProductsAndRandomIndexesFor, validLogin, selectStepRequiredProducts, selectProductByComponentForStatusAndMethod} = require('./src/utils.js');
const {expect} = require('@playwright/test');

Given(/^I select "(Add To Cart)" option for "(\d)" "(unselected)" random products when logged as "(standard_user)" user$/, async function(option, quantity, status, user) {
    await validLogin(user);
    await selectStepRequiredProducts(option, quantity, status);
});

Given(/^I select "(unselected)" random product "(name)" when logged as "(standard_user)" user$/, async function(status, option, user) {
    await validLogin(user);
    await selectProductByComponentForStatusAndMethod(option, productStatuses[status], RANDOM);
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

When(/^I select "(selected|unselected)" "(random)" product "(image|name)"$/, async function(status, option, component) {
    await selectProductByComponentForStatusAndMethod(component, status, option);
});

When(/^I select "(Shopping Cart|Menu)" option at "Products" page$/, async function(option) {
    await global.productsPage.selectPageOption(global.page, option);
});

Then(/^I see "(Menu)" option at "Products" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nClicking " + option + " option")
        await global.productsPage.selectPageOption(global.page, option);
        await global.leftMenu.selectOption(global.page, "Close");
    } else {
        await expect(global.productsPage.getPageOption(global.page, option)).toBeVisible();
    }
});

Then(/^I see the "(products grid)" at "Products" page$/, async function(option) {
    if (option === "products grid") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        await global.productsPage.selectPageOption(global.page, "Menu");
        await global.leftMenu.selectOption(global.page, "Close");
    } else {
        await expect(global.productsPage.getProductsGrid(global.page)).toBeVisible();
    }
});
