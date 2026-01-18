import { test, expect } from "./test-fixtures";

test.describe('Testcases in HomePage', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_04.Verify Product Can Be Added to Shopping Cart', async ({
        shopPage,
        productPage
    }) => {

        let initialCartQuantity = await shopPage.getCartQuanity();
        let initialCartTotal = await shopPage.getCartTotal();

        //1. Navigate to Shop page
        await shopPage.goto();

        //2. Select any available product
        await shopPage.productListLocator.nth(0).click();

        //3. Click "Add to Cart" button
        await productPage.addToCartButton.click();

        const product = await productPage.getProduct();
        const expectCartTotal = initialCartTotal + Number(product.price);

        //4. Verify cart notification
        //Checkpoint: - Success message should appear
        await expect.soft(productPage.addProductToCartSuccessMessage).toBeVisible();

        //5. Check cart icon update
        //Checkpoints:
        //- Product should be added to cart
        //- Cart count should increase
        //- Cart total should update
        await expect.soft(shopPage.cartQuantityLocator).toContainText((++initialCartQuantity).toString());
        await expect.soft(shopPage.cartTotalLocator).toContainText(expectCartTotal.toString());
    });
});

