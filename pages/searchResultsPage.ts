import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class SearchResultsPage extends BasePage{
    constructor(page: Page) {
        super(page);
    }

    async productCard(productName : string){
        return this.page.getByTestId('product-name').filter({hasText: new RegExp(`^\\s*${productName}\\s*$`)});
    }
}