import { Client } from './Client.js'
import { ContentDTO } from './utility/Global.js'

export const ContentEndpoint = 'content'
export class Content {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async getVersions(contentId: number, language: string): Promise<ContentDTO[]> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version`, null)
    return await response.json()
  }

  async get(contentId: number, sectionId: number, language: string): Promise<ContentDTO> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return await response.json()
  }

  async getWithoutSection(contentId: number, language: string, version?: string) {
    if (!version) version = (await this.getVersions(contentId, language))[0].version
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version/${version}`, null)
    return await response.json()
  }

  async delete(contentId: number, sectionId: number, language: string) {
    const response = await this.client.call('DELETE', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return response?.ok 
  }
}