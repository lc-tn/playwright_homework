import { expect, Page } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";

export class CheckoutPageVerification {
    private page: Page;
    private checkoutPage;

    constructor(page: Page) {
        this.page = page;
        this.checkoutPage = new CheckoutPage(this.page);
    }

    async checkHighlightMissingField() {
        await expect.soft(this.checkoutPage.firstnameInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this.checkoutPage.lastnameInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        // await expect.soft(this.checkoutPage._countryInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this.checkoutPage.addressInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this.checkoutPage.cityInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        // await expect.soft(this.checkoutPage._stateInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this.checkoutPage.zipCodeInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this.checkoutPage.phoneInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
        await expect.soft(this.checkoutPage.emailInput.locator("xpath=./ancestor::p")).toContainClass("woocommerce-invalid");
    }
}