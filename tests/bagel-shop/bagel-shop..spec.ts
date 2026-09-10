import test, { expect } from "@playwright/test";

test('Bagel shop smoke test', async ({ page }, testInfo) => {
    // Overriding the timeout in the playwright.config.ts.
    // test.setTimeout(120_000);
    // Adding timeout on top of the one in the config.
    test.setTimeout(testInfo.timeout + 20_000);
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('heading', { name: 'Welcome to The Bagel Shop' })).toBeVisible({ timeout: 30_000 });
})