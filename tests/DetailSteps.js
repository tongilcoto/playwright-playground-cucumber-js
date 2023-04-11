const {Given, When, Then} = require('@cucumber/cucumber');
const {PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, shoppingCartOptions, shoppingCartElementsRegexp} = require('./src/constants.js');
const {expect} = require('@playwright/test');


Then(/^I see Detail page for "(selected)" product$/, async function(status) {
    await expect(global.detailPage.getProductName(global.page)).toHaveText(global.detailProduct.name);
});

When(/^I select "(Add To Cart|Remove)" option at "Detail" page$/, async function(option) {
    await global.detailPage.selectProductOption(global.page, option);
});

Then(/^I see product option is "(Add To Cart|Remove)" for the Detail's product$/, async function(expectedOption) {
    const optionRegexp = expectedOption === shoppingCartOptions.ADDTOCART ? shoppingCartElementsRegexp.ADDTOCART : shoppingCartElementsRegexp.REMOVE;
    await expect(global.detailPage.getProductOption(global.page, expectedOption)).toHaveAttribute(PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, optionRegexp);
});

Then(/^I see "(\d)" badge in shopping cart at "Detail" page$/, async function(badgeValue) {
    expect(await global.detailPage.getShoppingCartBadgeValue(global.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "Detail" page$/, async function() {
    await expect(global.detailPage.getShoppingCartBadge(global.page)).toHaveCount(0);
});

When(/^I select "(Back To Products|Menu|Shopping Cart)" option at "Detail" page$/, async function(option) {
    await global.detailPage.selectPageOption(global.page, option);
});

Then(/^I see "(Menu)" option at "Detail" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nClicking " + option + " option")
        await global.detailPage.selectPageOption(global.page, option);
        await global.leftMenu.selectOption(global.page, "Close");
    } else {
        await expect(global.detailPage.getPageOption(global.page, option)).toBeVisible();
    }
});