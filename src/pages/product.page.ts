import { Locator, Page } from "@playwright/test";
import { Product } from "../models/product.model";
import { HomePage } from "./home.page";
import { formatPrice } from "../utils/data-format";

export class ProductPage extends HomePage {

    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly addProductToCartSuccessMessage: Locator;

    readonly addToWishlistLink: Locator;

    constructor(page: Page) {
        super(page);

        this.addToCartButton = page.locator("//form[@class = 'cart']//button");
        this.productTitle = page.locator("(//h1)[1]");
        this.productPrice = page.locator("(//p[@class = 'price'])[1]");

        this.addProductToCartSuccessMessage = page.locator("//div[@data-type ='success' or contains(@class, 'woocommerce-message')]");

        this.addToWishlistLink = page.locator("//div[@class = 'product-information-inner']//a[contains(@class, 'add_to_wishlist')]");
    }

    async getProduct(): Promise<Product> {
        const title = await this.productTitle.textContent() ?? "";
        const price = await this.productPrice.textContent() ?? "";

        const product = new Product({
            title: title.trim(),
            price: formatPrice(price).toString()
        })
        return product;
    }
}