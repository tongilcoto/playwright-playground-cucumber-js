const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');


Then(/^I see Detail page for "(selected)" product$/, async function(status) {
    await expect(this.detailPage.getProductName(this.page)).toHaveText(this.detailProduct.name);
});

When(/^I select "(Add To Cart|Remove)" option at "Detail" page$/, async function(option) {
    await this.detailPage.selectProductOption(this.page, option);
});

Then(/^I see product option is "(Add To Cart|Remove)" for the Detail's product$/, async function(expectedOption) {
    await expect(this.detailPage.getProductOption(this.page, expectedOption)).toBeVisible();
});

Then(/^I see "(\d)" badge in shopping cart at "Detail" page$/, async function(badgeValue) {
    expect(await this.detailPage.getShoppingCartBadgeValue(this.page)).toBe(badgeValue);
});

Then(/^I don't see any badge in shopping cart at "Detail" page$/, async function() {
    await expect(this.detailPage.getShoppingCartBadge(this.page)).toHaveCount(0);
});

When(/^I select "(Back To Products|Menu|Shopping Cart)" option at "Detail" page$/, async function(option) {
    await this.detailPage.selectPageOption(this.page, option);
});

Then(/^I see "(Menu)" option at "Detail" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nKnown Hack: Clicking " + option + " option")
        await this.detailPage.selectPageOption(this.page, option);
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.detailPage.getPageOption(this.page, option)).toBeVisible();
    }
});

Then(/^I see correct name and price for the Detail's product$/, async function() {
    await expect(this.detailPage.getProductName(this.page)).toHaveText(this.detailProduct.name);
    await expect(this.detailPage.getProductPrice(this.page)).toHaveText(this.detailProduct.price);
});
