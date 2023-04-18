
class completePage {

    selectors = require('../selectors/overviewPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

};

module.exports = completePage;
