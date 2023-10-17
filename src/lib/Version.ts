import { Client } from "./Client.js"
import { VersionDTO } from "./utility/Global.js"

export const VersionEndpoint = 'version'
export class Version {
  private clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async get(contentId: number, language: string = 'en'): Promise<VersionDTO[]> {
    const response = await this.clinet.call('GET', `${VersionEndpoint}/${contentId}/${language}`, null)
    return await response.json()
  }
}