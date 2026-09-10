import { expect, test } from "@playwright/test";

test('Validate popup', async ({page}) => {
    await page.goto('http://localhost:5173');
    // Register and attach the popup event listener before the click event fires.
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', {'name': 'Get Promo Code'}).click();
    // Wait for the popup.
    const popup = await popupPromise;
    await expect(popup.getByText('B6G2')).toBeVisible();


})