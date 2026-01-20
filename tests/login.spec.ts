import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page'


test('User logs in with valid credentials', async({page}) => {
    const pageManager = new PageManager(page)
    const validEmail = process.env.USER_EMAIL_VALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await pageManager.navigateToLoginPage().open()
    await pageManager.navigateToLoginPage().login(validEmail, validPassword)

    await expect(pageManager.onHomePage().home).toBeVisible()
})

test('User logs in with invalid email', async({page}) => {
    const pageManager = new PageManager(page)
    const inValidEmail = process.env.USER_EMAIL_INVALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await pageManager.navigateToLoginPage().open()
    await pageManager.navigateToLoginPage().login(inValidEmail, validPassword)

    await expect(pageManager.navigateToLoginPage().getErrorMessage()).toBeVisible()
})