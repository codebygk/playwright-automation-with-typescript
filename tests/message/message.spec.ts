import { sendMessage } from '@datafactory/message';
import { registerUser } from '@datafactory/register';
import { test, expect } from '@fixtures/base.fixture';

test('Customer reply to a message', async ({ context, loginPage, accountPage, contactPage, messagePage }) => {
    const email = `test${Date.now()}@practicesoftwaretesting.com`;
    const password = 'krishnaPV@01';
    const messageUserAuthFilePath = '.auth/messageUser.json';
    const name = 'TestUser One'
    const subject = 'Customer service'
    const message = 'This is a really long message text which is longer than 50 characters to be entered in the contact form.'

    await test.step('Register and login as new user', async () => {
    await registerUser(email, password);
    // await registerUser(email, password);    
    await loginPage.navigate();
    await loginPage.login(email, password);
    await expect(accountPage.navMenu).toContainText('TestUser One');
    // Save cookies
    await context.storageState({path: messageUserAuthFilePath})
    })

    test.step.skip('Create new message via ui', async () => {
    await contactPage.navigate();
    await contactPage.submitContactForm('Customer service', message);
    await expect(contactPage.successAlert).toContainText('Thanks for your message! We will contact you shortly.')
    })

    await test.step('Create new message via api using datafactory', async () => {
        await sendMessage(name, subject, message, messageUserAuthFilePath)
    })

    await test.step('Reply to message', async () => {
    await messagePage.navigate();
    await expect(messagePage.table).toContainText(subject);
    await expect(messagePage.table).toContainText(message.substring(0, 25));
    await messagePage.firstDetailLink.click();
    const replyMessage = 'Reply Now';
    await messagePage.replyInput.fill(replyMessage);
    await messagePage.replyButton.click();
    await expect(messagePage.replyList).toContainText(replyMessage);

    })

});