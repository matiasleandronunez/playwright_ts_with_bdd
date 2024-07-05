import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class MainMenuComponent extends BasePage{
    readonly homeLink: Locator;
    readonly signInLink: Locator;

    protected constructor(page: Page) {
        super(page);
        this.homeLink = this.page.getByTestId('nav-home');
        this.signInLink = this.page.getByTestId('nav-sign-in');
    }

    async goToHome(){
        await this.homeLink.click();
    }

    async goSignIn(){
        await this.signInLink.click();
    }
}


export class MainMenuComponentDesktop extends MainMenuComponent{
    constructor(page: Page) {
        super(page);
    }
}

export class MainMenuComponentResponsiveMode extends MainMenuComponent{
    readonly hamburgerButton: Locator;

    constructor(page: Page) {
        super(page);
        this.hamburgerButton = this.page.locator('button.navbar-toggler');
    }

    async goToHome(){
        await this.hamburgerButton.click();
        await this.homeLink.click();
    }

    async goSignIn(){
        await this.hamburgerButton.click();
        await this.signInLink.click();
    }
}