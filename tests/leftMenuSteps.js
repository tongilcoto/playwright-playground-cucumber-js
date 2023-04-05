const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');


When(/^I see the left menu$/, async function() {
    // HEADS UP. While not "active", the left menu starts as visible BUT then changes to not visible 
    // So, isVisible returns true and then expect toBeVisible also true
    // and expect.not.toBeVisible detects a false but keeps polling until true, so finally is correct too
    // Then the only way to go is to wait for be HIDDEN
    // Snippet when the Left Menu IS NOT ACTIVE
    // console.log('Visible -> Not Visible')
    // const isVisible = await global.leftMenu.getLeftMenu(global.page).isVisible();
    // await expect(global.leftMenu.getLeftMenu(global.page)).toBeVisible();
    // console.log('started visible is ' + isVisible)
    // await expect(global.leftMenu.getLeftMenu(global.page)).not.toBeVisible();
    // const isVisible2 = await global.leftMenu.getLeftMenu(global.page).isVisible();
    // console.log('finished visible is ' + isVisible2)

    await global.leftMenu.getLeftMenu(global.page).waitFor('hidden');

});

When(/^I select "(Close|Reset App State)" option at the left menu$/, async function(option) {
    await global.leftMenu.selectOption(global.page, option);
});
