import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class SignInPage extends BasePage{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.getByTestId('email');
        this.passwordInput = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-submit');
    }

    async signIn(user: {email : string, password : string}){
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }
}