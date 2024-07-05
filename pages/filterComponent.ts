import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class FilterComponent extends BasePage{
    readonly handToolsCb: Locator;

    constructor(page: Page) {
        super(page);
        this.handToolsCb = this.page.getByText('Hand Tools');
    }

    async selectAllHandTools(){
        await this.handToolsCb.click();
    }
}
