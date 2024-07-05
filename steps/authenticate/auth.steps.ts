import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtureBuilder';
import {User} from "../../helpers/typesHelper";
import {CONFIG} from "../../variables.config";
import { userData } from "../../test-data/users.json" ;


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

Then('I get a valid authorization token', async ({ request }, text: string) => {
    //test authenticated request
    expect((await request.get(CONFIG.baseApiHost + 'users/me',
        {headers:
                {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`}
        }))
        .ok()).toBeTruthy();
});