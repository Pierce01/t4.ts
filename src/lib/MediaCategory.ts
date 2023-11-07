import { Client } from "./Client.js"
import { MediaCategoryObject, NewMediaCategoryDTO } from "./utility/Global.js"

export const MediaCategoryEndpoint = 'mediacategory'
export class MediaCategory {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async list(categoryID: number, language: string | 'en'): Promise<MediaCategoryObject[]> {
    const response = await this.client.call('POST', MediaCategoryEndpoint, { 
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

  async get(categoryID: number, language: string = this.client.language): Promise<MediaCategoryObject> {
    const response = await this.client.call('GET', `${MediaCategoryEndpoint}/${categoryID}/${language}`, null)
    return await response.json()
  }

  async update(categoryID: number, options: Partial<MediaCategoryObject>, language: string = this.client.language): Promise<MediaCategoryObject> {
    const current = await this.get(categoryID, language), newObj = Object.assign({}, current, options)
    const response = await this.client.call('PUT', `${MediaCategoryEndpoint}/${categoryID}/${language}`, {
      body: newObj
    })
    return await response.json()
  }

  async add(parentID: number, options: Partial<NewMediaCategoryDTO>, language: string = this.client.language) {
    if (!options.name) throw Error('Name not specified for new media category')
    const response = await this.client.call('POST', `${MediaCategoryEndpoint}/${language}`, {
      body: {
        description: '',
        archive: false,
        status: 0,
        show: false,
        eForm: false,
        'output-uri': '',
        parent: parentID,
        name: options.name,
        workflow: '-2',
        ...options
      }
    })
    return await response.json()
  }
}
