import { Locator, Page } from '@playwright/test';


export class LoginPage {

    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly signinButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page){
        this.page = page
        this.emailField = page.getByRole('textbox', {name: 'Email'})
        this.passwordField = page.getByRole('textbox', {name: 'Password'})
        this.signinButton = page.getByRole('button', {name: 'Sign in'})
        this.errorMessage = page.getByText(/email or password is invalid/i)
    }

    async open() {
        await this.page.goto('/login')
    }

    async login(email: string, password: string){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.signinButton.click()
    }

    getErrorMessage(){
        return this.errorMessage
    }
}