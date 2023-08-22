import { Client } from "./Client"

export const ContentTypeEndpoint = 'contenttype'
export class ContentType {
  clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async list() {
    const response = await this.clinet.call('GET', `${ContentTypeEndpoint}`, null)
    return await response.json()
  }

  async listType(contentTypeId: number) {
    const response = await this.clinet.call('GET', `${ContentTypeEndpoint}/type/${contentTypeId}`, null)
    return response?.ok ? await response.json() : null
  }
}