import { Client } from "./Client.js"
import { ContentTypeDTO } from "./utility/Global.js"

export const ContentTypeEndpoint = 'contenttype'
export class ContentType {
  clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async list(): Promise<ContentTypeDTO[]> {
    const response = await this.clinet.call('GET', ContentTypeEndpoint, null)
    return await response.json()
  }

  async get(contentTypeId: number): Promise<ContentTypeDTO> {
    const response = await this.clinet.call('GET', `${ContentTypeEndpoint}/${contentTypeId}`, null)
    return await response.json()
  }
}