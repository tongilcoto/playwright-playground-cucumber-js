
class yourInformationPage {

    selectors = require('../selectors/yourInformationPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

    async fillFirstName(page) {
        await page.locator(this.selectors.firstName).fill('Ton');
    }

    async fillLastName(page) {
        await page.locator(this.selectors.lastName).fill('Gil');
    }

    async fillZipCode(page) {
        await page.locator(this.selectors.zipCode).fill('28039');
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

};

module.exports = yourInformationPage;
