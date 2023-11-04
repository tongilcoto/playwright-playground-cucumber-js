const {expect} = require('@playwright/test');
const {pageUrls, passwords, shoppingCartOptions, productStatuses, positions, RANDOM, informationFields} = require('./constants.js');


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
        const productInfo = Object.fromEntries(
            currentPage.productInfoFieldList.map((key, index) => [key, productText.split('\n')[index]]),
        );
        requiredProducts.push(productInfo);
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
    const expectedProductNames = expectedProducts.map(product => product[0]); // expected products are always selected in Products page.
    const existingExpectedProductsNames = expectedProductNames.filter(productName => actualProductNames.includes(productName))
    expect(existingExpectedProductsNames.length).toEqual(expectedProducts.length)
}

async function fillYourInformationPage(page, infoPage) {
    const filledFields = []
    await infoPage.fillFirstName(page);
    filledFields.push(informationFields.FIRST_NAME);
    await infoPage.fillLastName(page);
    filledFields.push(informationFields.LAST_NAME);
    await infoPage.fillPostalCode(page);
    filledFields.push(informationFields.POSTAL_CODE);
    return filledFields
}

async function fillAndProceedYourInformationPage(page, infoPage) {
    const filledFields = await fillYourInformationPage(page, infoPage)
    await infoPage.selectPageOption(page, infoPage.nextPageOption);
    return filledFields
}

function getDataForIndexFromArrayOfTextArrays(array, index) {
    const output = []
    for (const texts of array) {
        output.push(texts[index])
    }
    return output
}

function getExpectedProductList(desiredStatus, productsStatus, index) {
    const contraryStatus =  desiredStatus === productStatuses.SELECTED ? productStatuses.UNSELECTED : productStatuses.SELECTED
    const originalList = productsStatus[desiredStatus].map(item => item[index]);
    const toSubstractList = productsStatus[contraryStatus].map(item => item[index]);
    return originalList.filter(item => !toSubstractList.includes(item))
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
    validateActualProductsForStatus,
    fillYourInformationPage,
    fillAndProceedYourInformationPage,
    getDataForIndexFromArrayOfTextArrays,
    getExpectedProductList
};