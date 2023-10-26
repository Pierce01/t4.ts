import { Client } from "./Client.js"
import { PredefinedListDTO } from "./utility/Global.js"

export const ListEndpoint = 'list'
export class List {
  private client: Client
  constructor(client:Client) {
    this.client = client
  }

  async get(listId: number, language: string = this.client.language): Promise<PredefinedListDTO> {
    const response = await this.client.call('GET', `${ListEndpoint}/${listId}/${language}`, null)
    return await response.json()
  }
}