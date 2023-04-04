
class productsPage {

    selectors = require('../selectors/productsPage.js');

    getTitleElement(page) {
        return page.locator(this.selectors.title);
    }

    getProductCartOption(webElement, rawOption) {
        const option = rawOption.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        return webElement.locator(this.selectors.options[option]);
    }

    async selectOption(webElement, rawOption) {
        await this.getProductCartOption(webElement, rawOption).click();
    }

    getListOfProductsFor(page, option) {
        return page.locator(this.selectors.productCell, {has: page.locator(this.selectors.options[option])});
    }

    getProductByTitle(text) {
        return page.locator(this.selectors.productCell, {hasText: text});
    }

    async getShoppingCartBadgeValue(page) {
        return await page.locator(this.selectors.shoppingCartBadgeValue).textContent();
    }

};

module.exports = productsPage;
