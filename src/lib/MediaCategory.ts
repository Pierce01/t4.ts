import { Client } from "./Client"
import { Category } from "./utility/Global"

export const MediaCategoryEndpoint = 'mediacategory'
export class MediaCategory {
  client: Client
  constructor(client: Client) {
    this.client = client
  }

  async list(categoryID: number, language: string | 'en'): Promise<Category[]> {
    const response = await this.client.call('POST', `${MediaCategoryEndpoint}`, { 
      body: {
        category: {
          id: categoryID,
          language
        },
        recursionDepth: -1,
        explode: true,
        activeNode: -1,
        showInactive: true,
        showMyMedia: false
    }})
    return await response.json()
  }

  async get(categoryID: number, language:string | 'en'): Promise<Category> {
    const response = await this.client.call('GET', `${MediaCategory}/${categoryID}/${language}`, null)
    return await response.json()
  }

  async update(categoryID: number, options: Partial<Category>, language:string | 'en'): Promise<Category> {
    const current = await this.get(categoryID, language), newObj = Object.assign({}, current, options)
    const response = await this.client.call('PUT', `${MediaCategory}/${categoryID}/${language}`, {
      body: newObj
    })
    return await response.json()
  }
}
