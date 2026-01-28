import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page'
import { ArticlePage } from '../pages/article.page'
import { SettingsPage } from '../pages/settings.page'
import { ProfilePage } from '../pages/profile.page'
import { Page } from '@playwright/test';

export class PageManager{

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly homePage: HomePage
    private readonly articlePage: ArticlePage
    private readonly settingsPage: SettingsPage
    private readonly profilePage: ProfilePage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.articlePage = new ArticlePage(this.page)
        this.settingsPage = new SettingsPage(this.page)
        this.profilePage = new ProfilePage(this.page)
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

    getProfilePage(){
        return this.profilePage
    }
}