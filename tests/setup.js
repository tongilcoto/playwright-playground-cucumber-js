global.productsStatus = {
    selected: [],
    unselected: []
};
global.previouslySelectedProducts = [];

const loginPage = require('./src/model/loginPage.js');
global.loginPage = new loginPage();

const productsPage = require('./src/model/productsPage.js');
global.productsPage = new productsPage();

