import { Client } from "./Client.js"

export const TypeEndpoint = 'type'
export class Type {
  private clinet: Client
  constructor(client:Client) {
    this.clinet = client
  }

  async list() {
    const response = await this.clinet.call('GET', TypeEndpoint, null)
    return await response.json()
  }
}