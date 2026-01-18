import { test, expect } from "./test-fixtures";

test.describe('Testcases for Search Product', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_02.Verify Product Search Functionality Works', async ({
        page,
        homePage,
        shopPageVerification,
    }) => {

        let keyword = "camera";
        let category = "All categories";

        //2. Close popup notifications
        await homePage.closeNotificationPopup();

        //3. Accept cookie notice
        await homePage.clickAcceptCookie();

        //4. Locate the search bar in the header
        //5. Click on the category dropdown
        //6. Select "All categories"
        //7. Enter "camera" in the search field
        //8. Click the search button
        await homePage.searchProduct(category, keyword);

        //9. Observe search results page
        //Checkpoints: 
        //-Search results should load
        await shopPageVerification.checkSearchResultTitle(keyword);

        //-URL should contain the search term "s=watch"
        await expect(page).toHaveURL(new RegExp(`s=${keyword}`));

        //-Products related to "camera" should be displayed
        await shopPageVerification.checkSearchProductByName(keyword);
    });
});