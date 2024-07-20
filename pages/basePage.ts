import { type Page } from '@playwright/test';
import { CONFIG} from "../variables.config";

export class BasePage{
    readonly page: Page;

    constructor(page: Page, authenticate = true) {
        this.page = page;
    }

    async useAuth(){
        if(process.env.BEARER_TOKEN !== undefined){
            await this.page.setExtraHTTPHeaders({'Authorization': `Bearer ${process.env.BEARER_TOKEN}`});
        }
    }

    async goto(url= CONFIG.baseHost) {
        await this.page.goto(url!);
    }

    async clearCookies(){
        await this.page.context().clearCookies();
    }

    async clearStorage(){
        await this.page.evaluate(() => window.localStorage.clear());
        await this.page.evaluate(() => window.sessionStorage.clear());
    }
}