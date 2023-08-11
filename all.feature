
Feature: SauceDemo test plan

Scenario: Successful Login when using valid user and valid password lands you in Products page
    Given I am "standard_user" user
    When I login with user "valid" password
    Then I see "Products" page

Scenario Outline: Invalid Login when using valid user and locked user and invalid password throws a login error
    Given I am "<user>" user
    When I login with user "invalid" password
    Then I see "Login" error at Login page

Examples:
    | user |
    | standard_user |
    | locked_out_user |

Scenario: Locked Out login when using locked out user and valid password throws a login error
    Given I am "locked_out_user" user
    When I login with user "valid" password
    Then I see "Locked_Out" error at Login page




Scenario: Product Detail access selecting product Name sends you to Detail page
    Given I am logged into Products page with "standard_user" user
    When I select "unselected" "random" product "name"
    Then I see Detail page for "selected" product

Scenario: Product Detail access selecting product Image sends you to Detail page
    Given I am logged into Products page with "standard_user" user
    When I select "unselected" "random" product "image"
    Then I see Detail page for "selected" product

Scenario: Selecting 1 product in Products page updates the shopping cart and the product status
    Given I am logged into Products page with "standard_user" user
    When I select "Add To Cart" option for "1" "unselected" random products at "Products" page
    Then I see product option is "Remove" for "selected" products at "Products" page
    And I see "1" badge in shopping cart at "Products" page

Scenario: Selecting 2 products in Products page updates the shopping cart and the product status
    Given I am logged into Products page with "standard_user" user
    When I select "Add To Cart" option for "2" "unselected" random products at "Products" page
    Then I see product option is "Remove" for "selected" products at "Products" page
    And I see "2" badge in shopping cart at "Products" page

Scenario: Removing Not the last product in Products page updates the shopping cart and the product status
    Given I am logged into Products page with "standard_user" user
    And I select "Add To Cart" option for "2" "unselected" random products at "Products" page
    When I select "Remove" option for "1" "selected" random products at "Products" page
    Then I see product option is "Add To Cart" for "last" "selected" product at "Products" page
    And I see "1" badge in shopping cart at "Products" page

Scenario: Removing the last product in Products page updates the shopping cart and the product status
    Given I am logged into Products page with "standard_user" user
    And I select "Add To Cart" option for "1" "unselected" random products at "Products" page
    When I select "Remove" option for "1" "selected" random products at "Products" page
    Then I see product option is "Add To Cart" for "all" products at "Products" page
    And I don't see any badge in shopping cart at "Products" page

Scenario: Shopping cart access from Products page
    Given I am logged into Products page with "standard_user" user
    When I select "Shopping Cart" option at "Products" page
    Then I see "Your Cart" page

Scenario: Open Burger menu in Products page opens left menu
    Given I am logged into Products page with "standard_user" user
    When I select "Menu" option at "Products" page
    Then I see the left menu

Scenario: Close Burger menu in Products page closes left menu
    Given I am logged into Products page with "standard_user" user
    And I select "Menu" option at "Products" page
    When I select "Close" option at the left menu
    Then I see the "Menu option" at "Products" page

Scenario: All Items left menu option in Products page sends you to Products page
    Given I am logged into Products page with "standard_user" user
    And I select "Menu" option at "Products" page
    When I select "All Items" option at the left menu
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: About left menu option in Products page opens Saucelabs page
    Given I am logged into Products page with "standard_user" user
    And I select "Menu" option at "Products" page
    When I select "About" option at the left menu
    Then I see "Saucelabs" page

Scenario: Logout left menu option in Products page sends you to Login page
    Given I am logged into Products page with "standard_user" user
    And I select "Menu" option at "Products" page
    When I select "Logout" option at the left menu
    Then I see "Login" option at "Login" page

Scenario: Reset App State left menu option in Products page resets Shopping Cart and products status
    Given I am logged into Products page with "standard_user" user
    And I select "Menu" option at "Products" page
    When I select "Reset App State" option at the left menu
    Then I don't see any badge in shopping cart at "Products" page
    And I see product option is "Add To Cart" for "all" products at "Products" page





Scenario: Selecting First cart product at Detail page updates the shopping cart and the product status
    Given I select "unselected" random product "name" when logged as "standard_user" user
    When I select "Add To Cart" option at "Detail" page
    Then I see product option is "Remove" for the Detail's product
    And I see "1" badge in shopping cart at "Details" page

Scenario: Selecting Not the First cart product at Detail page updates the shopping cart and the product status
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    And I select "unselected" "random" product "image"
    When I select "Add To Cart" option at "Detail" page
    Then I see product option is "Remove" for the Detail's product
    And I see "2" badge in shopping cart at "Details" page

