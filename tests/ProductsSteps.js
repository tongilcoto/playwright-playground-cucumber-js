const {Given, When, Then} = require('@cucumber/cucumber');
const {shoppingCartOptions, productStatuses, RANDOM} = require('./src/constants.js');
const {selectMultipleProducts, getProductNameAtPosition, validateProductShoppingCartOption, getProductsAndRandomIndexesFor, validLogin, selectStepRequiredProducts, selectProductByComponentForStatusAndMethod} = require('./src/utils.js');
const {expect} = require('@playwright/test');

Given(/^I select "(Add To Cart)" option for "(\d)" "(unselected)" random products when logged as "(standard_user)" user$/, async function(option, quantity, status, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    this.productsStatus[option === shoppingCartOptions.ADDTOCART ? productStatuses.SELECTED : productStatuses.UNSELECTED] = await selectStepRequiredProducts(this.page, option, quantity, status, this.productsPage);
});

Given(/^I select "(unselected)" random product "(name)" when logged as "(standard_user)" user$/, async function(status, option, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    [this.detailProduct.name, this.detailProduct.description, this.detailProduct.price] = await selectProductByComponentForStatusAndMethod(this.page, option, productStatuses[status], RANDOM, this.productsPage);
});

Then(/^I see "(Products)" page$/, {timeout: 10000}, async function(pageTitle) {
    await expect(this.productsPage.getTitleElement(this.page)).toHaveText(pageTitle);
});

When(/^I select "(Add To Cart|Remove)" option for "(\d)" "(selected|unselected)" random products at "Products" page$/, async function(option, quantity, status) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(this.page, status, quantity, this.productsPage);
    this.productsStatus[option === shoppingCartOptions.ADDTOCART ? productStatuses.SELECTED : productStatuses.UNSELECTED] = await selectMultipleProducts(this.page, productsToSelectIndexes, products, option, this.productsPage);
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(selected|unselected|all)" products at "Products" page$/, async function(option, status) {
    const stepProducts = status === productStatuses.ALL? await this.productsPage.getAllProductNames(this.page) : this.productsStatus[status];
    for (const productName of stepProducts) {
        await validateProductShoppingCartOption(this.page, this.productsPage, productName, option);
    }
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(last)" "(selected|unselected)" product at "Products" page$/, async function(option, position, status) {
    await validateProductShoppingCartOption(this.page, this.productsPage, getProductNameAtPosition(position, this.productsStatus[status]), option);
});

Then(/^I see "(\d)" badge in shopping cart at "Products" page$/, async function(badgeValue) {
    expect(await this.productsPage.getShoppingCartBadgeValue(this.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "Products" page$/, async function() {
    await expect(this.productsPage.getShoppingCartBadge(this.page)).toHaveCount(0);
});

When(/^I select "(selected|unselected)" "(random)" product "(image|name)"$/, async function(status, option, component) {
    [this.detailProduct.name, this.detailProduct.description, this.detailProduct.price] = await selectProductByComponentForStatusAndMethod(this.page, component, status, option, this.productsPage);
});

When(/^I select "(Shopping Cart|Menu)" option at "Products" page$/, async function(option) {
    await this.productsPage.selectPageOption(this.page, option);
});

Then(/^I see "(Menu)" option at "Products" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nKnown Hack: Clicking " + option + " option")
        await this.productsPage.selectPageOption(this.page, option);
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.productsPage.getPageOption(this.page, option)).toBeVisible();
    }
});

Then(/^I see the "(products grid)" at "Products" page$/, async function(option) {
    if (option === "products grid") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nKnown Hack: Clicking " + option + " option")
        await this.productsPage.selectPageOption(this.page, "Menu");
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.productsPage.getProductsGrid(this.page)).toBeVisible();
    }
});
