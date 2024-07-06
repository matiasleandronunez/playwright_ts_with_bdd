import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";

export class FilterComponent extends BasePage{
    readonly handToolsCb: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page);
        this.handToolsCb = this.page.getByText('Hand Tools');
        this.searchButton = this.page.getByTestId('search-submit');
        this.searchInput = this.page.getByTestId('search-query');
        this.searchButton = this.page.getByTestId('search-submit');
    }

    async searchByProductName(productName : string){
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async selectAllHandTools(){
        await this.handToolsCb.click();
    }
}

export class FilterComponentDesktop extends FilterComponent{
    constructor(page: Page) {
        super(page);
    }

}

export class FilterComponentResponsive extends FilterComponent{
    readonly expandFiltersButton: Locator;

    constructor(page: Page) {
        super(page);
        this.expandFiltersButton = this.page.locator("a[aria-controls='collapseExample']");
    }

    async expandFilters(){
        if(await this.searchButton.isHidden()){
            await this.expandFiltersButton.click();
            await this.searchButton.isVisible();
        }
    }

    async selectAllHandTools(){
        await this.expandFilters();
        await super.selectAllHandTools();
    }

    async searchByProductName(productName : string){
        await this.expandFilters();
        await super.searchByProductName(productName);
    }
}