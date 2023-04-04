
class detailPage {

    selectors = require('../selectors/detailPage.js');

    getProductName(page) {
        return page.locator(this.selectors.productName);
    }

};

module.exports = detailPage;
