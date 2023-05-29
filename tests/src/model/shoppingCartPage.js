
class shoppingCartPage {

    selectors = require('../selectors/shoppingCartPage.js');

    productQuantityIndex = 0;

    productNameIndex = 1;

    productPriceIndex = 3;

    nextPageOption = 'Checkout';

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

    getProductOption(webElement, option) {
        return webElement.locator(this.selectors.productOptions[option]);
    }

    async selectProductOption(webElement, option) {
        await this.getProductOption(webElement, option).click();
    }

    getListOfProductsFor(page, option) {
        return page.locator(this.selectors.productCell, {has: page.locator(this.selectors.productOptions[option])});
    }

    getListOfProducts(page) {
        return page.locator(this.selectors.productCell);
    }

    getProductByName(page, text) {
        return page.locator(this.selectors.productCell, {hasText: text});
    }

    async getShoppingCartBadgeValue(page) {
        return await page.locator(this.selectors.shoppingCartBadgeValue).textContent();
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }

};

module.exports = shoppingCartPage;
