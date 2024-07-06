import { expect, test } from '../fixtureBuilder';
import { userData } from "../../test-data/users.json" ;
import { User } from "../../helpers/typesHelper";
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd(test);

Given('I go to the landing page', async ({ homePage }) => {
    await homePage.goto();
});

Given(/^I go to the landing page as a logged user$/, async ({ homePage }) => {
    await homePage.useAuth();
    await homePage.goto();
});

When('I click on the sign in button in the menu', async ({ mainMenu }) => {
    await mainMenu.goSignIn();
});

When('I sign in with a valid user', async ({ signInPage }) => {
    const regularUser : User | undefined = userData.find(t => t.role === 'user');

    if(regularUser === undefined){
        throw new Error('No valid test user data was found');
    }

    await signInPage.signIn(regularUser);
});

Then('I see the user dashboard displayed', async ({ accountHomePage }) => {
    await expect(accountHomePage.accountHeader).toHaveText('My account');
});
