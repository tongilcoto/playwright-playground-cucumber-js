const {Given, When, Then} = require('@cucumber/cucumber');
const {productStatuses, shoppingCartOptions, informationFields, RANDOM, FIRST_EMPTY_FIELD_MISSING, errorTexts} = require('./src/constants.js');
const {validLogin, selectStepRequiredProducts } = require('./src/utils.js');
const {expect} = require('@playwright/test');


Then(/^I see "(Your Information)" page$/, async function(pageTitle) {
    await expect(this.yourInformationPage.getTitle(this.page)).toContainText(pageTitle);
});

Given(/^I proceed to "Your Information" page with "(\d)" selected random products when logged as "(standard_user)" user$/, async function(quantity, user) {
    this.user =  await validLogin(user, this.page, this.loginPage);
    this.productsStatus[productStatuses.SELECTED] = await selectStepRequiredProducts(this.page, shoppingCartOptions.ADDTOCART, quantity, productStatuses.UNSELECTED, this.productsPage);
    await this.productsPage.selectPageOption(this.page, this.productsPage.nextPageOption);
    await this.shoppingCartPage.selectPageOption(this.page, this.shoppingCartPage.nextPageOption);
});

When(/^I fill all fields at "Your Information" page$/, async function() {
    await this.yourInformationPage.fillFirstName(this.page);
    this.filledFields.push(informationFields.FIRST_NAME);
    await this.yourInformationPage.fillLastName(this.page);
    this.filledFields.push(informationFields.LAST_NAME);
    await this.yourInformationPage.fillPostalCode(this.page);
    this.filledFields.push(informationFields.POSTAL_CODE);
});

When(/^I fill "(first name|last name)" and "(last name|zip\/postal code)"$/, async function(option1, option2) {
    if (option1 === informationFields.FIRST_NAME || option2 === informationFields.FIRST_NAME) { 
        await this.yourInformationPage.fillFirstName(this.page);
        this.filledFields.push(informationFields.FIRST_NAME);
    }
    if (option1 === informationFields.LAST_NAME || option2 === informationFields.LAST_NAME) {
        await this.yourInformationPage.fillLastName(this.page);
        this.filledFields.push(informationFields.LAST_NAME);
    }
    if (option1 === informationFields.POSTAL_CODE || option2 === informationFields.POSTAL_CODE) {
        await this.yourInformationPage.fillPostalCode(this.page);
        this.filledFields.push(informationFields.POSTAL_CODE);
    }
});

When(/^I fill "(one random|zip\/postal code)" field at "Your Information" page$/, async function(option) {
    const field = option.includes(RANDOM)
        ? Object.values(informationFields)[Math.floor(Math.random() * Object.values(informationFields).length)]
        : option;
    await this.yourInformationPage.fillField(this.page, field);
    this.filledFields.push(field);
});

When(/^I select "(Cancel|Continue|Dismiss error|Menu|Shopping Cart)" option at "Your Information" page$/, async function(option) {
    await this.yourInformationPage.selectPageOption(this.page, option); 
});

Then(/^I see "(first empty field missing|first name missing|last name missing|zip\/postal code missing)" error at Your Information page$/, async function (errorKey) {
    await expect(this.yourInformationPage.getError(this.page)).toBeVisible();
    const field = errorKey === FIRST_EMPTY_FIELD_MISSING? Object.values(informationFields).filter(field => !(this.filledFields.includes(field)))[0] : '';
    errorKey = field ? field + ' missing' : errorKey;
    await expect(this.yourInformationPage.getError(this.page)).toContainText(errorTexts[errorKey][this.language]);
});

Then(/^I see empty fields placeholder and underline in red font plus an error icon$/,async function() {
    // very visual step ... prone to be be changed ... just for demoing purposes
    const emptyFields = Object.values(informationFields).filter(field => !(this.filledFields.includes(field)));
    for (let field of emptyFields) {
        await expect(this.yourInformationPage.getField(this.page, field, true)).toBeEmpty();
        await expect(this.yourInformationPage.getField(this.page, field, true)).toHaveCSS('border-bottom-color', 'rgb(226, 35, 26)');
        await expect(this.yourInformationPage.getErrorIconAtFieldWithError(this.page, field)).toBeVisible();
    }
});

Then(/^I don't see not-empty fields placeholder and underline in red font plus an error icon$/, async function() {
    const notEmptyFields = Object.values(informationFields).filter(field => this.filledFields.includes(field));
    for (let field of notEmptyFields) {
        await expect(this.yourInformationPage.getField(this.page, field, true), "Error: configuration should be not present").not.toBeVisible();
        await expect(this.yourInformationPage.getField(this.page, field, false)).toBeVisible();
        await expect(this.yourInformationPage.getField(this.page, field, false)).not.toBeEmpty();
        await expect(this.yourInformationPage.getErrorIconAtFieldWithError(this.page, field)).not.toBeVisible();
    }
});

Then(/^I don't see empty fields placeholder and underline in red font plus an error icon$/, async function() {
    for (let field of Object.values(informationFields)) {
        await expect(this.yourInformationPage.getField(this.page, field, true)).not.toBeVisible();
        if (this.filledFields.includes(field)) { await expect(this.yourInformationPage.getField(this.page, field, false)).not.toBeEmpty();}
        await expect(this.yourInformationPage.getErrorIconAtFieldWithError(this.page, field)).not.toBeVisible();
    }
});

Then(/^I see "(Menu)" option at "Your Information" page$/, async function(option) {
    if (option === "Menu") {
        // PROBLEM: Playwright "expect.toBeVisible" doesn't work as a human being is assuming. Just technical flags that sometimes are not enough to determine the final visibility of an element.
        // HACK: try to click the Menu button to check if it is actually visible (and close the left menu afterwards)
        console.log("\nKnown Hack: Clicking " + option + " option")
        await this.yourInformationPage.selectPageOption(this.page, option);
        await this.leftMenu.selectOption(this.page, "Close");
    } else {
        await expect(this.yourInformationPage.getPageOption(this.page, option)).toBeVisible();
    }
});

Then(/^I don't see any badge in shopping cart at "Your Information" page$/, async function() {
    await expect(this.yourInformationPage.getShoppingCartBadge(this.page)).toHaveCount(0);
});