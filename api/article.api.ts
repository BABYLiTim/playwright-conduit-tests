import { APIRequestContext } from '@playwright/test';


export class ArticleApi {
    private readonly request: APIRequestContext;
    
    constructor (request: APIRequestContext) {
        this.request = request
    }

    async createArticle(token: string, title: string, description: string, body: string): Promise<string> {
        const createArticleResponse = await this.request.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: {
                article: {
                    title: title,
                    description: description,
                    body: body
                }
            },
            headers: {
                Authorization: `Token ${token}`
            }
        })

        const createArticleBody = await createArticleResponse.json()
        return createArticleBody.article.slug
    }

    async getArticle(token: string, slug: string): Promise<any> {
        const response = await this.request.get(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })

        const articleBody = await response.json()
        return articleBody.article
    }
}