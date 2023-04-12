
class productsPage {

    selectors = require('../selectors/productsPage.js');

    productNameIndex = 0;

    getTitleElement(page) {
        return page.locator(this.selectors.title);
    }

    getProductOption(webElement, option) {
        return webElement.locator(this.selectors.productOptions[option]);
    }

    async selectProductOption(webElement, option) {
        await this.getProductOption(webElement, option).click();
    }

    getProductsGrid(page) {
        return page.locator(this.selectors.productsGrid);
    }

    getListOfProductsFor(page, option) {
        return page.locator(this.selectors.productCell, {has: page.locator(this.selectors.productOptions[option])});
    }

    getProductByName(page, text) {
        return page.locator(this.selectors.productCell, {hasText: text});
    }

    async getAllProductNames(page) {
        return await page.locator(this.selectors.productOptions.name).allTextContents();
    }

    async getShoppingCartBadgeValue(page) {
        return await page.locator(this.selectors.shoppingCartBadgeValue).textContent();
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

};

module.exports = productsPage;
