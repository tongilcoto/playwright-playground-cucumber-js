const {Given, When, Then} = require('@cucumber/cucumber');
const {language, pageUrls, passwords} = require('./src/constants.js');
const {getNotRepeatedRandomList, selectMultipleProducts} = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Products)" page$/, {timeout: 10000}, async function(pageTitle) {
    await expect(global.productsPage.getTitleElement(global.page)).toHaveText(pageTitle);
});

When(/^I select "(Add To Cart|Remove)" option for "(\d)" "(selected|unselected)" random products at "(Products)" page$/, async function(option, quantity, status, page) {
    const products = await global.productsPage.getListOfProductsFor(global.page, status === 'selected' ? "remove" :"addToCart");
    const numberOfProducts = await products.count();
    const productsToSelectIndexes = getNotRepeatedRandomList(quantity, numberOfProducts);
    await selectMultipleProducts(productsToSelectIndexes, products, option);
});

Then(/^I see product option is "(Add To Cart|Remove)" for "(selected|unselected)" products at "(Products)" page$/, async function(option, status, page) {
    for (const productName of global.productsStatus[status]) {
        const webProduct = await global.productsPage.getProductByTitle(productName);
        const optionRegexp = option === 'Add To Cart'? /^add-to-cart-/ : /^remove/;
        await expect(global.productsPage.getProductCartOption(webProduct, option)).toHaveAttribute('data-test', optionRegexp);
    }
});

Then(/^I see "(\d)" badge in shopping cart at "(Products)" page$/, async function(badgeValue, page) {
    expect(await global.productsPage.getShoppingCartBadgeValue(global.page)).toBe(badgeValue);
});