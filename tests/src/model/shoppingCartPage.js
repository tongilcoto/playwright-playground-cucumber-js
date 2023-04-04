
class shoppingCartPage {

    selectors = require('../selectors/shoppingCartPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

};

module.exports = shoppingCartPage;