Scenario: Removing not the last cart product at Detail page updates the shopping cart and the product status
    Given I select "Add To Cart" option for "2" "unselected" random products when logged as "standard_user" user
    And I select "selected" "random" product "image"
    When I select "Remove" option at "Detail" page
    Then I see product option is "Add to Cart" for the Detail's product
    And I see "1" badge in shopping cart at "Details" page

Scenario: Removing the last product at Detail page updates the shopping cart and the product status
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    And I select "random" "selected" product "image"
    When I select "Remove" option at "Detail" page
    Then I see product option is "Add to Cart" for the Detail's product
    And I don't see any badge in shopping cart at "Details" page

Scenario: Back To products from Detail page sends you to Products page
    Given I select "unselected" random product "name" when logged as "standard_user" user
    When I select "Back To Products" option at "Detail" page
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: Shopping cart access from Detail page
    Given I select "unselected" random product "name" when logged as "standard_user" user 
    When I select "Shopping Cart" option at "Detail" page
    Then I see "Your Cart" page

Scenario: Open Burger menu in Detail page opens left menu
    Given I select "unselected" random product "name" when logged as "standard_user" user
    When I select "Menu" option at "Detail" page
    Then I see the left menu

Scenario: Close Burger menu in Detail page closes left menu
    Given I select "unselected" random product "name" when logged as "standard_user" user
    And I select "Menu" option at "Detail" page
    When I select "Close" option at the left menu
    Then I see the "Menu option" at "Detail" page

Scenario: All Items left menu option in Detail page sends you to Products page
    Given I select "unselected" random product "name" when logged as "standard_user" user
    And I select "Menu" option at "Detail" page
    When I select "All Items" option at the left menu
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: About left menu option in Detail page opens Saucelabs page
    Given I select "unselected" random product "name" when logged as "standard_user" user
    And I select "Menu" option at "Detail" page
    When I select "About" option at the left menu
    Then I see "Saucelabs" page

Scenario: Logout left menu option in Products page sends you to Login page
    Given I select "unselected" random product "name" when logged as "standard_user" user
    And I select "Menu" option at "Detail" page
    When I select "Logout" option at the left menu
    Then I see "Login" option at "Login" page

Scenario: Reset App State left menu option in Detail page resets Shopping Cart and products status
    Given I select "unselected" random product "name" when logged as "standard_user" user
    And I select "Menu" option at "Detail" page
    When I select "Reset App State" option at the left menu
    Then I don't see any badge in shopping cart at "Detail" page
    And I see product option is "Add To Cart" for the Detail's product




Scenario: Removing Not the Last cart product in Your Cart page updates the shopping cart and the product status
    Given I proceed to "Your Cart" page with "2" selected random products when logged as "standard_user" user
    When I select "Remove" option for random Cart product
    Then I don't see "selected" product at "Your Cart" page 
    And I see "1" badge in shopping cart at "Your Cart" page

Scenario: Removing the Last cart product in Your Cart page updates the shopping cart and the product status
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    When I select "Remove" option for random Cart product
    Then I don't see "any" product at "Your Cart" page
    And I don't see any badge in shopping cart at "Your Cart" page

Scenario: Checkout access is Enabled when product is in shopping cart at Your Cart page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    When I select "Checkout" option at "Your Cart" page
    Then I see "Your Information" page

Scenario: Checkout access is Disabled when there is no product in shopping cart at Your Cart page
    Given I am logged into Products page with "standard_user" user
    When I select "Shopping Cart" option at "Products" page
    Then I see "Checkout" option is "disabled" at "Your Cart" page

Scenario: Continue Shopping in Your Cart page sends you to Products page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    When I select "Continue Shopping" option at "Your Cart" page
    Then I see "Products" page
    And I see the "products grid" at "Products" page

Scenario: Shopping cart access from Your Cart page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Your Cart" page
    Then I see "Your Cart" page
    And I see "selected" products at "Your Cart" page

Scenario: Open Burger menu in Your Cart page opens left menu
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    When I select "Menu" option at "Your Cart" page
    Then I see the left menu

Scenario: Close Burger menu in Your Cart page closes left menu
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Cart" page
    When I select "Close" option at the left menu
    Then I see the "Menu option" at "Your Cart" page

Scenario: All Items left menu option in Your Cart page sends you to Products page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Cart" page
    When I select "All Items" option at the left menu
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: About left menu option in Your Cart page opens Saucelabs page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Cart" page
    When I select "About" option at the left menu
    Then I see "Saucelabs" page

