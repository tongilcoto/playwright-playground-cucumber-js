
class completePage {

    selectors = require('../selectors/completePage.js');

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

};

module.exports = completePage;
