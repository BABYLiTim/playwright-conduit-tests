import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page'


test('User logs in with valid credentials', async({page}) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const validEmail = process.env.USER_EMAIL_VALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(validEmail, validPassword)

    await expect(homePage.home).toBeVisible()
})

test('User logs in with invalid email', async({page}) => {
    const loginPage = new LoginPage(page)
    const inValidEmail = process.env.USER_EMAIL_INVALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(inValidEmail, validPassword)

    await expect(loginPage.getErrorMessage()).toBeVisible()
})