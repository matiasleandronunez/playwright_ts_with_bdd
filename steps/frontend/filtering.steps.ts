import { expect, test } from '../fixtureBuilder';
import { createBdd } from 'playwright-bdd';

const { When, Then } = createBdd(test);

export const searchByNameStep = When(/^I search product (.*) by its name$/, async ({ filterPanel }, product: string) => {
    await filterPanel.searchByProductName(product);
});

Then(/^I see the product (.*) is displayed within the search results$/, async ({ searchResultsPage }, product: string) => {
    await expect(await searchResultsPage.productCard(product)).toBeVisible({timeout: 5000});
});

When(/^I filter by the price range around (.*)$/, async ({ filterPanel }, price: string) => {
    await filterPanel.narrowPriceAround(Number(price));
});