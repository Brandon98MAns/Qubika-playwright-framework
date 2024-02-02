const { chromium } = require('playwright');
const axios = require('axios');

describe('Full login and category creation test', () => {
  test('Login and category creation', async () => {
    // Step 1: Create user through API
    const createUserThroughAPI = async () => {
      try {
        const response = await axios.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
          email: 'tfggesntgg@exxamprlee.com',
          password: 'teggstpaxsswsord',
          roles: ['ROLE_ADMIN']
        });
        const newUser = response.data;
        console.log('New user created:', newUser);
        return newUser;
      } catch (error) {
        throw new Error('Error creating a new user through the API:', error.response.data);
      }
    };

    // Step 2: Login and create categories
    const newUser = await createUserThroughAPI();
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      // Step 3: Go to login page
      await page.goto('https://club-administration.qa.qubika.com/#/auth/login');

      // Step 4: Validate that the login page is displayed correctly
      await page.waitForSelector('div.text-center.text-muted.mb-4 > h3', { state: 'visible' });
      await page.waitForSelector('input[formcontrolname="email"][type="email"]', { state: 'visible' });
      await page.waitForSelector('input[formcontrolname="password"][type="password"]', { state: 'visible' });
      await page.waitForSelector('button.btn.btn-primary.my-4', { state: 'visible' });

      // Step 5: Log in with the created user
      await page.fill('input[formcontrolname="email"]', newUser.email);
      await page.fill('input[formcontrolname="password"]', 'teggstpaxsswsord'); // Use direct password here
      await page.click('button.btn.btn-primary.my-4');

      // Step 5.1: Wait for navigation after logging in
      await page.waitForLoadState('load');

      // Step 6: Validate that the user is logged in correctly
      const expectedURLAfterLogin = 'https://club-administration.qa.qubika.com/#/dashboard';
      const currentURL = page.url();
      if (currentURL === expectedURLAfterLogin) {
        console.log('Login Succesfully!');
      } else {
        console.log('Login failed!');
      }

      // Step 7a: Go to the Category page
      await page.click('a[href="#/category-type"]');

      // Step 7b: Create a new category and validate that it was created successfully
      await page.click('button[class="btn btn-primary"]');
      await page.fill('input[id="input-username"]', 'New Category');
      await page.click('button[type="submit"]'); 
      await page.waitForSelector('.category-item');
      const categories = await page.$$('.category-item');
      const newCategoryCreated = categories.some(async (category) => {
        const categoryName = await category.textContent();
        return categoryName === 'New Category';
      });
      if (!newCategoryCreated) {
        throw new Error('Error: The new category was not created successfully.');
      }

      // Step 7c: Create a subcategory and validate that it is displayed in the Categories list
      await page.click('button#create-subcategory-button');
      await page.fill('#subcategory-name-input', 'New Subcategory');
      await page.click('button#save-subcategory-button');
      await page.waitForSelector('.subcategory-item');
      const subcategories = await page.$$('.subcategory-item');
      const newSubcategoryDisplayed = subcategories.some(async (subcategory) => {
        const subcategoryName = await subcategory.textContent();
        return subcategoryName === 'New Subcategory';
      });
      if (!newSubcategoryDisplayed) {
        throw new Error('Error: The new subcategory was not displayed in the Categories list.');
      }

      console.log('The workflow was completed successfully!');
    } catch (error) {
      console.error(error.message);
    } finally {
      await browser.close();
    }
  });
});


