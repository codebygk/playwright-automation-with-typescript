import { test, expect } from '@playwright/test';


test.describe('Home page with no authentication', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('Check Sign in Button', async ({ page }) => {
        // Check the presence of the sign-in button.
        await expect(page.getByTestId('nav-sign-in')).toBeVisible();
        // Check the text of the sign-in button.
        await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');
    });

    test('Check Page Title', async ({ page }) => {
        // Check the title of the page.
        await expect(page).toHaveTitle(/Practice Software Testing/);
    });

    test('Check Product Grid Count', async ({ page }) => {
        // No reliable locator for the product grid, so using a legacy css locator to get the product grid.
        const productGrid = page.locator('.col-md-9');
        // Locator assertions to check the number of products displayed on the home page.
        // Locator assertion is a more robust method as it will wait for the condition to be true and won't fail on transient issues.
        await expect(productGrid.getByRole('link')).toHaveCount(9);
        // Generic assertion to check the number of products displayed on the home page.
        expect(await productGrid.getByRole('link').count()).toBe(9);
    });

    test('Check Search Results', async ({ page }) => {
        await page.getByTestId('search-query').fill('Thor Hammer');
        await page.getByTestId('search-submit').click();
        const searchResults = page.getByTestId('search_completed');
        await expect(searchResults.getByRole('link')).toHaveCount(1);
        await expect(page.getByAltText('Thor Hammer')).toBeVisible();
    });

    test('Visual test with no authentication', { tag: '@visual' }, async ({ page }) => {
        await page.waitForLoadState('load');
        await expect(page).toHaveScreenshot('Home-page-with-no-authentication.png',
            { mask: [page.getByTitle('Practice Software Testing - Toolshop'), page.locator('.testing-notification-bar')], maskColor: '#FF0000' });
    });

});


test.describe('Home page with authentication', () => {
    test.use({ storageState: '.auth/customer01.json' });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('Visual test with authentication', { tag: '@visual' }, async ({ page }) => {
        await page.waitForLoadState('load');
        await expect(page).toHaveScreenshot('Home-page-with-authentication.png',
            { mask: [page.getByTitle('Practice Software Testing - Toolshop'), page.locator('.testing-notification-bar')], maskColor: '#FF0000' });
    });

    test('Check Profile Name', async ({ page }) => {
        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    });

    test('Validate products data is visible in UI from API', async ({ page }) => {
        let products: any;
        await test.step('Intercept /products', async () => {
            await page.route(
                `${process.env.API_BASE_URL}/products**`, async (route) => {
                    const response = await route.fetch();
                    products = await response.json();
                    route.continue();
                }
            )
        });
        await page.goto('/');
        await expect(page.locator('.skeleton').first()).not.toBeVisible();
        const productGrid = page.locator('.col-md-9');
        for (const product of products.data) {
            await expect(productGrid).toContainText(product.name);
            await expect(productGrid).toContainText(product.price.toString());
        }
        // await expect(productGrid).toContainText('Hammer');
    });

    test('Override products data', async ({ page }) => {
        let json: any;
        await test.step('Override /products', async () => {
            await page.route(
                `${process.env.API_BASE_URL}/products**`, async (route) => {
                    const response = await route.fetch();
                    json = await response.json();
                    json.data[0]['name'] = 'Mocked product';
                    json.data[0]['price'] = 1000000.01;
                    json.data[0]['in_stock'] = false;

                    await route.fulfill({ response, json });
                }
            )
        });
        await page.goto('/');
        await expect(page.locator('.skeleton').first()).not.toBeVisible();
        const productGrid = page.locator('.col-md-9');
        await expect(productGrid.getByRole('link').first()).toContainText('Mocked product');
        await expect(productGrid.getByRole('link').first()).toContainText('1000000.01');
        await expect(productGrid.getByRole('link').first()).toContainText('Out of stock');

    });


    test('Mocked products', async ({ page }) => {
        await test.step('Mock /products', async () => {
            await page.routeFromHAR('.hars/product.har',{   
                url: `${process.env.API_BASE_URL}/products**`, 
                update: false
            }
            )
        });
        await page.goto('/');
        await expect(page.locator('.skeleton').first()).not.toBeVisible();
        const productGrid = page.locator('.col-md-9');
        await expect(productGrid.getByRole('link').first()).toContainText('Happy Path Pliers');
        await expect(productGrid.getByRole('link').first()).toContainText('1.99');

    });
});

