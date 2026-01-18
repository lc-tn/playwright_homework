import { Locator, Page } from "@playwright/test";

export class MailPage{
    private page: Page;

    static MAILPAGE_URL = 'https://www.guerrillamail.com/inbox';

    readonly editMailButton: Locator;
    readonly editMailTextbox: Locator;
    readonly setMailButton: Locator;
    readonly email: Locator;
    readonly setPasswordLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.editMailButton = page.locator("//span[@title = 'Click to Edit']");
        this.editMailTextbox = page.locator("//span[@title = 'Click to Edit']/input");
        this.setMailButton = page.locator("//button[text() = 'Set']");
        this.email = page.locator("//td[contains(text(), 'Your TestArchitect Sample Website')]");
        this.setPasswordLink = page.locator("//a[contains(text(), 'Click here to set your new password.')]");
    }

    async goto() {
        await this.page.goto(MailPage.MAILPAGE_URL);
        await this.page.waitForLoadState();
    }

    async clickSetPasswordLink(email: string){
        await this.editMailButton.click();
        await this.editMailTextbox.fill(email);
        await this.setMailButton.click();
        await this.email.waitFor({state: 'visible'});
        await this.email.click();
        const href = await this.setPasswordLink.getAttribute('href') ?? ""; 
        await this.page.goto(href);
        await this.page.waitForLoadState();
    }
}