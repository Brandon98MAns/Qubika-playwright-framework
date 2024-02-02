// Step 4: Log in with the created user
await page.fill('input[formcontrolname="email"]', newUser.email);
await page.fill('input[formcontrolname="password"]', passsword);
await page.click('button.btn.btn-primary.my-4');