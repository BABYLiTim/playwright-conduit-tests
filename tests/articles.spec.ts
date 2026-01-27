import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import { AuthApi } from '../api/auth.api'
import { ArticleApi } from '../api/article.api'
import {faker} from '@faker-js/faker'


test('User can create a new article with valid data', async ({page}) => {
    const pageManager = new PageManager(page)
    const articleTitle = `Article ${Date.now()}`
    const description = faker.lorem.sentence()
    const body = faker.lorem.paragraph()
    const tag = faker.book.title()

    await pageManager.getHomePage().openNewArticle()
    await pageManager.getArticlePage().createArticle(articleTitle, description, body, tag)

    await expect(
        page.getByRole('heading', {name: articleTitle})
    ).toBeVisible()
})

test('User can delete an article', async ({page}) => {
    const pageManager = new PageManager(page)
    const article = `Article ${Date.now()}`
    const description = faker.lorem.sentence()
    const body = faker.lorem.paragraph()

    // Create article
    await pageManager.getHomePage().openNewArticle()
    await pageManager.getArticlePage().createArticle(article, description, body)

    // Delete article
    await pageManager.getArticlePage().deleteArticle()

    // Assert deletion
    await expect(page).toHaveURL('/');
    await expect(page.getByText(article)).toHaveCount(0);
})

test('User can create an Article via API', async ({request}) => {
    const articleTitle = `Article ${Date.now()}`
    const description = faker.lorem.sentence()
    const body = faker.lorem.paragraph()

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
    const description = faker.lorem.sentence()
    const body = faker.lorem.paragraph()
    
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

test('User can create an Article via API (2)', async ({request}) => {
    const articleApi = new ArticleApi(request)
    const articleTitle = `Article ${Date.now()}`
    const description = faker.lorem.sentence()
    const body = faker.lorem.paragraph()

    const authApi = new AuthApi(request)
    const token = await authApi.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    const articleSlug = await articleApi.createArticle(token, articleTitle, description, body)

    expect(articleSlug).toBeDefined()
})

test('User can create and retrieve an article via API', async ({request}) => {
    const articleApi = new ArticleApi(request)
    const title = `Article ${Date.now()}`
    const description = faker.lorem.sentence()
    const body = faker.lorem.paragraph()

    const authApi = new AuthApi(request)
    const token = await authApi.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

    const articleSlug = await articleApi.createArticle(token, title, description, body)
    const articleTitle = await articleApi.getArticle(token, articleSlug)
    
    expect (articleTitle.title).toBe(title)
})