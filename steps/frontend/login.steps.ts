import { expect, test } from '../fixtureBuilder';
import { userData } from "../../test-data/users.json" ;
import { User } from "../../helpers/typesHelper";
import { createBdd } from 'playwright-bdd';
import path from "node:path";

const { Given, When, Then } = createBdd(test);

const goToHome = Given('I go to the landing page', async ({ homePage }) => {
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

    const authFile = path.join(__dirname, "../../test-data/.auth");
    await accountHomePage.page.request.storageState({ path: authFile });
});

When(/^I sign in with a wrong password$/, async ({ signInPage }) => {
    const regularUser : User | undefined = userData.find(t => t.role === 'user');

    if(regularUser === undefined){
        throw new Error('No valid test user data was found');
    }

    await signInPage.signIn({email: regularUser.email, password: 'someGibberishthatWontWork#$42'});
});

Then(/^I see a login error message displayed$/, async ({ signInPage }) => {
    await expect(signInPage.loginAlert).toHaveText('Invalid email or password');
});

Given(/^I am not logged into the site$/, async ({ homePage }) => {
    await goToHome({homePage});
    await homePage.clearStorage();
});