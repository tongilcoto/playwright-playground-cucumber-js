exports.title = '.title';
exports.error = '[data-test="error"]';
exports.fields = {
    "error_first name": '#first-name.input_error.error',
    "error_last name": '#last-name.input_error.error',
    "error_zip/postal code": '#postal-code.input_error.error',
    "first name": '#first-name',
    "last name": '#last-name',
    "zip/postal code": '#postal-code'
}
exports.errorIconForField = {
    "first name": this.fields['first name'] + ' ~ svg.error_icon',
    "last name": this.fields['last name'] + ' ~ svg.error_icon',
    "zip/postal code": this.fields['zip/postal code'] + ' ~ svg.error_icon'
}
exports.pageOptions = {
    "Cancel": '#cancel',
    "Continue": '#continue',
    "Dismiss error": '.error-button',
    "Menu": '#react-burger-menu-btn',
    "Shopping Cart": '.shopping_cart_link'
};
exports.shoppingCartBadgeValue = '.shopping_cart_badge';