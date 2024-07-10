import { test as base } from 'playwright-bdd';
import {SignInPage} from "../pages/signInPage";
import {HomePage} from "../pages/homePage";
import {MainMenuComponent, MainMenuComponentDesktop, MainMenuComponentResponsiveMode} from "../pages/mainMenuComponent";
import {AccountPage} from "../pages/accountPage";
import {FilterComponent, FilterComponentDesktop, FilterComponentResponsive} from "../pages/filterComponent";
import {SearchResultsPage} from "../pages/searchResultsPage";
import {DataSchema} from "../helpers/typesHelper";

export class TestContext{
    dataBag : [name: string, data: DataSchema][];

    constructor() {
        this.dataBag = [];
    }

    storeData(name : string, data : DataSchema){
        this.dataBag.push([name, data]);
    };

    getData(key) : DataSchema{
        return this.dataBag.filter(d => d[0] === key)[0][1];
    }
}

// declare the types of your fixtures
interface PageObjects {
    homePage: HomePage;
    signInPage: SignInPage;
    mainMenu: MainMenuComponent;
    accountHomePage: AccountPage;
    filterPanel: FilterComponent;
    searchResultsPage: SearchResultsPage;
}

export type TestOptions = {
    isResponsive: boolean;
};

export type TestConstrains = {
    testContext : TestContext;
}

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<TestOptions & PageObjects & TestConstrains>({
    isResponsive: [true, { option: true }],

    // TEST CONSTRAINS
    testContext: async ({ page }, use) => {
        const testContext = new TestContext();
        await use(testContext);
    },

    // PAGE OBJECTS
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page);
        await use(signInPage);
    },
    mainMenu: async ({ page, isResponsive }, use) => {
        const mainMenu =
            isResponsive ? new MainMenuComponentResponsiveMode(page) : new MainMenuComponentDesktop(page);
        await use(mainMenu);
    },
    filterPanel: async ({ page, isResponsive }, use) => {
        const filterPanel =
            isResponsive ? new FilterComponentResponsive(page) : new FilterComponentDesktop(page);
        await use(filterPanel);
    },
    accountHomePage: async ({ page }, use) => {
        const accountHomePage = new AccountPage(page);
        await use(accountHomePage);
    },
    searchResultsPage: async ({ page }, use) => {
        const searchProductsPage = new SearchResultsPage(page);
        await use(searchProductsPage);
    },
});

export { expect } from '@playwright/test';