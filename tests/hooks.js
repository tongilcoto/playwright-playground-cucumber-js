const {Before, After} = require('@cucumber/cucumber');
const {chromium} = require('@playwright/test');


Before(async function() {

    global.browser = await chromium.launch({headless: false});
    global.testContext = await global.browser.newContext();
    global.page = await global.testContext.newPage();

});

After(async function() {

    await global.testContext.close();
    await global.browser.close();
    
});