
class productsPage {

    selectors = require('../selectors/productsPage.js');

    getTitleElement(page) {
        return page.locator(this.selectors.title);
    }

};

module.exports = productsPage;