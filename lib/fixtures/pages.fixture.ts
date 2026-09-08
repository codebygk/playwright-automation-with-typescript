import { AccountPage } from "@pages/account.page";
import { ContactPage } from "@pages/contact.page";
import { LoginPage } from "@pages/login.page";
import { MessagePage } from "@pages/message.page";
import { test as baseTest } from "@playwright/test";


type MyPage = {
    loginPage: LoginPage
    accountPage: AccountPage
    contactPage: ContactPage
    messagePage: MessagePage
}

export const test = baseTest.extend<MyPage>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
        messagePage: async ({ page }, use) => {
        await use(new MessagePage(page));
    }
})

export { expect } from '@playwright/test'