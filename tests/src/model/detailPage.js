
class detailPage {

    selectors = require('../selectors/detailPage.js');

    getProductName(page) {
        return page.locator(this.selectors.productName);
    }

    getProductOption(webElement, option) {
        return webElement.locator(this.selectors.productOptions[option]);
    }

    async selectProductOption(webElement, option) {
        await this.getProductOption(webElement, option).click();
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }

    async getShoppingCartBadgeValue(page) {
        return await page.locator(this.selectors.shoppingCartBadgeValue).textContent();
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }


};

module.exports = detailPage;
