const {expect} = require('@playwright/test');
const {shoppingCartOptions, shoppingCartElementsRegexp, productStatuses, PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, position} = require('./constants.js');

function getNotRepeatedRandomList(numberOfItemsToSelect, totalNumberOfItems) {
    const set = new Set()
    while(set.size < numberOfItemsToSelect) {
      set.add(Math.floor(Math.random() * totalNumberOfItems));
    }
    return set;
}

async function selectMultipleProducts(indexesSet, products, option) {
    for (const index of indexesSet) {
        const productText = await products.nth(index).innerText(); 
        const product = await global.productsPage.getProductByName(global.page, productText.split('\n')[0]);
        await global.productsPage.selectOption(product, option);
        global.productsStatus[option === shoppingCartOptions.ADDTOCART ? productStatuses.SELECTED : productStatuses.UNSELECTED].push(productText.split('\n')[0]);
    }
}

function getProductAtPosition(productPosition, status) {
    if (productPosition === position.LAST) {
        return global.productsStatus[status].slice(-1)[0]
    }
    return null
}

async function validateProductShoppingCartOption(name, expectedOption) {
    const webProduct = await global.productsPage.getProductByName(global.page, name);
    const optionRegexp = expectedOption === shoppingCartOptions.ADDTOCART ? shoppingCartElementsRegexp.ADDTOCART : shoppingCartElementsRegexp.REMOVE;
    await expect(global.productsPage.getProductCartOption(webProduct, expectedOption)).toHaveAttribute(PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, optionRegexp);
}

module.exports = {
    getNotRepeatedRandomList,
    selectMultipleProducts,
    getProductAtPosition,
    validateProductShoppingCartOption
};