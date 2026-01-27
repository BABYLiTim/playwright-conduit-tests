import { Locator, Page } from '@playwright/test';


export class HomePage {

    readonly page: Page
    readonly home: Locator

    constructor(page: Page){
        this.page = page
        this.home = page.getByRole('link', {name: 'Home'})
    }

    async openNewArticle(){
        await this.page.goto('/editor')
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