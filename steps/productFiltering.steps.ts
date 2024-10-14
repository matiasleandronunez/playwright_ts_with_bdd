import { expect, test } from '../fixtures/fixtureBuilder';
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

Then(/^I see no filtering has occurred$/, async ({ searchResultsPage }) => {
    //Given after filtering we will rarely have more than 1 page of items, using the existence of pagination
    //to verify that results are currently showing the products unfiltered.
    await expect(searchResultsPage.pagination).toBeVisible();
});