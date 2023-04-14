const {expect} = require('@playwright/test');
const {pageUrls, passwords, shoppingCartOptions, productStatuses, positions, RANDOM} = require('./constants.js');



async function validLogin(user, page, loginPage) {
    await page.goto(pageUrls['login']);
    await loginPage.loginWithCredentials(page, user, passwords["valid"]);
    return user;
} 

async function selectStepRequiredProducts(page, option, quantity, status, currentPage) {
    const {products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(page, status, quantity, currentPage);
    return await selectMultipleProducts(page, productsToSelectIndexes, products, option, currentPage);
}

function getNotRepeatedRandomList(numberOfItemsToSelect, totalNumberOfItems) {
    const set = new Set()
    while(set.size < numberOfItemsToSelect) {
      set.add(Math.floor(Math.random() * totalNumberOfItems));
    }
    return set;
}

async function getProductsAndRandomIndexesFor(page, status, quantity, currentPage) {
    const products = await currentPage.getListOfProductsFor(page, status === productStatuses.SELECTED ? shoppingCartOptions.REMOVE : shoppingCartOptions.ADDTOCART);
    const numberOfProducts = await products.count();
    const productsToSelectIndexes = getNotRepeatedRandomList(quantity, numberOfProducts);
    return {products, productsToSelectIndexes}
}

async function getProductForIndex(page, products, index, currentPage) {
    const productText = await products.nth(index).innerText();
    const product = currentPage.getProductByName(page, productText.split('\n')[currentPage.productNameIndex]);
    return {product, productText};
}

async function selectMultipleProducts(page, indexesSet, products, option, currentPage) {
    const requiredProducts = []
    for (const index of indexesSet) {
        const {product, productText} = await getProductForIndex(page, products, index, currentPage);
        await currentPage.selectProductOption(product, option);
        requiredProducts.push(productText.split('\n')[currentPage.productNameIndex]);
    }
    return requiredProducts;
}

function getProductNameAtPosition(productPosition, products) {
    if (productPosition === positions.LAST) {
        return products.slice(-1)[0];
    }
    return null
}

async function validateProductShoppingCartOption(page, productsPage, name, expectedOption) {
    const webProduct = await productsPage.getProductByName(page, name);
    await expect(productsPage.getProductOption(webProduct, expectedOption)).toBeVisible();
}

async function selectProductByComponentForStatusAndMethod(page, component, status, method, currentPage) {
    var products = [];
    var productsToSelectIndexes = new Set();
    var product = '';
    var productText = '';
    if (method === RANDOM) {
        ({products, productsToSelectIndexes} = await getProductsAndRandomIndexesFor(page, status, 1, currentPage));
        ({product, productText} = await getProductForIndex(page, products, Array.from(productsToSelectIndexes)[0], currentPage));
    }
    await currentPage.selectProductOption(product, component);
    return productText.split('\n');
}

async function validateActualProductsForStatus(page, actualProducts, expectedProducts, currentPage) {
    const actualProductNames = []
    for (let index = 0; index < await actualProducts.count(); index++) {
        const {productText} = await getProductForIndex(page, actualProducts, index, currentPage);
        actualProductNames.push(productText.split('\n')[currentPage.productNameIndex]);
    };
    const existingExpectedProducts = expectedProducts.filter(productName => actualProductNames.includes(productName))
    expect(existingExpectedProducts.length).toEqual(expectedProducts.length)
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
    selectProductByComponentForStatusAndMethod,
    validateActualProductsForStatus
};