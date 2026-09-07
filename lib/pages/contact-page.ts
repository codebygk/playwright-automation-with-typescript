import { Locator, Page } from "@playwright/test";

type Subject = 'Customer service' | 'Webmaster';

export class ContactPage {
    readonly page: Page;
    readonly subjectDropdown: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;
    readonly successAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subjectDropdown = page.getByTestId('subject');
        this.messageInput = page.getByTestId('message');
        this.sendButton = page.getByTestId('contact-submit')
        this.successAlert = page.locator('.alert-success')
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/contact`);
        await this.page.waitForLoadState('load');
        await this.page.waitForURL(/contact/)
    }

    async submitContactForm(subject: Subject, message: string) {
        await this.subjectDropdown.selectOption(subject);
        await this.messageInput.fill(message);
        await this.sendButton.click();
    }

}