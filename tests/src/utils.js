const {expect} = require('@playwright/test');

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
        global.productsStatus[option === 'Add To Cart' ? 'selected' : 'unselected'].push(productText.split('\n')[0]);
    }
}

function getProductAtPosition(position, status) {
    if (position === 'last') {
        return global.productsStatus[status].slice(-1)[0]
    }
    return null
}

async function validateProductShoppingCartOption(name, expectedOption) {
    const webProduct = await global.productsPage.getProductByName(global.page, name);
    const optionRegexp = expectedOption === 'Add To Cart'? /^add-to-cart-/ : /^remove/;
    await expect(global.productsPage.getProductCartOption(webProduct, expectedOption)).toHaveAttribute('data-test', optionRegexp);
}

module.exports = {
    getNotRepeatedRandomList,
    selectMultipleProducts,
    getProductAtPosition,
    validateProductShoppingCartOption
};