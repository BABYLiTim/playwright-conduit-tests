import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'

test('User logs in with valid credentials', async({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.navigateToLoginPage()
    const validEmail = process.env.USER_EMAIL_VALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(validEmail, validPassword)

    await expect(pageManager.onHomePage().home).toBeVisible()
})

test('User logs in with invalid email', async({page}) => {
    const pageManager = new PageManager(page)
    const loginPage = pageManager.navigateToLoginPage()
    const inValidEmail = process.env.USER_EMAIL_INVALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(inValidEmail, validPassword)

    await expect(pageManager.navigateToLoginPage().getErrorMessage()).toBeVisible()
})