global.productsStatus = {
    selected: [],
    unselected: []
};
global.detailProduct = {};

const loginPage = require('./src/model/loginPage.js');
global.loginPage = new loginPage();

const productsPage = require('./src/model/productsPage.js');
global.productsPage = new productsPage();

const detailPage = require('./src/model/detailPage.js');
global.detailPage = new detailPage();

const shoppingCartPage = require('./src/model/shoppingCartPage.js');
global.shoppingCartPage = new shoppingCartPage();

const leftMenu = require('./src/model/leftMenu.js');
global.leftMenu = new leftMenu();

