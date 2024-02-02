Qubika Sports Club Management System Automation Framework

Project Explanation:
This automation framework utilizes Playwright to automate the workflow on the Qubika Sports Club management website. It performs end-to-end testing by automating both the API and the UI side in the same test. The workflow includes the following steps:
1. Creating a new user through the API.
2. Navigating to the Qubika Sports Club Management System website.
3. Validating the correct display of the login page.
4. Logging in with the created user.
5. Validating that the user is logged in.
6. Once logged in:
   a) Navigating to the Category page.
   b) Creating a new category and validating its creation.
   c) Creating a subcategory and validating its display in the Categories list.

Improvements:
- Enhanced error handling could be implemented to handle unexpected scenarios more gracefully.
- More descriptive logging could be added to provide better visibility into the automation process.
- Parameterization of test data could be introduced to increase flexibility and reusability.
- Integration with a test reporting tool could be considered to generate detailed test reports.

Commands:
1. Create User via API:
   node create-user-api.js

2. Validate User Login:
   node validate-user-login.js

3. Validate Category:
    node create-validate-category.js

4. Run E2E for regressions:
    node challenge-ui-api.js

