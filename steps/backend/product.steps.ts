import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtureBuilder';
import {CONFIG} from "../../variables.config";
import {extractTestCaseTagID, getRandomItem} from "../../helpers/commonsHelper";
import {Brand, Category, Product} from "../../helpers/typesHelper";
import { productData } from "../../test-data/products.json" ;

const { Given, When, Then } = createBdd(test);

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
    console.log(`[${extractTestCaseTagID($tags)}] Using test product: ${sampleProduct.name} ( ${sampleProduct.id} )`);
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
    console.log(`[${extractTestCaseTagID($tags)}] Using test product: ${sampleProduct.name} ( ${sampleProduct.id} )`);
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


Then(/^I find the requested product within the Product API response$/, async ({ testContext }) => {
    const testProduct = testContext.getData('product');
    const responseResults = (await (await testContext.retrieveResponse().json()).data).filter(d => d.name === testProduct.name);

    await expect(responseResults[0]).toBeDefined();
    await expect(responseResults[0].name).toEqual(testProduct.name);
});