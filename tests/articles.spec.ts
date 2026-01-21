import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import { AuthApi } from '../api/auth.api'


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

test('User can create an Article via API', async ({request}) => {
    const articleTitle = `Article ${Date.now()}`
    const description = 'Test description'
    const body = 'Test article body'

    const authApi = new AuthApi(request)
    const token = await authApi.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    const createArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {
                title: articleTitle,
                description: description,
                body: body 
            }  
        }, 
        headers: {
            Authorization: `Token ${token}`
        }
    })

    expect (createArticleResponse.status()).toBe(201)

    const createArticleBody = await createArticleResponse.json()

    expect (createArticleBody.article.slug).toBeDefined()
    expect (createArticleBody.article.title).toEqual(articleTitle)
})

test('User can delete an Article via API', async ({request}) => {
    const articleTitle = `Article ${Date.now()}`
    const description = 'Test description'
    const body = 'Test article body'
    
    // User logs in and receives token
    const authApi = new AuthApi(request)
    const token = await authApi.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    // User creates an Article via API
    const createArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {
                title: articleTitle,
                description: description,
                body: body 
            }  
        }, 
        headers: {
            Authorization: `Token ${token}`
        }
    })

    expect (createArticleResponse.status()).toBe(201)

    const createArticleBody = await createArticleResponse.json()
    const articleSlug = createArticleBody.article.slug

    expect (createArticleBody.article.slug).toBeDefined()
    expect (createArticleBody.article.title).toEqual(articleTitle)

    // User deletes an Article via API
    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })

    expect (deleteArticleResponse.status()).toBe(204)
})