import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class AccountPage extends BasePage{
    readonly accountHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.accountHeader = this.page.getByTestId("page-title");
    }
}