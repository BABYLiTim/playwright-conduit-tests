import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page'
import { ArticlePage } from '../pages/article.page'
import { Page } from '@playwright/test';

export class PageManager{

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly homePage: HomePage
    private readonly articlePage: ArticlePage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.articlePage = new ArticlePage(this.page)
    }

    navigateToLoginPage(){
        return this.loginPage
    }

    onHomePage(){
        return this.homePage
    }

    onArticlePage(){
        return this.articlePage
    }
}