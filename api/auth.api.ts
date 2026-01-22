import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Logs user in via API and returns JWT token
   */
  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post('https://conduit-api.bondaracademy.com/api/users/login', {
      data: {
        user: {
          email,
          password
        }
      }
    });

    if (response.status() !== 200) {
      throw new Error(`Login failed. Status code: ${response.status()}`);
    }

    const responseBody = await response.json();

    const token = responseBody?.user?.token;

    if (!token) {
      throw new Error('Login succeeded but token is missing in response');
    }

    return token;
  }
}
