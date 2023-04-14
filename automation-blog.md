# AUTOMATION BLOG

## LOGIN tests. Ticket SDPC-98

The very first Login tests. They aree hosted by SDPC-98. They are just 3 tests


## PRODUCTS page tests. Ticket SDPC-99

The next tests are Products test. They aree hosted by SDPC-99

I start by main test: select a Product for the shopping cart. SDPC-1.

Second test is SDPC-3, remove not the last selected product. SDPC-3. Only one step is new at this point ...

````
   ✔ Given I am logged into Products page with "standard_user" user # tests/LoginSteps.js:19
   ✔ And I select "Add To Cart" option for "2" "unselected" random products at "Products" page # tests/ProductsSteps.js:11
   ✔ When I select "Remove" option for "1" "selected" random products at "Products" page # tests/ProductsSteps.js:11
   ? Then I see product option is "Add To Cart" for "last" "selected" product at "Products" page
       Undefined. Implement with the following snippet:
       
         Then('I see product option is {string} for {string} {string} product at {string} page', function (string, string2, string3, string4) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
   - And I see "1" badge in shopping cart at "Products" page # tests/ProductsSteps.js:26
   ````

Only some improvements are needed alonside with a refactor for the for loop at assertion step

I continue with SDPC-17, finishing tests for shopping cart behaviour. This time again only 1 steps is new plus a new paremeter for an existing one

````
   ✔ Given I am logged into Products page with "standard_user" user # tests/LoginSteps.js:19
   ✔ And I select "Add To Cart" option for "1" "unselected" random products at "Products" page # tests/ProductsSteps.js:11
   ✔ When I select "Remove" option for "1" "selected" random products at "Products" page # tests/ProductsSteps.js:11
   ? Then I see product option is "Add To Cart" for "all" products at "Products" page
       Undefined. Implement with the following snippet:
       
         Then('I see product option is {string} for {string} products at {string} page', function (string, string2, string3) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
   ? And I don't see any badge in shopping cart at "Products" page
       Undefined. Implement with the following snippet:
       
         Then('I don\'t see any badge in shopping cart at {string} page', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
   ✔ After # tests/hooks.js:12
````

Now I continue with last products management tests before entering left menu ones: Detail and Shopping Cart pages access.

I start with Detail page access. There are two tests: SDPC-10 and SDPC-13. They need both new `When` and `Then` steps. The only difference between the tests is just a step paremeter value

It involves also 3 new files for dealing with Detail page: the steps file, the model file and the selectors file

We need also to implement the Shopping Cart test SDPC-2. Again we need the new `When` and `Then` steps and also create the 3 new files for Shopping Cart page

Finally we get into the last bunch of tests, the ones regarding the Left Menu: SDPC-7,5,8,9,11,16,23

Since it is a common element for all pages, I create a new trio of new files for it (steps, model and selector) for the first test

I go test by test. For second test, I refactor current steps code for getting it externalized to be used by complex steps

Then most of the test will be finished by just adding the new step parameter values by adding the new selectors, since the methods are already done.

Some steps have the page as step parameter, this way it counts as only 1 step, but actually, since there is one stepS file per page, the same step is coded in each stepS file per page. For example:
- I see "Menu" option at "Products" page 
- I see "Login" option at "Login" page

In this project there is an option that opens another website, Saucelabs. I only dedicate one test for this option and instead of create a trio of new files, I have just added one step into Left Menu steps file.

HEADS UP: There is a problem with Playwright expect.toBeVisible() method. It does not reflect human eye visibility property, so it is not trustable ... For Products page tests I have used some hardcoded stuff, but further pages tests can affect this temporary solution


## DETAIL page tests. Ticket SDPC-100


Usually when starting a new page tests there are quite new steps to be implemented. On the other hand, the trio of the page files usually are already created because of previous tests checking if this page exists.

Besides, sometimes there are new steps or new step parameters in previous pages that must be implemented for the Given steps in order to get to the actual page with the proper status.

One of the benefits of BDD is that some tests can be built with current steps without further work, for example, after all Products page tests and SDPC-21 Detail page test, SDPC-19 is done.

Thanks to all previous work, for all left menu tests in Detail page, only DetailStep file has been updated!! this is BDD great advantage


## YOUR CART (shopping cart) page tests. Ticket SDPC-100

Again the same rutine ... new page, new implemented steps the first tests plus some refactors, sometimes deep ones which implies strong regression on the previous implemented tests, and then just new parameters

I want to talk now about the technical issues I am finding dealing with Playwright
- `expect.toBeVisible()` doesn't reflect the real visibility of an object, sometimes it is hidden but the checks Playwright performs show a visibility status true. That's whym, in this cases, I created a hack in order to try to perform the `click` on it and see if there is no error. Luckily these scenarios allow a rollback action for the click, so the hack is possible.
- I have learnt the difference between `locator.innerText()` and `locator.textContent()`: `innerText` joins each child element's text with `\n`, on the other hand `textContent` just concats all of them. So, it is something like `textContent() = innerText().trim()`. This difference is important because `locator` class has only `allTextContents()`method, there is no `allInnerTexts()` methods.

Another decision I made is about split off some common elements in the page, typically headers and footers. This time the "Shopping Cart" icon "lives" in the pages header, which is a common element along the website, similar to the left menu. In this case, I decided to go ahead with the opposite solution. This time I will embed the header in each page files, so it is redundant code that should be addressed in next framework versions

## HEADS UP: CUCUMBER INNERS: `Global` variables are shared by all scenarios.

### Problem

I have discovered that global variables, the ones embedded into the `global` world object, are shared by all scenarios
So, the current approach I am using:
- use a file to declare global variables `setup.js`

```
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

const yourInformationPage = require('./src/model/yourInformationPage.js');
global.yourInformationPage = new yourInformationPage();
````

- "Require" that file in cucumber command line run command, more precisely, `require` option sets the folder where the `setup.js` file is, alongside *steps* files and `hooks.js`
````
root
 | 
 |---- features
 |---- tests
         |
         |---- <steps files>
         |---- setup.js
         |---- hooks.js
````

so, cucumber command line run command is: `./node_modules/.bin/cucumber-js --require tests --publish-quiet`

Since `setup.js` is **only run once**, the variable is shared by all scenarios in the run. Note: when running Cucumber in parellel, with `--parallel 5` for example, the `setup.js` will run 5 times. 

These run logs are when using the tag option `-t` in order to run a single test

```
tongilcoto in github.com playwright-playground-cucumber-js with SDPC-27-Close-burger-menu-in-shopping-cart > ./node_modules/.bin/cucumber-js --require tests --publish-quiet -t @TEST_SDPC-33
.
First Step. Browser: browser@d9481eabb66d49057297e9c455e2088e TestContext: browser-context@5cda82d8b9437bd2042601e20383408b Global Selected Products: 

Sauce Labs Fleece Jacket
...
SDPC-33. Browser: browser@d9481eabb66d49057297e9c455e2088e TestContext: browser-context@5cda82d8b9437bd2042601e20383408b Global Selected Products: Sauce Labs Fleece Jacket

SDPC-33. Actual: Sauce Labs Fleece Jacket
..

1 scenario (1 passed)
4 steps (4 passed)
````

The first console log shows that `Global Selected Products` is empty and the teest passed.

Conversely, when several tests are run these are the logs:

````
......
First Step. Browser: browser@359aeb1a5c83924920116d54fc8017ce TestContext: browser-context@819b88099a07fdab58c2ae227d740aa2 Global Selected Products: Sauce Labs Fleece Jacket,Sauce Labs Fleece Jacket,Sauce Labs Bike Light

Sauce Labs Fleece Jacket,Sauce Labs Fleece Jacket,Sauce Labs Bike Light,Sauce Labs Bolt T-Shirt
...
SDPC-33. Browser: browser@359aeb1a5c83924920116d54fc8017ce TestContext: browser-context@819b88099a07fdab58c2ae227d740aa2 Global Selected Products: Sauce Labs Fleece Jacket,Sauce Labs Fleece Jacket,Sauce Labs Bike Light,Sauce Labs Bolt T-Shirt

SDPC-33. Actual: Sauce Labs Bolt T-Shirt
````

The `Brownser` id and the `TestContext` id shows that the logs belong to the same scenario and the first log shows that the same `Global Selected Products` in not empty this time, it was filled with actions from another tests and it was not reset

### Solution

Cucumber provides another `World` class object, same class as `global`, that it is called `this`: 
- it is created for every scenario
- **but it is only accessible from `hooks.js` file and *steps* files**. Note: it is not accessible for `BeforeAll` and `AfterAll` hooks either.

Since the main objective of this setup file is to load the desired class file for each page or module, you can think about desktop web versus mobile web, the solution will involve
- To use the `global` object for just the `require` file: `global.loginPage = require('./src/model/loginPage.js');` 
- To instantiate the test variables in the `Before` hook at `hooks.js` file, including page classes variables, using this time the `this` object: `this.loginPage = new global.loginPage();`
- To review *steps* files code in order to use `this` instead of `global`
- To review the code outside *steps* files and *model* files in order to substitute all `global.` references by **a new function parameter**, which it will mean update *steps* files

Note: I think `global` object variables **cannot be modified by two concurrent scenarios** since there is no such situation
- Not parallelization: all scenarios are run sequentially by just one worker
- Parallelization: each cucumber worker loads the `setup.js`, so it is not being affected by the other workers running concurrently.

So, it would be enough if the variables at the `global` object get initialized in the `Before` hook at `hooks.js` file


## YOUR INFORMATION (shopping cart) page tests. Ticket SDPC-100

I have found an issue with my of my principles ... this principle is to keep stesps files free of details of the implementation: no literal, no technical value, etc, this information should be managed by the POM (page object model). Usually literals are implemented as variables in the `constants.js` file. But this time I have found that I was using a technical value as a literal, and that solution is breaking this principle. And even worse, that literal/technical value in `contants.js` was replicating a value already stored in the POM!!! 
So the solution I implement now is to add a property in the page class to host that value, and the name of the property refers to the funcion, not the name of the literal:

Before. Step:
````
const {SHOPPINGCART_OPTION} = require('./src/constants.js');

    await this.productsPage.selectPageOption(this.page, SHOPPINGCART_OPTION);
````

Now. Step:
````
    await this.productsPage.selectPageOption(this.page, this.productsPage.nextPageOption);
````
Now. productsPage class:
````
    nextPageOption = this.selectors.pageOptions['Shopping Cart'];
````




