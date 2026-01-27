import { test as setup } from '@playwright/test'
import { PageManager } from '../../pages/pageManager'


const authFile = '.storage/auth.json'

setup('Login and save auth state', async ({ page }) => {

    const pageManager = new PageManager(page)
    const loginPage = pageManager.getLoginPage()
    const inValidEmail = process.env.USER_EMAIL_VALID!
    const validPassword = process.env.USER_PASSWORD_VALID!

    await loginPage.open()
    await loginPage.login(inValidEmail, validPassword)
    await page.waitForURL('/')

    await page.context().storageState({ path: authFile });
})