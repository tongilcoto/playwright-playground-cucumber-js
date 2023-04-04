exports.errorTexts = {
    Login: {
        en_US: 'Epic sadface: Username and password do not match any user in this service'
    },
    Locked_Out: {
        en_US: 'Epic sadface: Sorry, this user has been locked out.'
    },
};

exports.language = "en_US";

exports.pageUrls = {
    main: 'https://demo.playwright.dev/todomvc',
    login: 'https://saucedemo.com'
};

exports.passwords = {
    valid: 'secret_sauce',
    invalid: 'xxxxx'
};

exports.position = {
    LAST: 'last'
}

exports.PRODUCT_SHOPPINGCART_OPTION_ATTRIBUTE = 'data-test';

exports.productStatuses = {
    SELECTED: 'selected',
    UNSELECTED: 'unselected',
    ALL: 'all'
};

exports.RANDOM = 'random';

exports.shoppingCartElementsRegexp = {
    ADDTOCART: /^add-to-cart-/,
    REMOVE: /^remove-/
};

exports.shoppingCartOptions = {
    ADDTOCART: 'Add To Cart',
    REMOVE: 'Remove'
};
