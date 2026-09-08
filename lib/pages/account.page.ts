import { type Page, type Locator } from "@playwright/test";

export class AccountPage {
    readonly page: Page;
    readonly navMenu: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = this.page.getByTestId('nav-menu');
        this.pageTitle = this.page.getByTestId('page-title');
    }

    async goto() {
        this.page.goto(`${process.env.BASE_URL}/account`);
    }
}