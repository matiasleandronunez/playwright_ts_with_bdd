import { expect, test } from '../fixtureBuilder';
import {createBdd} from "playwright-bdd";
import { productData } from "../../test-data/products.json" ;
import {Product} from "../../helpers/typesHelper";
import {getRandomItem} from "../../helpers/commonsHelper";
import {searchByNameStep} from "../frontend/filtering.steps"
const { When, Then } = createBdd(test);


When(/^I search for any product with the product API unavailable$/, async ({ filterPanel }) => {
    await filterPanel.mockProductSearchAPIUnavailable();

    const sampleProduct : Product = getRandomItem<Product>(productData);

    await searchByNameStep({filterPanel}, sampleProduct.name);
});

Then(/^I see no filtering has occurred$/, async ({ searchResultsPage }) => {
    //Given after filtering we will rarely have more than 1 page of items, using the existence of pagination
    //to verify that results are currently showing the products unfiltered.
    await expect(searchResultsPage.pagination).toBeVisible();
});