
class overviewPage {

    selectors = require('../selectors/overviewPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }


};

module.exports = overviewPage;
