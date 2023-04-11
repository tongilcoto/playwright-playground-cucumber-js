
class yourInformationPage {

    selectors = require('../selectors/yourInformationPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

};

module.exports = yourInformationPage;
