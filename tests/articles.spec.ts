import { test, expect } from '@playwright/test';


test('User can create a new article with valid data', async ({page}) => {
    const articleTitle = `Article ${Date.now()}`
    const description = 'Test description'
    const body = 'Test article body'
    const tag = 'Test tag'

    await page.goto('/')
    await page.getByRole('link', {name: 'Sign in'}).click()

    await page.getByRole('textbox', {name: 'Email'}).fill(process.env.USER_EMAIL_VALID!)
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD_VALID!)
    await page.getByRole('button', {name: 'Sign in'}).click()

    await page.getByRole('link', {name: 'New Article'}).click()

    await page.getByPlaceholder('Article Title').fill(articleTitle)
    await page.getByPlaceholder("What's this article about?").fill(description)
    await page.getByPlaceholder('Write your article (in markdown)').fill(body)
    await page.getByPlaceholder('Enter tags').fill(tag)
    await page.getByRole('button', {name: 'Publish Article'}).click()

    await expect(
        page.getByRole('heading', {name: articleTitle})
    ).toBeVisible()
})

test('User can delete an article', async ({page}) => {
    const article = `Article ${Date.now()}`

    await page.goto('/')
    await page.getByRole('link', {name: 'Sign in'}).click()
    await page.getByRole('textbox', {name: 'Email'}).fill(process.env.USER_EMAIL_VALID!)
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD_VALID!)
    await page.getByRole('button', {name: 'Sign in'}).click()

    // Create article
    await page.getByRole('link', { name: 'New Article' }).click();
    await page.getByPlaceholder('Article Title').fill(article);
    await page.getByPlaceholder("What's this article about?").fill('Description');
    await page.getByPlaceholder('Write your article (in markdown)').fill('Body');
    await page.getByRole('button', { name: 'Publish Article' }).click();

    // Delete article
    await page.getByRole('button', {name: 'Delete Article'}).first().click()

    // Assert deletion
    await expect(page).toHaveURL('/');
    await expect(page.getByText(article)).toHaveCount(0);
})