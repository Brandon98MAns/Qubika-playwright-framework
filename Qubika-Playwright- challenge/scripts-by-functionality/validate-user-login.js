  // Step 4: Log in with the created user
  await page.fill('#username', newUser.email);
  await page.fill('#password', newUser.password);
  await page.click('#login-button');