Scenario: Logout left menu option in Your Cart page sends you to Login page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Cart" page
    When I select "Logout" option at the left menu
    Then I see "Login" option at "Login" page

Scenario: Reset App State left menu option in Your Cart page resets Shopping Cart and products status
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Cart" page
    When I select "Reset App State" option at the left menu
    Then I don't see any badge in shopping cart at "Your Cart" page
    And I don't see "any" product at "Your Cart" page




Scenario: Invalid Continue when first name is missing in Your Information page throws a field missing error
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I fill "last name" and "zip/postal code"
    When I select "Continue" option at "Your Information" page
    Then I see "first name missing" error at Your Information page
    And I see empty fields placeholder and underline in red font plus an error icon
    And I don't see not-empty fields placeholder and underline in red font plus an error icon

Scenario: Invalid Continue when last name is missing in Your Information page throws a field missing error
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I fill "first name" and "zip/postal code"
    When I select "Continue" option at "Your Information" page
    Then I see "last name missing" error at Your Information page
    And I see empty fields placeholder and underline in red font plus an error icon
    And I don't see "first name" and "zip/postal code" placeholder and underline in red font plus an error icon

Scenario: Invalid Continue when zip/postal code is missing in Your Information page throws a field missing error
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I fill "first name" and "last name"
    When I select "Continue" option at "Your Information" page
    Then I see "zip/postal code missing" error at Your Information page
    And I see empty fields placeholder and underline in red font plus an error icon
    And I don't see not-empty fields placeholder and underline in red font plus an error icon

Scenario: Invalid Continue when all fields are missing in Your Information page throws a field missing error
    Given I proceed to "Your INFORMATION" page with "1" selected random products when logged as "standard_user" user
    When I select "Continue" option at "Your Information" page
    Then I see "first name missing" error at Your Information page
    And I see empty fields placeholder and underline in red font plus an error icon
    And I don't see not-empty fields placeholder and underline in red font plus an error icon

Scenario: Invalid Continue when only one (random) field is filled in Your Information page throws a field missing error
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I fill "one random" field at "Your Information" page
    When I select "Continue" option at "Your Information" page
    Then I see "first empty field missing" error at Your Information page
    And I see empty fields placeholder and underline in red font plus an error icon
    And I don't see not-empty fields placeholder and underline in red font plus an error icon

Scenario: Valid Continue in Your Information page in Your Information page sends you to Overview page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I fill all fields at "Your Information" page
    When I select "Continue" option at "Your Information" page
    Then I see "Overview" page

Scenario: Cancel in Your Information page sends you to Your Cart page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I fill all fields at "Your Information" page
    When I select "Cancel" option at "Your Information" page
    Then I see "Your Cart" page
    And I see the "product list" at "Your Cart" page

Scenario: Shopping cart access from Your Information page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Your Cart" page
    Then I see "Your Cart" page
    And I see "selected" products at "Your Cart" page

Scenario: Open Burger menu in Your Information page opens left menu
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    When I select "Menu" option at "Your Information" page
    Then I see the left menu

Scenario: Close Burger menu in Your Information page closes left menu
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page 
    When I select "Close" option at the left menu
    Then I see the "Menu option" at "Your Information" page

Scenario: All Items left menu option in Your Information page sends you to Products page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page
    When I select "All Items" option at the left menu
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: About left menu option in Your Information page opens Saucelabs page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page
    When I select "About" option at the left menu
    Then I see "Saucelabs" page

Scenario: Logout left menu option in Your Information page sends you to Login page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page
    When I select "Logout" option at the left menu
    Then I see "Login" option at "Login" page

Scenario: Reset App State left menu option in Your Information page resets Shopping Cart badge
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page 
    When I select "Reset App State" option at the left menu
    Then I don't see any badge in shopping cart at "Your Information" page

Scenario: Reset App State left menu option in Your Information page resets cart products in Overview page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page
    And I select "Reset App State" option at the left menu
    And I fill all fields at "Your Information" page
    When I select "Continue" option at "Your Information" page
    Then I don't see "any" product at "Overview" page




Scenario: Finishing purchase in Overview page sends you to Complete page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Finish" option at "Overview" page
    Then I see "Complete" page

Scenario: Cancel in Overview page sends you to Products page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Cancel" option at "Overview" page
    Then I see "Products" page
    And I see the "products grid" at "Products" page

Scenario: Shopping cart access from Overview page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Your Cart" page
    Then I see "Your Cart" page
    And I see "selected" products at "Your Cart" page

Scenario: Open Burger menu in Overview page opens left menu
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Menu" option at "Overview" page
    Then I see the left menu

