const {Given, When, Then} = require('@cucumber/cucumber');
const {pageUrls, passwords, errorTexts} = require('./src/constants.js');
const {validLogin} = require('./src/utils.js');
const {expect} = require('@playwright/test');

Given(/^I am "(standard_user|locked_out_user)" user$/, function(user) {
    this.user = user;
});

When(/^I login with user "(valid|invalid)" password$/, async function(password) {
    await this.page.goto(pageUrls['login']);
    await this.loginPage.loginWithCredentials(this.page, this.user, passwords[password]);
});

Then(/^I see "(Login|Locked_Out)" error at Login page$/, {timeout: 10000}, async function(error) {
    const errorText = errorTexts[error][this.language];
    await expect(this.loginPage.getLoginErrorElement(this.page, error)).toHaveText(errorText);
});

Given(/^I am logged into Products page with "(standard_user|problem_user|performance_glitch_user)" user$/, {timeout: 10000}, async function(user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
});

Then(/^I see "(Login)" option at "(Login)" page$/, async function(option, page) {
    await expect(this.loginPage.getOption(this.page, option)).toBeVisible();
});