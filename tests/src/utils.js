const {expect} = require('@playwright/test');
const {pageUrls, passwords, shoppingCartOptions, shoppingCartElementsRegexp, productStatuses, PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, position} = require('./constants.js');

async function validLogin(user) {
    global.user = user;
    await global.page.goto(pageUrls['login']);
    await global.loginPage.loginWithCredentials(global.page, global.user, passwords["valid"]);
} 

async function selectStepRequiredProducts(option, quantity, status) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(status, quantity);
    await selectMultipleProducts(productsToSelectIndexes, products, option);
}

function getNotRepeatedRandomList(numberOfItemsToSelect, totalNumberOfItems) {
    const set = new Set()
    while(set.size < numberOfItemsToSelect) {
      set.add(Math.floor(Math.random() * totalNumberOfItems));
    }
    return set;
}

async function getProductsAndRandomIndexesFor(status, quantity) {
    const products = await global.productsPage.getListOfProductsFor(global.page, status === productStatuses.SELECTED ? shoppingCartOptions.REMOVE : shoppingCartOptions.ADDTOCART);
    const numberOfProducts = await products.count();
    const productsToSelectIndexes = getNotRepeatedRandomList(quantity, numberOfProducts);
    return {products, productsToSelectIndexes}
}

async function getProductForIndex(products, index) {
    const productText = await products.nth(index).innerText(); 
    const product = global.productsPage.getProductByName(global.page, productText.split('\n')[0]);
    return {product, productText};
}

async function selectMultipleProducts(indexesSet, products, option) {
    for (const index of indexesSet) {
        const {product, productText} = await getProductForIndex(products, index);
        await global.productsPage.selectProductOption(product, option);
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
    await expect(global.productsPage.getProductOption(webProduct, expectedOption)).toHaveAttribute(PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, optionRegexp);
}

module.exports = {
    getNotRepeatedRandomList,
    selectMultipleProducts,
    getProductAtPosition,
    validateProductShoppingCartOption,
    getProductsAndRandomIndexesFor,
    getProductForIndex,
    validLogin,
    selectStepRequiredProducts
};