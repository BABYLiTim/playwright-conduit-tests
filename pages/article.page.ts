import { Locator, Page } from '@playwright/test';


export class ArticlePage {

    readonly page: Page
    readonly articleTitle: Locator
    readonly articleDescription: Locator
    readonly articleBody: Locator
    readonly articleTag: Locator
    readonly publishArticle: Locator
    readonly deleteButton: Locator
    readonly editButton: Locator

    constructor(page: Page){
        this.page = page
        this.articleTitle = page.getByRole('textbox', {name: 'Article Title'})
        this.articleDescription = page.getByRole('textbox', {name: "What's this article about?"})
        this.articleBody = page.getByRole('textbox', {name: 'Write your article (in markdown)'})
        this.articleTag = page.getByRole('textbox', {name: 'Enter tags'})
        this.publishArticle = page.getByRole('button', {name: 'Publish Article'})
        this.deleteButton = page.getByRole('button', {name: 'Delete Article'}).first()
        this.editButton = page.getByRole('link', {name: 'Edit Article'}).first()
    }

    async fillArticleForm(title: string, description?: string, body?: string, tag?: string){
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
    }

    async submitArticle(title: string, description?: string, body?: string, tag?: string){
        await this.fillArticleForm(title, description, body, tag)
        await this.publishArticle.click()
    }

    async deleteArticle() {
        await this.deleteButton.click()
    }

    async openEditMode(){
        await this.editButton.click()
    }

}