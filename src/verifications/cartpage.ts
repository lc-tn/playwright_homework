import { expect, Page } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { Product } from "../models/product.model";
import { ShopPage } from "../pages/shop.page";
import { ShopPageBusiness } from "../businesses/shoppage";

export class CartPageVerification {
    private page: Page;
    private cartPage: CartPage;

    constructor(page: Page) {
        this.page = page;
        this.cartPage = new CartPage(page);
    }

    async checkCartUpdate(product: Product) {
        await expect.soft(this.cartPage.quantityInputLocator.nth(0)).toHaveValue("2");
        
        const expectedTotal = Number(product.price) * 2;
        await expect.soft(this.cartPage.cartTotalLocator).toContainText(expectedTotal.toString());
    }
}