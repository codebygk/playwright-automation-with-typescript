import { expect, test } from '@playwright/test';

test.describe('Menu page', async () => {
    const bagelType = 'Sesame';
    test(`Add ${bagelType} bagel to Cart`, async ({ page }) => {
        await page.goto('http://localhost:5173/menu.html');

        page.on('dialog', async (dialog) => {
            if (dialog.type() === 'confirm') {
                expect(dialog.message()).toContain(`Add ${bagelType} bagel to cart?`);
                dialog.accept();
            }
            else {
                expect(dialog.message()).toContain(`${bagelType} bagel added to cart!`);
                dialog.dismiss();
            }

        })

        page.on('dialog', async (dialog) => {

        })
        // // Method 1
        // const table = page.locator('#menuTable');
        // const bagelRow = table.getByRole('row', { name: bagelType }).first();
        // const addToCartButton = bagelRow.getByRole('button', { name: 'Add to Cart' });
        // addToCartButton.click();

        // // Method 2
        // await page.getByRole('row', {name: new RegExp(`^${bagelType}`)}).first().getByRole('button', { name: 'Add to Cart' }).click();

        // // Method 3
        await page.getByRole('cell', {name: bagelType}).locator('..').getByRole('button', { name: 'Add to Cart' }).click();
    })
})