import { Client } from "./Client"

export const ContentTypeEndpoint = 'contenttype'
export class ContentType {
  clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async list(contentTypeId: number) {
    const response = await this.clinet.call('GET', `${ContentTypeEndpoint}/type/${contentTypeId}`, null)
    return response?.ok ? await response.json() : null
  }
}