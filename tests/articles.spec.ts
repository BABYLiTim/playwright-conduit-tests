import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page'
import { ArticlePage } from '../pages/article.page'


test('User can create a new article with valid data', async ({page}) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const articlePage = new ArticlePage(page)

    const articleTitle = `Article ${Date.now()}`
    const description = 'Test description'
    const body = 'Test article body'
    const tag = 'Test tag'

    await loginPage.open()
    await loginPage.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    await homePage.openNewArticle()
    await articlePage.createArticle(articleTitle, description, body, tag)

    await expect(
        page.getByRole('heading', {name: articleTitle})
    ).toBeVisible()
})

test('User can delete an article', async ({page}) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const articlePage = new ArticlePage(page)
    const article = `Article ${Date.now()}`

    await loginPage.open()
    await loginPage.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    // Create article
    await homePage.openNewArticle()
    await articlePage.createArticle(article)

    // Delete article
    await page.getByRole('button', {name: 'Delete Article'}).first().click()

    // Assert deletion
    await expect(page).toHaveURL('/');
    await expect(page.getByText(article)).toHaveCount(0);
})