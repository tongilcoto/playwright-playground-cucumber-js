
const {informationFields} = require('../constants.js');

class yourInformationPage {

    selectors = require('../selectors/yourInformationPage.js');

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

    async fillFirstName(page) {
        const fn = await this.getField(page, informationFields.FIRST_NAME, false).fill('Ton');
    }

    async fillLastName(page) {
        await this.getField(page, informationFields.LAST_NAME, false).fill('Gil');
    }

    async fillPostalCode(page) {
        await this.getField(page, informationFields.POSTAL_CODE, false).fill('28039');
    }

    async fillField(page, field) {
        await this.getField(page, field, false).fill('random');
    }


    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

    getError(page) {
        return page.locator(this.selectors.error);
    }

    getField(page, field, withError) {
        const option = withError ? 'error_' + field : field;
        return page.locator(this.selectors.fields[option])
    }

    getErrorIconAtFieldWithError(page, field) {
        return page.locator(this.selectors.errorIconForField[field])
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }
        

};

module.exports = yourInformationPage;
