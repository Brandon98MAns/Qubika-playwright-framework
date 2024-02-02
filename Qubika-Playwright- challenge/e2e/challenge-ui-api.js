const { chromium } = require('playwright');
const axios = require('axios');

(async () => {
  const newUser = await createUserThroughAPI();
  
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Step 2: Go to the Qubika Sports Club Management System website
    await page.goto('https://qubikasportsclub.com');

    // Step 3: Validate that the login page is displayed correctly
    const pageTitle = await page.title();
    if (!pageTitle.includes('Qubika Sports Club Management System')) {
      throw new Error('Error: The login page did not display correctly.');
    }

    // Step 4: Log in with the created user
    await page.fill('input[name="username"]', newUser.email);
    await page.fill('input[name="password"]', newUser.password);
    await page.click('button[type="submit"]');

    // Step 4.1: Wait for navigation after logging in
    await page.waitForNavigation();

    // Step 5: Validate that the user is logged in correctly
    await page.waitForSelector('.logged-in-username');
    const loggedInUsername = await page.textContent('.logged-in-username');
    if (loggedInUsername !== newUser.email) {
      throw new Error('Error: The user could not log in correctly.');
    }

    // Step 6a: Go to the Category page
    await page.click('a[href="#/category-type"]');

    // Step 6b: Create a new category and validate that it was created successfully
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

    // Step 6c: Create a subcategory and validate that it is displayed in the Categories list
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
})();

async function createUserThroughAPI() {
  try {
    const response = await axios.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
      email: 'brandonmansfield@qubika.com',
      password: 'brandonmansfield',
      roles: ['ROLE_ADMIN']
    });
    const newUser = response.data;
    console.log('New user created:', newUser);
    return newUser;
  } catch (error) {
    throw new Error('Error creating a new user through the API:', error.response.data);
  }
}


