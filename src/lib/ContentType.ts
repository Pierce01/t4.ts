import { Client } from "./Client.js"

export const ContentTypeEndpoint = 'contenttype'
export class ContentType {
  clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async list() {
    const response = await this.clinet.call('GET', ContentTypeEndpoint, null)
    return await response.json()
  }

  async get(contentTypeId: number) {
    const response = await this.clinet.call('GET', `${ContentTypeEndpoint}/${contentTypeId}`, null)
    return await response.json()
  }
}