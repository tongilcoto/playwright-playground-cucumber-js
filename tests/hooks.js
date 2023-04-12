const {Before, After} = require('@cucumber/cucumber');
const {chromium} = require('@playwright/test');


Before(async function() {

    global.browser = await chromium.launch({headless: false});
    global.testContext = await global.browser.newContext();
    global.page = await global.testContext.newPage();

});

After(async function(scenario) {

    if (scenario.result.status === 'FAILED') {
        console.log('\n --- Error: \n\n' + scenario.result.message)
    }
    await global.testContext.close();
    await global.browser.close();
    
});