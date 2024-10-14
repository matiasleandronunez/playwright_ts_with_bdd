import { test } from '../fixtures/fixtureBuilder';
import { createBdd } from 'playwright-bdd';

const { Given } = createBdd(test);

Given('I go to the landing page', async ({ homePage }) => {
    await homePage.goto();
});
