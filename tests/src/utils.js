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
        const product = await global.productsPage.getProductByTitle(productText.split('\n')[0]);
        await global.productsPage.selectOption(product, option);
        global.productsStatus[option === 'Add To Cart' ? 'selected' : 'unselected'].push(productText.split('\n')[0]);
    }
}

module.exports = {
    getNotRepeatedRandomList,
    selectMultipleProducts
};