import { test, expect } from '@playwright/test';
import { getRandomState } from '@helpers/states';

test.describe('End to End Flow', () => {
    test.use({ storageState: '.auth/customer01.json' });
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });


    test('Add to Cart and Place Order', async ({ page }) => {
        await page.getByTestId('nav-home').click();
        await page.getByTestId('search-query').fill('thor hammer');
        await page.getByTestId('search-submit').click();
        await page.getByTestId('search_completed').getByRole('heading', { name: 'Thor Hammer' }).click();
        await page.getByTestId('add-to-cart').click();
        await page.getByTestId('nav-cart').click();
        await page.getByTestId('proceed-1').click();
        await page.getByTestId('proceed-2').click();
        await page.getByTestId('country').selectOption('IN');
        await page.getByTestId('state').fill(getRandomState()); 
        await page.getByTestId('postal_code').fill('638156');
        await page.getByTestId('house_number').fill('123');
        await page.getByTestId('proceed-3').click();
        await expect(page.getByTestId('finish')).toBeDisabled();
        await page.getByTestId('payment-method').selectOption('cash-on-delivery');
        await page.getByTestId('finish').click();
        await page.getByTestId('nav-home').click();
    });

    test('Visual Regression Test', async ({ page }) => {
        await page.getByTestId('nav-home').click();
        await page.getByTestId('search-query').fill('thor hammer');
        await page.getByTestId('search-submit').click();
        await page.getByTestId('search_completed').getByRole('heading', { name: 'Thor Hammer' }).click();
        await page.getByRole('heading', { name: 'Thor Hammer' }).click();
        await page.waitForLoadState('load');
        await expect(page).toHaveScreenshot('product-page.png', { mask: [page.getByRole('img')], fullPage: true });
    })


});