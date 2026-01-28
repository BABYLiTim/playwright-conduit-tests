import { Locator, Page } from '@playwright/test';


export class ProfilePage {

    readonly page: Page
    readonly favoritedPosts: Locator

    constructor(page: Page){
        this.page = page
        this.favoritedPosts = page.getByRole('link', {name: 'Favorited Posts'})
    }

    async openFavoritedPosts(){
        await this.favoritedPosts.click()
    }
}