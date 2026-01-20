import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'


test('User can create a new article with valid data', async ({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.navigateToLoginPage()
    const articleTitle = `Article ${Date.now()}`
    const description = 'Test description'
    const body = 'Test article body'
    const tag = 'Test tag'

    await loginPage.open()
    await loginPage.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    await pageManager.onHomePage().openNewArticle()
    await pageManager.onArticlePage().createArticle(articleTitle, description, body, tag)

    await expect(
        page.getByRole('heading', {name: articleTitle})
    ).toBeVisible()
})

test('User can delete an article', async ({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.navigateToLoginPage()
    const article = `Article ${Date.now()}`

    await loginPage.open()
    await loginPage.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    // Create article
    await pageManager.onHomePage().openNewArticle()
    await pageManager.onArticlePage().createArticle(article)

    // Delete article
    await pageManager.onArticlePage().deleteArticle()

    // Assert deletion
    await expect(page).toHaveURL('/');
    await expect(page.getByText(article)).toHaveCount(0);
})