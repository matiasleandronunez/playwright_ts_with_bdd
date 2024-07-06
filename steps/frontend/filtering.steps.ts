import { expect, test } from '../fixtureBuilder';
import { userData } from "../../test-data/users.json" ;
import { User } from "../../helpers/typesHelper";
import { createBdd } from 'playwright-bdd';

const { When, Then } = createBdd(test);

When(/^I search product (.*) by its name$/, async ({ filterPanel }, product: string) => {
    await filterPanel.searchByProductName(product);
});

Then(/^I see the product (.*) is displayed within the search results$/, async ({ searchResultsPage }, product: string) => {
    await expect(await searchResultsPage.productCard(product)).toBeVisible({timeout: 5000});
});
