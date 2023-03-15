# playwright-playground-cucumber-js
Playwright with BDD. Cucumber runner

## Project structure

- /features: folder hosting feature files. The ones that contain the tests using BDD Gherkin. They should be allocated in the Test Manager tool (for examle Xray)
- /tests: javascript files
    - /src: POM
        - /model: javascript files for pages
        - /selectors: constants files containing the element selectors. This way you do not change any actual code file if a selector is changed.
        - constants.js: project constants
    - dummySteps.js: cucumber javascript "glue" code for binding the feature steps with the POM
    - hooks.js: cucumber javascript for setting and clearing each test up
    - setup.js: javascript for initialiting objects (it is first file to be loaded/executed when running the project scripts)
- package.json: it contains project running scripts as well as needed packages

## Running the project

```
    "test": "./node_modules/.bin/cucumber-js --require tests --publish-quiet",
    "report": "./node_modules/.bin/cucumber-js --require tests --publish-quiet --format json:./reports/cucumber.json"
```

- test: runs the tests locally. It runs all the tests in "features" folder
- report: runs the tests locally and creates de cucumber report in json format. A "reports" folder is previously needed in the project home directory. This report can be uploaded to the Test Manager in the next CI/CD pipeline stage


## POC features

### Playwright

- Unlike Playwright runner, Cucumber runner needs to initialise the browser.
- It uses locators, clicks and fills
- It uses expect 


### BDD

- It uses Scenario and Scenario Outline
- It covers Valid and Invalid scenarios


### Code

- It uses a single object variable (global) for each page in order to store status data (although this POC is not using any status data yet). It is not using "class methods"
- It uses a standalone file for the page selectors, so you can change them without modifying the javascript core code, avoiding unneeded risks
- It passes the Playwright context variable ("page") to every method (although it is a global variable)
- It uses language configuration when dealing with literals in the page. It is CRUCIAL for a global company testing. In fact, at very advanced frameworks, the expected text should be provided by an external service, this way we will avoid a lot of language hardcoded configuration data