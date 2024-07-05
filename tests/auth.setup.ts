import { test as setup, expect } from '@playwright/test';
import { userData } from "../test-data/users.json" ;
import {User} from "../helpers/typesHelper";
import {CONFIG} from "../variables.config";

setup('Get authentication token', async ({ request }) => {
    // Grab test user data
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

        //test authenticated request
        expect((await request.get(CONFIG.baseApiHost + 'users/me',
            {headers:
                    {'Authorization': `Bearer ${body.access_token}`}
                }))
            .ok()).toBeTruthy();

        process.env.BEARER_TOKEN = body.access_token;
    } else {
        throw new Error("User login data should be provided in test-data/users.json file");
    }

});