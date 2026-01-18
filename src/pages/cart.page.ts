import { Locator, Page } from "@playwright/test";

export class CartPage {
    static CARTPAGE_URL = "/cart";
    private page: Page;

    readonly quantityInputLocator: Locator;
    readonly productListLocator: Locator;
    readonly updateCartButtonLocator: Locator;
    readonly successMessageLocator: Locator;
    readonly cartTotalLocator: Locator;
    readonly proceedToCheckOutButton: Locator;
    readonly clearCartButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.quantityInputLocator = page.locator("//input[contains(@id, 'quantity')]");
        this.productListLocator = page.locator("//tr[contains(@class, 'woocommerce-cart-form__cart')]");
        this.updateCartButtonLocator = page.getByRole('button', { name: 'Update cart' });
        this.successMessageLocator = page.getByText('Cart updated.');
        this.cartTotalLocator = page.locator("//tr//strong");
        this.proceedToCheckOutButton = page.locator("//a[contains(text(), 'Proceed to checkout')]");
        this.clearCartButton = page.locator("//a[@class = 'clear-cart']");   
   }

    async goto() {
        await this.page.goto(CartPage.CARTPAGE_URL);
        await this.page.waitForLoadState();
    }

    async fillProductQuantityTextbox(productTilte: string, quantity: string) {
        await this.productListLocator
            .filter({ hasText: productTilte })
            .locator(this.quantityInputLocator)
            .fill(quantity);
        await this.page.click('body');
    }

    async updateProductQuantity(productTitle: string, quantity: string){
        await this.fillProductQuantityTextbox(productTitle, quantity);
        await this.updateCartButtonLocator.click();
    }

    async clickCheckoutButton(){
        await this.proceedToCheckOutButton.click();
        await this.page.waitForLoadState();
    }
}