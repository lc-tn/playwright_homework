import { Locator, Page } from "@playwright/test";
import { HomePage } from "./home.page";

export class MyAccountPage extends HomePage {

    readonly emailLoginTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;

    readonly emailRegisterTextbox: Locator;
    readonly registerButton: Locator;

    readonly newPasswordTextbox: Locator;
    readonly reEnterPasswordTextbox: Locator;
    readonly saveButton: Locator;

    readonly logoutLink: Locator;

    constructor(page: Page){
        super(page);
        this.emailLoginTextbox = page.getByRole('textbox', { name: 'Username or email address *' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.emailRegisterTextbox = page.getByRole('textbox', { name: 'Email address *', exact: true });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.newPasswordTextbox = page.locator("//input[@id = 'password_1']");
        this.reEnterPasswordTextbox = page.locator("//input[@id = 'password_2']");
        this.saveButton = page.locator("//button[@value = 'Save']");
        this.logoutLink = page.locator("//a[contains(text(), 'Logout')]");
    }

    async setPassword(password: string){
        await this.newPasswordTextbox.fill(password);
        await this.reEnterPasswordTextbox.fill(password);
        await this.saveButton.click();
    }

    async login(email: string, password: string){
        await this.loginSignupLink.click();
        await this.emailLoginTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState();
    }

    async signup(email: string){
        await this.loginSignupLink.click();
        await this.emailRegisterTextbox.fill(email);
        await this.registerButton.click();
        await this.page.waitForLoadState();
    }
}