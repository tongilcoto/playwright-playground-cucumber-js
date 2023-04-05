
class leftMenu {

    selectors = require('../selectors/leftMenu.js');

    getLeftMenu(page) {
        return page.locator(this.selectors.leftMenu);
    }

};

module.exports = leftMenu;