Scenario: Close Burger menu in Overview page closes left menu
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Overview" page
    When I select "Close" option at the left menu
    Then I see the "Menu option" at "Overview" page

Scenario: All Items left menu option in Overview page sends you to Products page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Overview" page
    When I select "All Items" option at the left menu
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: About left menu option in Overview page opens Saucelabs page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Overview" page
    When I select "About" option at the left menu
    Then I see "Saucelabs" page

Scenario: Logout left menu option in Overview page sends you to Login page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Overview" page
    When I select "Logout" option at the left menu
    Then I see "Login" option at "Login" page

Scenario: Reset App State left menu option in Overview page resets Shopping Cart and products status
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Overview" page
    When I select "Reset App State" option at the left menu
    Then I don't see any badge in shopping cart at "Overview" page
    And I don't see "any" product at "Overview" page




Scenario: Back Home in Complete page sends you to Products page
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Back Home" option at "Complete" page
    Then I see "Products" page
    And I don't see any badge in shopping cart at "Products" page

Scenario: Shopping cart access from Complete page
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Your Cart" page
    Then I see "Your Cart" page
    And I don't see "any" product at "Your Cart" page

Scenario: Open Burger menu in Complete page opens left menu
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Menu" option at "Complete" page
    Then I see the left menu

Scenario: Close Burger menu in Complete page closes left menu
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Complete" page
    When I select "Close" option at the left menu
    Then I see the "Menu option" at "Complete" page

Scenario: All Items left menu option in Complete page sends you to Products page
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Complete" page
    When I select "All Items" option at the left menu
    Then I see "Products" page
    And I see the "Menu option" at "Products" page
    And I see the "products grid" at "Products" page

Scenario: About left menu option in Complete page opens Saucelabs page
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Complete" page
    When I select "About" option at the left menu
    Then I see "Saucelabs" page

Scenario: Logout left menu option in Complete page sends you to Login page
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Complete" page
    When I select "Logout" option at the left menu
    Then I see "Login" option at "Login" page

Scenario: Reset App State left menu option in Complete page resets Shopping Cart
    Given I am logged into Products page with "standard_user" user
    And I select "Menu" option at "Complete" page
    When I select "Reset App State" option at the left menu
    Then I don't see any badge in shopping cart at "Complete" page




Scenario: Your Cart page shows selected products in Products page when there is 1 product in the cart
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Product" page
    Then I see "1" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Your Cart page shows selected products in Products page when there are 2 products in the cart
    Given I select "Add To Cart" option for "2" "unselected" random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Product" page
    Then I see "2" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Selected product's Detail page shows correct product status
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    When I select "selected" "random" product "name"
    Then I see "1" badge in shopping cart at "Detail" page
    And I see correct name and price for the Detail's product
    And I see product option is "Remove" for the Detail's product

Scenario: Unselected product's Detail page shows correct product status when there is no selected product
    Given I am logged into Products page with "standard_user" user
    When I select "unselected" "random" product "name"
    Then I don't see any badge in shopping cart at "Details" page
    And I see correct name and price for the Detail's product
    And I see product option is "Add to Cart" for the Detail's product

Scenario: Random unselected product's Detail page shows correct product and shopping card status when there is another selected product
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    When I select "unselected" "random" product "name"
    Then I see "1" badge in shopping cart at "Detail" page
    And I see correct name and price for the Detail's product
    And I see product option is "Add to Cart" for the Detail's product

Scenario: Your Cart page shows selected products in Detail page when there is 1 product in the cart
    Given I am logged into Products page with "standard_user" user
    And I select "selected" "random" product "name"
    And I select "Add To Cart" option at "Detail" page
    When I select "Shopping Cart" option at "Detail" page
    Then I see "1" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Your Cart page shows selected products in Detail page when there are 2 products in the cart
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    And I select "unselected" "random" product "name"
    When I select "Shopping Cart" option at "Detail" page
    Then I see "1" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Your Cart page shows selected products in both Products page and Detail page
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    And I select "unselected" "random" product "name"
    And I select "Add To Cart" option at "Detail" page
    When I select "Shopping Cart" option at "Detail" page
    Then I see "2" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Overview page shows selected products when there is 1 product in the cart
	Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
	And I fill all fields at "Your Information" page
    When I select "Continue" option at "Your Information" page
    Then I see correct name and price for "selected" products at "Overview" page
    And I see correct quantity for selected products at "Overview" page
    And I see correct total price for selected products

Scenario: Overview page shows selected products with correct total when there are 2 products in the cart
	Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
	And I fill all fields at "Your Information" page
    When I select "Continue" option at "Your Information" page
    Then I see correct name and price for "selected" products at "Overview" page
    And I see correct quantity for selected products at "Overview" page
    And I see correct total price for selected products

