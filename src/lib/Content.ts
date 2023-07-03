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
    return response?.ok ? await response.json() : null
  }

  async get(contentId: number, language: string, sectionId: number): Promise<ContentDTO> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return response?.ok ? await response.json() : null
  }

  async getWithoutSection(contentId: number, language: string, version?: string) {
    if (!version) version = (await this.getVersions(contentId, language))[0].version
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version/${version}`, null)
    return response?.ok ? await response.json() : null
  }  
}