# AUTOMATION BLOG

## LOGIN tests

The very first Login tests. They aree hosted by SDPC-98. They are just 3 tests


## PRODUCTS tests

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

Some steps have the page as step parameter, this way it counts as only 1 step, but actually, since there is one step file per page, the same step is coded in each step file per page. For example:
- I see "Menu" option at "Products" page 
- I see "Login" option at "Login" page

In this case there is an option that opens another website, Saucelabs. I only dedicate one test for this option and instead of create a trio of new files, I have just added one step into Left Menu steps file.

HEADS UP: There is a problem with Playwright expect.toBeVisible() method. It does not reflect human eye visibility property, so it is not trustable ... For Products page tests I have used some hardcoded stuff, but further pages tests can affect this temporary solution
