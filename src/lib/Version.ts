import { Client } from "./Client.js"
import { VersionDTO } from "./utility/Global.js"

export const VersionEndpoint = 'version'
export class Version {
  private client: Client
  constructor(client:Client) {
    this.client = client
  }

  async get(contentId: number, language: string = this.client.language): Promise<VersionDTO[]> {
    const response = await this.client.call('GET', `${VersionEndpoint}/${contentId}/${language}`, null)
    return await response.json()
  }
}