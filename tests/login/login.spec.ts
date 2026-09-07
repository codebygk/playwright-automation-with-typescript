import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { registerUser } from '@datafactory/register';

test('Login test without pageobject', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-sign-in"]').click();
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');

    // Using css selector to click on the login button. The button text can be either "Login" or "Submit".
    await page.locator('input:has-text("Login"), button:has-text("Login")').click();
    //   Using css selector to click on the menu and profile link
    await page.locator('css=#menu').click();
    //   Using xpath selector to click on the profile link.
    await page.locator('xpath=//a[@data-test="nav-profile"]').click();

    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
    await expect(page.locator('[data-test="page-title"]')).toContainText('Profile');
        //  Using getByTestId to click on the update profile button. testIdAttribute defined in playwright.config.ts.
    await page.getByTestId('update-profile-submit').click();
});

test('Login test with pageobject', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.emailInput.fill('customer@practicesoftwaretesting.com');
    await loginPage.passwordInput.fill('welcome01');
    await loginPage.loginButton.click();
    // await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});

test('Login with newly registered user', async ({ page }) => {
    const email = `test${Date.now()}@practicesoftwaretesting.com`;
    const password = 'krishnaPV@1';
    await registerUser(email, password);
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(email, password);
    await expect(page.getByTestId('nav-menu')).toContainText('TestUser One');
});