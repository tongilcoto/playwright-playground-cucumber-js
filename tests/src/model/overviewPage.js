
class overviewPage {

    selectors = require('../selectors/overviewPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }

    getListOfProducts(page) {
        return page.locator(this.selectors.productCell);
    }


};

module.exports = overviewPage;
