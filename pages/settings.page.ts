import { Locator, Page } from '@playwright/test';


export class SettingsPage {

    readonly page: Page
    readonly settings: Locator
    readonly logoutButton: Locator

    constructor(page: Page){
        this.page = page
        this.settings = page.getByRole('link', {name: 'Settings'})
        this.logoutButton = page.getByRole('button', {name: 'Or click here to logout.'})
    }

    async open() {
        await this.settings.click()
    }

    async logout() {
        await this.logoutButton.click()
    }
}