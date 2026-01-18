import { test, expect } from "./test-fixtures";

test.describe('Testcases involving CartPage', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_10.Verify Product Can Be Added to Wishlist', async ({ 
        shopPage,
        productPage,
        wishlistPage
    }) => {

        let productTitles = ['AirPods'];

        //1. Navigate to Shop page
        await shopPage.goto();

        //2. Find a product
        await shopPage.searchProduct('All categories', productTitles[0]);

        //3. Click wishlist icon
        await productPage.addToWishlistLink.click();

        //4. Verify wishlist update
        //Checkpoint: Wishlist count should increase
        await expect.soft(wishlistPage.wishlistCountLocator).toHaveText('1');

        //5. Navigate to Wishlist page
        await wishlistPage.goto();
        //Checkpoints:
        //- Product should be added to wishlist
        //- Product should appear in wishlist page
        await expect.soft(wishlistPage.wishlistTable.nth(0)).toContainText(productTitles[0]);
    });
});
