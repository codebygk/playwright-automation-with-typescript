import {expect, test} from '@playwright/test';
import * as fs from 'fs';

test('Create an order', async({page}) => {
    await page.goto('http://localhost:5173/order.html');
    await page.locator('#designUpload').setInputFiles('files/screenshot.png');
    await page.locator('#instructions').fill('I need it clean and crisp!');
    await page.locator('#quantity').fill('1');
    page.once('dialog', async(dialog) => {
        expect(dialog.message()).toContain('File "screenshot.png" uploaded successfully!');
        dialog.dismiss();
    })
    await page.getByRole('button', {name: 'Place Order'}).click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download receipt'}).click();
    const download = await downloadPromise;
    const downloadPath = `files/${download.suggestedFilename()}`;
    await download.saveAs(downloadPath);
    const fileContent = fs.readFileSync(downloadPath,'utf8');
    console.log(`File Content: ${fileContent}`);
    fs.unlinkSync(downloadPath)
});