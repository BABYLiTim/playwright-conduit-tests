import { Locator, Page } from '@playwright/test';


export class ArticlePage {

    readonly page: Page
    readonly articleTitle: Locator
    readonly articleDescription: Locator
    readonly articleBody: Locator
    readonly articleTag: Locator
    readonly publishArticle: Locator
    readonly deleteButton: Locator

    constructor(page: Page){
        this.page = page
        this.articleTitle = page.getByPlaceholder('Article Title')
        this.articleDescription = page.getByPlaceholder("What's this article about?")
        this.articleBody = page.getByPlaceholder('Write your article (in markdown)')
        this.articleTag = page.getByPlaceholder('Enter tags')
        this.publishArticle = page.getByRole('button', {name: 'Publish Article'})
        this.deleteButton = page.getByRole('button', {name: 'Delete Article'}).first()
    }

    async createArticle(title: string, description?: string, body?: string, tag?: string){
        await this.articleTitle.fill(title)
        
        if (description) {
            await this.articleDescription.fill(description)
        }
        
        if (body) {
            await this.articleBody.fill(body)
        }
        
        if (tag) {
            await this.articleTag.fill(tag)
        }

        await this.publishArticle.click()
    }

    async deleteArticle() {
        await this.deleteButton.click()
}

}