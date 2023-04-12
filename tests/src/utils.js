const {expect} = require('@playwright/test');
const {pageUrls, passwords, shoppingCartOptions, shoppingCartElementsRegexp, productStatuses, PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, positions, RANDOM} = require('./constants.js');



async function validLogin(user) {
    global.user = user;
    await global.page.goto(pageUrls['login']);
    await global.loginPage.loginWithCredentials(global.page, global.user, passwords["valid"]);
} 

async function selectStepRequiredProducts(option, quantity, status, currentPage) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(status, quantity, currentPage);
    await selectMultipleProducts(productsToSelectIndexes, products, option, currentPage);
}

function getNotRepeatedRandomList(numberOfItemsToSelect, totalNumberOfItems) {
    const set = new Set()
    while(set.size < numberOfItemsToSelect) {
      set.add(Math.floor(Math.random() * totalNumberOfItems));
    }
    return set;
}

async function getProductsAndRandomIndexesFor(status, quantity, currentPage) {
    const products = await currentPage.getListOfProductsFor(global.page, status === productStatuses.SELECTED ? shoppingCartOptions.REMOVE : shoppingCartOptions.ADDTOCART);
    const numberOfProducts = await products.count();
    const productsToSelectIndexes = getNotRepeatedRandomList(quantity, numberOfProducts);
    return {products, productsToSelectIndexes}
}

async function getProductForIndex(products, index, currentPage) {
    const productText = await products.nth(index).innerText();
    const product = currentPage.getProductByName(global.page, productText.split('\n')[currentPage.productNameIndex]);
    return {product, productText};
}

async function selectMultipleProducts(indexesSet, products, option, currentPage) {
    for (const index of indexesSet) {
        const {product, productText} = await getProductForIndex(products, index, currentPage);
        await currentPage.selectProductOption(product, option);
        global.productsStatus[option === shoppingCartOptions.ADDTOCART ? productStatuses.SELECTED : productStatuses.UNSELECTED].push(productText.split('\n')[currentPage.productNameIndex]);
    }
}

function getProductNameAtPosition(productPosition, status) {
    if (productPosition === positions.LAST) {
        return global.productsStatus[status].slice(-1)[0]
    }
    return null
}

async function validateProductShoppingCartOption(name, expectedOption) {
    const webProduct = await global.productsPage.getProductByName(global.page, name);
    const optionRegexp = expectedOption === shoppingCartOptions.ADDTOCART ? shoppingCartElementsRegexp.ADDTOCART : shoppingCartElementsRegexp.REMOVE;
    await expect(global.productsPage.getProductOption(webProduct, expectedOption)).toHaveAttribute(PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE, optionRegexp);
}

async function selectProductByComponentForStatusAndMethod(component, status, method, currentPage) {
    var products = [];
    var productsToSelectIndexes = new Set();
    var product = '';
    var productText = '';
    if (method === RANDOM) {
        ({products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(status, 1, currentPage));
        ({product, productText} = await getProductForIndex(products, Array.from(productsToSelectIndexes)[0], currentPage));
    }
    await global.productsPage.selectProductOption(product, component);
    [global.detailProduct.name, global.detailProduct.description, global.detailProduct.price] = productText.split('\n');
}

module.exports = {
    getNotRepeatedRandomList,
    selectMultipleProducts,
    getProductNameAtPosition,
    validateProductShoppingCartOption,
    getProductsAndRandomIndexesFor,
    getProductForIndex,
    validLogin,
    selectStepRequiredProducts,
    selectProductByComponentForStatusAndMethod
};