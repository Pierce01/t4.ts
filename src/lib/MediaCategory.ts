import { Client } from "./Client"
import { Category } from "./utility/Global"

export const MediaCategoryEndpoint = 'mediacategory'
export class MediaCategory {
  client: Client
  constructor(client: Client) {
    this.client = client
  }

  async list(categoryID: number, language: string | 'en'): Promise<Category[]> {
    const response = await this.client.call('POST', `${MediaCategoryEndpoint}`, { body: {
      "category": {
        "id": categoryID,
        language
      },
      "recursionDepth": -1,
      "explode": true,
      "activeNode": -1,
      "showInactive": true,
      "showMyMedia": false
    }})
    return await response.json()
  }
}
