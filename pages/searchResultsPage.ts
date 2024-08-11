import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import {CONFIG} from "../variables.config";

export class SearchResultsPage extends BasePage{
    readonly pagination : Locator;

    constructor(page: Page) {
        super(page);
        this.pagination = this.page.locator('app-pagination');

    }

    async productCard(productName : string){
        return this.page.getByTestId('product-name').filter({hasText: new RegExp(`^\\s*${productName}\\s*$`)});
    }

    async mockProductsAPIUnavailable(){
        await this.page.route(`${CONFIG.baseApiHost}products`, async route => {
            await route.fulfill({
                status: 503,
                contentType: 'text/plain',
                body: 'Service Unavailable'
            });
        });
    }
}