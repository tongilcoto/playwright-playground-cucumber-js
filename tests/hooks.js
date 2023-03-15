const {Before, After} = require('@cucumber/cucumber');
const {chromium} = require('@playwright/test');


Before(async function() {

    global.browser = await chromium.launch({headless: false});
    global.page = await global.browser.newPage();

});

After(async function() {

    await global.browser.close();
    
});