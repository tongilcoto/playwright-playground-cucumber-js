exports.language = "en_US";

exports.pageUrls = {
    main: 'https://demo.playwright.dev/todomvc',
    login: 'https://saucedemo.com'
};

exports.passwords = {
    valid: 'secret_sauce',
    invalid: 'xxxxx'
};

exports.errorTexts = {
    Login: {
        en_US: 'Epic sadface: Username and password do not match any user in this service'
    },
    Locked_Out: {
        en_US: 'Epic sadface: Sorry, this user has been locked out.'
    },
};

exports.shoppingCartOptions = {
    ADDTOCART: 'Add To Cart',
    REMOVE: 'Remove'
};

exports.shoppingCartElementsRegexp = {
    ADDTOCART: /^add-to-cart-/,
    REMOVE: /^remove-/
};

exports.productStatuses = {
    SELECTED: 'selected',
    UNSELECTED: 'unselected',
    ALL: 'all'
};

exports.PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE = 'data-test';

exports.position = {
    LAST: 'last'
}
