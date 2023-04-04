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

I start with Detail page access. There are two tests: SDPC-10 and SDPC-13. They need both Then and When new steps. The only difference between the tests is just a step paremeter value

It involves also 3 new files for dealing with Detail page: the steps file, the model file and the selectors file


