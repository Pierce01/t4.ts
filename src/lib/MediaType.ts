import { Client } from "./Client"

export const MediaTypeEndpoint = 'mediaType'
export class MediaType {
  clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async list() {
    const response = await this.clinet.call('GET', `${MediaTypeEndpoint}`, null)
    return await response.json()
  }
}