Scenario: Finishing the purchase resets the shopping cart
    Given I finish the purchase with "1" selected random products when logged as "standard_user" user
    When I select "Back Home" option at "Complete" page
    Then I see "Products" page
    And I see product option is "Add To Cart" for "all" products at "Products" page
    And I don't see any badge in shopping cart at "Products" page




Scenario: Detail's Back To Products keeps selected products with no cart change
    Given I select "Add To Cart" option for "2" "unselected" random products when logged as "standard_user" user
    And I select "unselected" "random" product "name"
    When I select "Back To Products" option at "Detail" page
    Then I see product option is "Remove" for "selected" products at "Products" page

Scenario: Detail's Back To Products keeps selected products after product is added
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    And I select "unselected" "random" product "name"
    And I select "Add To Cart" option at "Detail" page
    When I select "Back To Products" option at "Detail" page
    Then I see product option is "Remove" for "selected" products at "Products" page

Scenario: Detail's Back To Products keeps selected products after product is removed
    Given I select "Add To Cart" option for "2" "unselected" random products when logged as "standard_user" user
    And I select "selected" "random" product "name"
    And I select "Remove" option at "Detail" page
    When I select "Back To Products" option at "Detail" page
    Then I see product option is "Remove" for "selected" products at "Products" page

Scenario: Cart's Continue Shopping keeps selected products with no cart changed
    Given I proceed to "Your Cart" page with "2" selected random products when logged as "standard_user" user
    When I select "Continue Shopping" option at "Your Cart" page
    Then I see product option is "Remove" for "selected" products at "Products" page

Scenario: Cart's Continue Shopping keeps selected products after product is removed
    Given I proceed to "Your Cart" page with "2" selected random products when logged as "standard_user" user
    And I select "Remove" option for random Cart product
    When I select "Continue Shopping" option at "Your Cart" page
    Then I see product option is "Remove" for "selected" products at "Products" page

Scenario: Your Information's Shopping Cart keeps selected products
    Given I proceed to "Your Information" page with "2" selected random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Your Information" page
    Then I see "2" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Your Information's Cancel keeps selected products
    Given I proceed to "Your Information" page with "2" selected random products when logged as "standard_user" user
    When I select "Cancel" option at "Your Information" page
    Then I see "2" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Overview's Shopping Cart keeps selected products
    Given I checkout the purchase with "2" selected random products when logged as "standard_user" user
    When I select "Shopping Cart" option at "Overview" page
    Then I see "2" badge in shopping cart at "Your Cart" page
    And I see correct name and price for "selected" products at "Your Cart" page
    And I see correct quantity for selected products at "Your Cart" page

Scenario: Overview's Cancel keeps selected products
    Given I checkout the purchase with "2" selected random products when logged as "standard_user" user
    When I select "Cancel" option at "Overview" page
    Then I see "2" badge in shopping cart at "Products" page
    And I see product option is "Remove" for "selected" products at "Products" page

Scenario: Left Menu's Reset App Status resets shopping cart in Products page
    Given I select "Add To Cart" option for "1" "unselected" random products when logged as "standard_user" user
    And I select "Menu" option at "Products" page
    And I select "Reset App State" option at the left menu
    When I select "Shopping Cart" option at "Products" page
    Then I don't see "selected" product at "Your Cart" page 

Scenario: Left Menu's Reset App Status resets shopping cart in Detail page
    Given I select "unselected" random product "name" when logged as "standard_user" user
    And I select "Menu" option at "Detail" page
    And I select "Reset App State" option at the left menu
    When I select "Shopping Cart" option at "Detail" page
    Then I don't see "selected" product at "Your Cart" page 

Scenario: Left Menu's Reset App Status resets shopping cart in Your Cart page
    Given I proceed to "Your Cart" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Cart" page
    When I select "Reset App State" option at the left menu
    Then I don't see "selected" product at "Your Cart" page 

Scenario: Left Menu's Reset App Status resets shopping cart in Your Information page
    Given I proceed to "Your Information" page with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Your Information" page
    And I select "Reset App State" option at the left menu
    When I select "Shopping Cart" option at "Your Information" page
    Then I don't see "selected" product at "Your Cart" page 

Scenario: Left Menu's Reset App Status resets shopping cart in Overview page
    Given I checkout the purchase with "1" selected random products when logged as "standard_user" user
    And I select "Menu" option at "Overview" page
    And I select "Reset App State" option at the left menu
    When I select "Shopping Cart" option at "Your Information" page
    Then I don't see "any" product at "Your Cart" page


