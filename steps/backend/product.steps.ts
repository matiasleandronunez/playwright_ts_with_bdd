import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtureBuilder';
import {CONFIG} from "../../variables.config";
import {extractTestCaseTagID, getRandomItem} from "../../helpers/commonsHelper";
import {Brand, Category, Product} from "../../helpers/typesHelper";
import { productData } from "../../test-data/products.json" ;

const { Given, Then } = createBdd(test);

Given(/^I request a product to the Product API querying by brand$/, async ({ testContext, request, $tags }) => {

    const sampleProduct : Product = getRandomItem<Product>(productData);
    testContext.storeData('product', sampleProduct);

    //Brand IDs dynamically change
    const respAllBrands = await request.get(CONFIG.baseApiHost + 'brands',
        {
            headers: {
                'accept': 'application/json',
            },
        });

    const brands : Brand[] = await respAllBrands.json();
    const brandId : string = brands.filter(b => b.slug === sampleProduct.brand.slug)[0].id;

    //Retrieve Product
    console.log('\x1b[36m%s\x1b[0m',`\t[${extractTestCaseTagID($tags)}] Using test product: ${sampleProduct.name} ( ${sampleProduct.id} )`);
    const response = await request.get(CONFIG.baseApiHost + 'products',
                                    {
                                    headers: {
                                        'accept': 'application/json',
                                    },
                                    params: {
                                        'by_brand': brandId,
                                    }
    });

    await expect(await response.status()).toBe(200);

    testContext.saveResponse(response);
});

Given(/^I request a product to the Product API querying by category$/, async ({ testContext, request, $tags }) => {

    const sampleProduct : Product = getRandomItem<Product>(productData);
    testContext.storeData('product', sampleProduct);

    //Category IDs dynamically change
    const respAllCategories = await request.get(CONFIG.baseApiHost + 'categories',
        {
            headers: {
                'accept': 'application/json',
            },
        });

    const categories : Category[] = await respAllCategories.json();
    const categoryId : string = categories.filter(c => c.slug === sampleProduct.category.slug)[0].id;

    //Retrieve Product
    console.log('\x1b[36m%s\x1b[0m',`\t[${extractTestCaseTagID($tags)}] Using test product: ${sampleProduct.name} ( ${sampleProduct.id} )`);
    const response = await request.get(CONFIG.baseApiHost + 'products',
        {
            headers: {
                'accept': 'application/json',
            },
            params: {
                'by_category': categoryId,
            }
        });

    await expect(await response.status()).toBe(200);

    testContext.saveResponse(response);
});

Given(/^I request a product to the Product API querying by product id$/, async ({ testContext, request, $tags }) => {
    const sampleProduct : Product = getRandomItem<Product>(productData);
    testContext.storeData('product', sampleProduct);

    //Retrieve Product
    console.log('\x1b[36m%s\x1b[0m',`\t[${extractTestCaseTagID($tags)}] Using test product: ${sampleProduct.name} ( ${sampleProduct.id} )`);
    const response = await request.get(CONFIG.baseApiHost + `products/${sampleProduct.id}`,
        {
            headers: {
                'accept': 'application/json',
            }
        });

    await expect(await response.status()).toBe(200);

    testContext.saveResponse(response);
});

Given(/^I request a product to the Product API querying with a non existing product id$/, async ({ testContext, request }) => {

    const response = await request.get(CONFIG.baseApiHost + `products/000000000000`,
        {
            headers: {
                'accept': 'application/json',
            }
        });

    testContext.saveResponse(response);
});

Then(/^I find the requested product within the Product API response$/, async ({ testContext }) => {
    const testProduct = testContext.getData('product');
    const jsonResp = await (await testContext.retrieveResponse().json());

    //Check if response contains array of products or just a single product
    const responseResult : Product = (jsonResp.data !== undefined) ?
        jsonResp.data.filter(d => d.name === testProduct.name)[0] : jsonResp;

    await expect(responseResult).toBeDefined();
    await expect(responseResult.name).toEqual(testProduct.name);
    await expect(responseResult.description).toEqual(testProduct.description);
    await expect(responseResult.price).toEqual(testProduct.price);
    await expect(responseResult.is_location_offer).toEqual(testProduct.is_location_offer);
    await expect(responseResult.is_rental).toEqual(testProduct.is_rental);
});

Then(/^I get an item not found response from the Product API response$/, async ({ testContext }) => {
    const respStatus = await ((await testContext.retrieveResponse()).status());

    await expect(respStatus).toBe(404);
});