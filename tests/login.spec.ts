import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'


test('User logs in with valid credentials', async({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.getLoginPage()
    const validEmail = process.env.USER_EMAIL_VALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(validEmail, validPassword)

    await expect(pageManager.getHomePage().home).toBeVisible()
})

test('User logs in with invalid email', async({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.getLoginPage()
    const inValidEmail = process.env.USER_EMAIL_INVALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(inValidEmail, validPassword)

    await expect(pageManager.getLoginPage().getErrorMessage()).toBeVisible()
})

test('User can logout', async({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.getLoginPage()
    const inValidEmail = process.env.USER_EMAIL_VALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(inValidEmail, validPassword)

    const settingsPage = pageManager.getSettingsPage()
    await settingsPage.open()
    await settingsPage.logout()

    const signinButton = page.getByRole('link', {name: 'Sign in'})
    await page.reload()
    await expect(signinButton).toBeVisible()
})    

test('User can login via API and receive token', async ({request}) => {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {
                email: process.env.USER_EMAIL_VALID!,
                password: process.env.USER_PASSWORD_VALID!
            }
        }
    })

    expect (response.status()).toBe(200)

    const responseBody = await response.json()

    expect(responseBody.user).toBeDefined()
    expect (responseBody.user.token).toBeTruthy()
})