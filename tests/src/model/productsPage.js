
class productsPage {

    selectors = require('../selectors/productsPage.js');

    getTitleElement(page) {
        return page.locator(this.selectors.title);
    }

    getProductCartOption(webElement, option) {
        return webElement.locator(this.selectors.options[option]);
    }

    async selectOption(webElement, rawOption) {
        await this.getProductCartOption(webElement, rawOption).click();
    }

    getListOfProductsFor(page, option) {
        return page.locator(this.selectors.productCell, {has: page.locator(this.selectors.options[option])});
    }

    getProductByName(page, text) {
        return page.locator(this.selectors.productCell, {hasText: text});
    }

    async getAllProductNames(page) {
        return await page.locator(this.selectors.productName).allTextContents();
    }

    async getShoppingCartBadgeValue(page) {
        return await page.locator(this.selectors.shoppingCartBadgeValue).textContent();
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }

};

module.exports = productsPage;
