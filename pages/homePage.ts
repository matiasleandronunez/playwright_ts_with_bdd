import { type Locator, type Page } from '@playwright/test';
import { BasePage} from "./basePage";
import {priceStringToFloat} from "../helpers/commonsHelper";

export class HomePage extends BasePage{

    constructor(page: Page) {
        super(page);
    }
}