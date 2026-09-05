import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('heading', { name: 'Installation' }).click();
  await page.getByRole('link', { name: 'Setting up CI' }).click();
  await page.getByRole('navigation', { name: 'Breadcrumbs' }).getByText('Getting Started').click({
    button: 'right'
  });
});