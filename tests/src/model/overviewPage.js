const { getDataForIndexFromArrayOfTextArrays } = require('../utils.js');


class overviewPage {

    selectors = require('../selectors/overviewPage.js');

    nextPageOption = 'Finish';

    productNameIndex = 1;

    productPriceIndex = 3;

    productQuantityIndex = 0;

    getTitle(page) {
        return page.locator(this.selectors.title);
    }

    getPageOption(page, option) {
        return page.locator(this.selectors.pageOptions[option]);
    }

    async selectPageOption(page, option) {
        await this.getPageOption(page, option).click();
    }

    getShoppingCartBadge(page) {
        return page.locator(this.selectors.shoppingCartBadgeValue);
    }

    getListOfProducts(page) {
        return page.locator(this.selectors.productCell);
    }

    async getListOfProductsInfo(page) {
        return await page.locator(this.selectors.productCell).allInnerTexts()
    }

    async getProductNames(page) {
        const productsInfo = await this.getListOfProductsInfo(page)
        return getDataForIndexFromArrayOfTextArrays(productsInfo.map(product => product.split('\n')), this.productNameIndex)
    }

    async getProductPrices(page) {
        const productsInfo = await this.getListOfProductsInfo(page)
        return getDataForIndexFromArrayOfTextArrays(productsInfo.map(product => product.split('\n')), this.productPriceIndex)
    }

    async getProductQuantities(page) {
        const productsInfo = await this.getListOfProductsInfo(page)
        return getDataForIndexFromArrayOfTextArrays(productsInfo.map(product => product.split('\n')), this.productQuantityIndex)
    }

    async getTotalPrice(page) {
        return (await page.locator(this.selectors.totalPrice).textContent()).split(': ')[1]
    }

    async getItemsTotalPrice(page) {
        return (await page.locator(this.selectors.itemsTotalPrice).textContent()).split(': ')[1]
    }
};

module.exports = overviewPage;
