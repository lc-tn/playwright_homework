import { Locator, Page } from "@playwright/test";
import { HomePage } from "./home.page";

export class WishlistPage extends HomePage {
    static WISHLIST_PAGE_URL = "/wishlist";

    readonly wishlistTable : Locator;

    constructor(page: Page) {
        super(page);

        this.wishlistTable = page.locator("//table[contains(@class, 'wishlist_table')]//td");
    }

    async goto() {
        await this.page.goto(WishlistPage.WISHLIST_PAGE_URL);
        await this.page.waitForLoadState();
    }
}