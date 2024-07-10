import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtureBuilder';
import {CONFIG} from "../../variables.config";
import {getRandomItem} from "../../helpers/commonsHelper";
import {Product} from "../../helpers/typesHelper";
import { productData } from "../../test-data/products.json" ;

const { Given, When, Then } = createBdd(test);

Given(/^I request a product to the Product API querying by brand$/, async ({ testContext, request }) => {

    const sampleProduct : Product = getRandomItem<Product>(productData);
    testContext.storeData('product', sampleProduct);

    const response = await request.get(CONFIG.baseApiHost + 'products',
                                    {
                                    headers: {
                                        'accept': 'application/json',
                                    },
                                    params: {
                                        'by_brand': sampleProduct.brand.id,
                                    }
    });

});


Then(/^I find the requested product within the Product API response$/, async ({ testContext }) => {

});