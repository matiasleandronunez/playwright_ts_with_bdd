import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import {User} from "../helpers/typesHelper";

export class SignInPage extends BasePage{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.getByTestId('email');
        this.passwordInput = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-submit');
        this.loginAlert = this.page.getByTestId('login-error');
    }

    async signIn(user: Pick<User, 'email'|'password'>){
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }
}