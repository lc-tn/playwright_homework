import { expect, Locator, Page } from "@playwright/test";
import { BillingDetail } from "../models/billing-details.model";

export class CheckoutPage {
    static CHECKOUTPAGE_URL = "/checkout";
    private page: Page;

    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly countryInput: Locator;
    readonly countryOption: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly stateOption: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly placeOrderButton: Locator;
    readonly errorMessage: Locator;

    //Payment methods
    readonly directBankTransfer: Locator;
    readonly checkPayments: Locator;
    readonly cashOnDeliveryOption: Locator;
    readonly checkoutSuccessMessage: Locator;


    readonly orderInformation: Locator;
    readonly orderNumber: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstnameInput = page.locator("//input[@id = 'billing_first_name']");
        this.lastnameInput = page.locator("//input[@id = 'billing_last_name']");
        this.countryInput = page.locator("//select[@id = 'billing_country']");
        this.countryOption = page.locator("//li[contains(@id, 'select2-billing_country')]");
        this.addressInput = page.locator("//input[@id = 'billing_address_1']");
        this.cityInput = page.locator("//input[@id = 'billing_city']");
        this.stateInput = page.locator("//select[@id = 'billing_state']");
        this.stateOption = page.locator("//li[contains(@id, 'select2-billing_state')]");
        this.zipCodeInput = page.locator("//input[@id = 'billing_postcode']");
        this.phoneInput = page.locator("//input[@id = 'billing_phone']");
        this.emailInput = page.locator("//input[@id = 'billing_email']");
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
        this.errorMessage = page.locator("//ul[@role = 'alert']");

        //Payment methods
        this.directBankTransfer = page.locator("//input[@id = 'payment_method_bacs']");
        this.checkPayments = page.locator("//input[@id = 'payment_method_cheque']");
        this.cashOnDeliveryOption = page.locator("//input[@id = 'payment_method_cod']");


        this.checkoutSuccessMessage = page.locator("//p[contains(@class, 'woocommerce-notice--success')]");
        this.orderInformation = page.locator("//div[@class = 'woocommerce-order']")
        this.orderNumber = page.locator("//li[contains(text(), 'Order number')]/strong");
    }

    async goto() {
        await this.page.goto(CheckoutPage.CHECKOUTPAGE_URL);
        await this.page.waitForLoadState();
    }

    async fillBillingDetail(billingDetail: BillingDetail) {
        await this.firstnameInput.fill(billingDetail.firstname);
        await this.lastnameInput.fill(billingDetail.lastname);
        billingDetail.country && 
            await this.countryInput.selectOption(billingDetail.country);
        await this.addressInput.fill(billingDetail.address);
        await this.cityInput.fill(billingDetail.city);
        billingDetail.state &&
            await this.stateInput.selectOption(billingDetail.state),
        await this.zipCodeInput.fill(billingDetail.zipCode);
        await this.phoneInput.fill(billingDetail.phone);
        await this.emailInput.fill(billingDetail.email);
    }

    async choosePaymentMethod(paymentMethod: string) {
        switch (paymentMethod) {
            case 'direct bank transfer':
                await this.directBankTransfer.click();
                break;
            case 'check payments':
                await this.checkPayments.click();
                break;
            case 'cash on delivery':
                await this.cashOnDeliveryOption.click();
                break;
            default:
                throw new Error(`Payment method ${paymentMethod} is not supported.`);
        }
    }
}