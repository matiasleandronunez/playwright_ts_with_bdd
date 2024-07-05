import { test as base } from 'playwright-bdd';
import {SignInPage} from "../pages/signInPage";
import {HomePage} from "../pages/homePage";
import {MainMenuComponent, MainMenuComponentDesktop, MainMenuComponentResponsiveMode} from "../pages/mainMenuComponent";
import {AccountPage} from "../pages/accountPage";

// declare the types of your fixtures
interface PageObjects {
    homePage: HomePage;
    signInPage: SignInPage;
    mainMenu: MainMenuComponent;
    accountHomePage: AccountPage;
}

export type TestOptions = {
    isResponsive: boolean;
};

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<TestOptions & PageObjects>({
    isResponsive: [true, { option: true }],

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
    accountHomePage: async ({ page }, use) => {
        const accountHomePage = new AccountPage(page);
        await use(accountHomePage);
    },
});

export { expect } from '@playwright/test';