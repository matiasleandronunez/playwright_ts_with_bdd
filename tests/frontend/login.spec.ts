import { expect, test } from '../../fixtures/fixtureBuilder';
import { userData } from "../../test-data/users.json" ;
import { User } from "../../helpers/typesHelper";

test.describe('Login Feature', () => {
    // Clear storage state from authentication setup project
    test.use({ extraHTTPHeaders: {}, storageState: { cookies: [], origins: [] } });

    const regularUser : User | undefined = userData.find(t => t.role === 'user');

    test('When Login with valid user credentials dashboard is displayed', async ({page, homePage, mainMenu, signInPage, accountHomePage}) => {
        if(regularUser === undefined){
            throw new Error('No valid test user data was found');
        }

        await homePage.goto();

        await mainMenu.goSignIn();
        await signInPage.signIn(regularUser);
        await expect(accountHomePage.accountHeader).toHaveText('My account');
    });

});