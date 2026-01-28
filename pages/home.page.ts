import { Locator, Page, expect } from '@playwright/test';


export class HomePage {

    readonly page: Page
    readonly home: Locator
    readonly yourFeed: Locator
    readonly globalFeed: Locator

    constructor(page: Page){
        this.page = page
        this.home = page.getByRole('link', {name: 'Home'})
        this.yourFeed = page.getByRole('link', {name: 'Your Feed'})
        this.globalFeed = page.getByRole('link', {name: 'Global Feed'})
    }

    async openHomePage(){
        await this.page.goto('/')
    }

    async openNewArticle(){
        await this.page.goto('/editor')
    }

    private articleByTitle(title: string): Locator {
        return this.page.locator('.article-preview', {
            has: this.page.getByRole('heading', { name: title })
        })
    }

    async addArticleToFavorites(title: string) {
        const article = this.articleByTitle(title)
        const favoriteButton = article.getByRole('button')

        await expect(article).toBeVisible()
        await favoriteButton.click()
    }

    openUserProfile(username: string) {
        return this.page.goto(`https://conduit.bondaracademy.com/profile/${username}`)
    }

    async getArticleTitles(): Promise<string[]> {
        return this.page
            .locator('article-preview h1')
            .allTextContents()
    }
}