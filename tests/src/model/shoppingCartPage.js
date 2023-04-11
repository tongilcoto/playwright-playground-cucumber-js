
class shoppingCartPage {

    selectors = require('../selectors/shoppingCartPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

};

module.exports = shoppingCartPage;
