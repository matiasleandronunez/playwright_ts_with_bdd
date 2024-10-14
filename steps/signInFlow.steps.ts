import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtureBuilder';
import {User} from "../helpers/typesHelper";
import {CONFIG} from "../variables.config";
import { userData } from "../test-data/users.json" ;
import path from "node:path";


const { Given, When, Then } = createBdd(test);

Given('I sign into the site through the API with a valid user', async ({ request }) => {
    const regularUser : User | undefined = userData.find(t => t.role === 'user');

    // Type check to rule undefined out
    if(regularUser !== undefined){
        // Send authentication request
        const response = await request.post(CONFIG.baseApiHost + 'users/login', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                'email': regularUser.email,
                'password': regularUser.password
            }
        });

        //get and narrow down bearer token
        const body : {access_token: string} = await response.json();

        //store in env var
        process.env.BEARER_TOKEN = body.access_token;
    } else {
        throw new Error("User login data should be provided in test-data/users.json file");
    }
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