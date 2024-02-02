    // Step 6a: Go to the Category page
    await page.click('a[href="/categories"]');

    // Step 6b: Create a new category and validate that it was created successfully
    await page.click('button#create-category-button');
    await page.fill('#category-name-input', 'New Category');
    await page.click('button#save-category-button');
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