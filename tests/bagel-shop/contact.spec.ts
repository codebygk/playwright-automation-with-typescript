import { expect, test } from '@playwright/test';

test('Send message through contact page', async ({ page, context }) => {
    await page.goto('http://localhost:5173');
    const contactPagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Contact' }).click();
    const contactPage = await contactPagePromise;
    await contactPage.locator('#name').fill('Tester');
    await contactPage.locator('#email').fill('tester@test.com');
    await contactPage.locator('#message').fill('Test Message');

    contactPage.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Send this message?');
        await dialog.accept();
    });


    await contactPage.getByRole('button', { name: 'Send Message' }).click();

    await expect(contactPage.locator('#name')).toHaveValue('');
})