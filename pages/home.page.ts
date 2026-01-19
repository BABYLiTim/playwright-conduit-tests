import { Locator, Page } from '@playwright/test';


export class HomePage {

    readonly page: Page
    readonly newArticle: Locator
    readonly home: Locator

    constructor(page: Page){
        this.page = page
        this.newArticle = page.getByRole('link', {name: 'New Article'})
        this.home = page.getByRole('link', {name: 'Home'})
    }

    async openNewArticle(){
        await this.newArticle.click()
    }

    openUserProfile(username: string) {
        return this.page.getByRole('link', {name: username}).click()
    }

    async getArticleTitles(): Promise<string[]> {
        return this.page
            .locator('article-preview h1')
            .allTextContents()
    }
}