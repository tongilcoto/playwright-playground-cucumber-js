const {Given, When, Then} = require('@cucumber/cucumber');
const {language, pageUrls, passwords, errorTexts} = require('./src/constants.js');
const {validLogin} = require('./src/utils.js');
const {expect} = require('@playwright/test');

Given(/^I am "(standard_user|locked_out_user)" user$/, function(user) {
    global.user = user;
});

When(/^I login with user "(valid|invalid)" password$/, async function(password) {
    await global.page.goto(pageUrls['login']);
    await global.loginPage.loginWithCredentials(global.page, global.user, passwords[password]);
});

Then(/^I see "(Login|Locked_Out)" error at Login page$/, {timeout: 10000}, async function(error) {
    const errorText = errorTexts[error][language];
    await expect(global.loginPage.getLoginErrorElement(global.page, error)).toHaveText(errorText);
});

Given(/^I am logged into Products page with "(standard_user|problem_user|performance_glitch_user)" user$/, {timeout: 10000}, async function(user) {
    await validLogin(user);
});