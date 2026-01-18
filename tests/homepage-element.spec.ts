import { test } from "./test-fixtures";

test.describe('Testcases for Homepage Elements', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('TC_01.Verify Homepage Elements Are Visible', async ({ homePage, homePageVerification }) => {

        let phoneNumber = '(+1800) 000 8808';
        let address = '1730 S. Amphlett Blvd. Suite 200, San Mateo, CA';
        let socialMedias = ['Pinterest', 'Instagram', 'Twitter', 'Facebook'];
        let mainNavigation = ['About Us', 'Shop', 'Offers', 'Blog', 'Contact Us', 'Home'];

        //2. Close popup notifications
        await homePage.closeNotificationPopup();

        //3. Accept cookie notice
        await homePage.clickAcceptCookie();

        //Checkpoints:
        //- All mentioned elements should be visible
        //- All links should be clickable
        //- Header information should be correctly displayed

        //4. Verify header section elements
        await homePageVerification.checkHeaderSection(phoneNumber, address);

        //5. Verify top navigation elements:
        await homePageVerification.checkLoginSignupLink();
        await homePageVerification.checkSocialMediaLinks(socialMedias);

        //6. Verify main navigation menu:
        await homePageVerification.checkMainNavigationMenu(mainNavigation);
    });
});