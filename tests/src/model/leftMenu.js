
class leftMenu {

    selectors = require('../selectors/leftMenu.js');

    getLeftMenu(page) {
        return page.locator(this.selectors.leftMenu);
    }

    async selectOption(page, option) {
        await page.locator(this.selectors.options[option]).click();
    }

};

module.exports = leftMenu;
