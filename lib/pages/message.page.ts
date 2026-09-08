import { Locator, Page } from "@playwright/test";

export class MessagePage {
    readonly page: Page;
    readonly table: Locator;
    readonly firstDetailLink: Locator;
    readonly contactForm: Locator;
    readonly messageList: Locator;
    readonly replyList: Locator;
    readonly replyInput: Locator;
    readonly replyButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = this.page.locator('.table');
        this.firstDetailLink = this.page.getByRole('link', { name: 'Details' }).first()
        this.messageList = this.page.locator('div.card').filter({hasText: 'Subject:'})
        this.replyInput = this.page.getByTestId('message');
        this.replyButton = this.page.getByTestId('reply-submit');
        this.replyList = this.page.getByRole('heading', {name: 'Replies'}).locator('+ div.card')
        this.contactForm = this.page.getByRole('link', { name: 'contact form' }).first()
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/account/messages`)
        await this.page.waitForLoadState('load');
        await this.page.waitForURL(/messages/)
    }

}