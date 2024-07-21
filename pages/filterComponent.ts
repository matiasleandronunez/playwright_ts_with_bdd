import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import {CONFIG} from "../variables.config";

export class FilterComponent extends BasePage{
    readonly handToolsCb: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly sliderPlaceholder: Locator;
    readonly sliderMin: Locator;
    readonly sliderMax: Locator;

    constructor(page: Page) {
        super(page);
        this.handToolsCb = this.page.getByText('Hand Tools');
        this.searchButton = this.page.getByTestId('search-submit');
        this.searchInput = this.page.getByTestId('search-query');
        this.searchButton = this.page.getByTestId('search-submit');
        this.sliderMin = this.page.locator('span.ngx-slider-pointer-min');
        this.sliderMax = this.page.locator('span.ngx-slider-pointer-max');
        this.sliderPlaceholder = this.page.locator('ngx-slider.ngx-slider');
    }

    async searchByProductName(productName : string){
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async selectAllHandTools(){
        await this.handToolsCb.click();
    }

    async narrowPriceAround(price : number, tolerance = 5) {
        //Get min and max values at both ends of the slider
        let minPrice: number = Number(await this.sliderMin.getAttribute('aria-valuemin'));
        let maxPrice: number = Number(await this.sliderMax.getAttribute('aria-valuemax'));

        //Get value in which slider markers are, these are available in an attribute of the element on load
        let currentMinPrice: number = Number(await this.sliderMin.getAttribute('aria-valuenow'));
        let currentMaxPrice: number = Number(await this.sliderMax.getAttribute('aria-valuenow'));

        //Establish the price target to move the sliders and tolerance. f.e. Target $10+-5 tolerance is range of
        // $5 to $15. If target +- tolerance over or under flows the absolute min or max, set as absolute min or max.
        let targetMinPrice: number = price - tolerance < minPrice ? minPrice : price - tolerance;
        let targetMaxPrice: number = price + tolerance > maxPrice ? maxPrice : price + tolerance;

        //Wait for slider element since we will force the hover event, we need to make sure the slider is visible before.
        await this.sliderPlaceholder.isVisible();

        //Get the box size of the picker elements. Both are the same in this site, but could be not.
        let sliderPickerMaxBox = await this.sliderMax.boundingBox();
        let sliderPickerMinBox = await this.sliderMin.boundingBox();

        //The Slid able width doesn't match the whole width of the container element. Instead  it is the
        // total width minus each the semicircle of the picker. So total width - 2 * picker radio.
        let totalSliderWidth = (await this.sliderPlaceholder.boundingBox())?.width - sliderPickerMinBox?.width;

        //Calculate the offset each element should ber moved to reach the target price. It'll be negative if it has to move left.
        let minSliderOffset = Math.round(totalSliderWidth / maxPrice * targetMinPrice - totalSliderWidth / maxPrice * currentMinPrice);
        let maxSliderOffset = Math.round(totalSliderWidth / maxPrice * targetMaxPrice - totalSliderWidth / maxPrice * currentMaxPrice);

        //Hover over right side of the maximum slider picker and move offset
        await this.sliderMax.hover({force: true, position: {x: sliderPickerMaxBox?.width - 1, y: sliderPickerMaxBox?.height / 2}});
        await this.page.mouse.down();
        await this.page.mouse.move((sliderPickerMaxBox?.x + sliderPickerMaxBox?.width / 2) + maxSliderOffset, sliderPickerMaxBox?.y + sliderPickerMaxBox?.height / 2);
        await this.page.mouse.up();

        //Hover over left side of the minimum slider picker and move offset
        await this.sliderMin.hover({force: true, position: {x: 1, y: sliderPickerMinBox?.height / 2}});
        await this.page.mouse.down();
        await this.page.mouse.move((sliderPickerMinBox?.x + sliderPickerMinBox?.width / 2) + minSliderOffset, sliderPickerMinBox?.y + sliderPickerMinBox?.height / 2)
        await this.page.mouse.up();
    }

    async mockProductSearchAPIUnavailable(){
        await this.page.route(`${CONFIG.baseApiHost}products/search`, async route => {
            await route.fulfill({
                status: 503,
                contentType: 'text/plain',
                body: 'Service Unavailable'
            });
        });
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

    async narrowPriceAround(price : number, tolerance = 5){
        await this.expandFilters();
        await super.narrowPriceAround(price, tolerance);
    }
}