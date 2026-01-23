import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page'
import { ArticlePage } from '../pages/article.page'
import { SettingsPage } from '../pages/settings.page'
import { Page } from '@playwright/test';

export class PageManager{

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly homePage: HomePage
    private readonly articlePage: ArticlePage
    private readonly settingsPage: SettingsPage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.articlePage = new ArticlePage(this.page)
        this.settingsPage = new SettingsPage(this.page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getHomePage(){
        return this.homePage
    }

    getArticlePage(){
        return this.articlePage
    }

    getSettingsPage(){
        return this.settingsPage
    }
}