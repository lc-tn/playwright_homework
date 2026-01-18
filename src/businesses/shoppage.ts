import { Page } from "@playwright/test";
import { ProductPage } from "../pages/product.page";

export class ShopPageBusiness {
    private productPage;

    constructor(page: Page) {
        this.productPage = new ProductPage(page);
    }

    async addProductsToCart(productNames: string[]){
        for (const productName of productNames){
            await this.productPage.searchProduct('All categories', productName);
            await this.productPage.addToCartButton.click();
            await this.productPage.addProductToCartSuccessMessage.waitFor({state: 'visible'});
        }       
    }
}