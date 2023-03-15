Feature: Dummmy Feature

Scenario: Successful Login when using valid user and valid password
    Given I am "standard_user" user
    When I login with user "valid" password
    Then I see "Products" page

Scenario Outline: Invalid Login when using valid user and locked user and invalid password
    Given I am "<user>" user
    When I login with user "invalid" password
    Then I see "Login" error at Login page 

Examples:
    | user |
    | standard_user |
    | locked_out_user |

Scenario: Locked Out login when using locked out user and valid password
    Given I am "locked_out_user" user
    When I login with user "valid" password
    Then I see "Locked_Out" error at Login page 
