const {Before, After} = require('@cucumber/cucumber');
const {chromium} = require('@playwright/test');


Before(async function() {

    this.productsStatus = {
        selected: [],
        unselected: []
    };
    this.detailProduct = {};

    this.filledFields = [];

    this.language = 'en_US'
    
    this.loginPage = new global.loginPage();
    
    this.productsPage = new global.productsPage();
    
    this.detailPage = new global.detailPage();
    
    this.shoppingCartPage = new global.shoppingCartPage();
    
    this.leftMenu = new global.leftMenu();
    
    this.yourInformationPage = new global.yourInformationPage();

    this.overviewPage = new global.overviewPage();

    this.completePage = new global.completePage();

    this.browser = await chromium.launch({headless: false});
    this.testContext = await this.browser.newContext({
        viewport: { width: 1280, height: 1024 } // products grid needs this height to be completely visible
      });
    this.page = await this.testContext.newPage();

});

After(async function(scenario) {

    if (scenario.result.status === 'FAILED') {
        console.log('\n --- Error: \n\n' + scenario.result.message)
    }
    await this.testContext.close();
    await this.browser.close();
    
});