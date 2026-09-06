import { test, expect } from '@playwright/test';

test('Register New User', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/auth/register`);
  await page.getByTestId('first-name').fill('TestUser');
  await page.getByTestId('last-name').fill('One');
  await page.getByTestId('dob').fill('2000-01-01');
  await page.getByTestId('country').selectOption('IN');
  await page.getByTestId('postal_code').fill('600001');
  await page.getByTestId('house_number').fill('01');
  await page.getByTestId('street').fill('Test Street');
  await page.getByTestId('city').fill('Test City');
  await page.getByTestId('state').fill('Test State');
  await page.getByTestId('phone').fill('9876543210');
  await page.getByTestId('email').fill('testuser4@test.com');
  await page.getByTestId('password').fill('krishnaPV@1');
  await page.getByTestId('register-submit').click();
  await expect(page).toHaveURL(`${process.env.BASE_URL}/auth/login`);
});