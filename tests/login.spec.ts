import { test, expect } from '@playwright/test';


test('User logs in with valid credentials', async({page}) => {
    const validEmail = process.env.USER_EMAIL!
    const validPassword = process.env.USER_PASSWORD!

    await page.goto('/')
    await page.getByRole('link', {name: 'Sign in'}).click()
    await page.getByRole('textbox', {name: 'Email'}).fill(validEmail)
    await page.getByRole('textbox', {name: 'Password'}).fill(validPassword)
    await page.getByRole('button', {name: 'Sign in'}).click()

    const homeLink = page.getByRole('link', {name: 'Home'})
    const userName = page.getByRole('link', {name: 'pwapitest100'})

    await expect(homeLink).toBeVisible()
    await expect(userName).toBeVisible()
})