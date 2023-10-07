import { Client } from "./Client.js"
import { PredefinedListDTO } from "./utility/Global.js"

export const ListEndpoint = 'list'
export class List {
  client: Client
  constructor(client:Client) {
    this.client = client
  }

  async get(listId: number, language: string = 'en'): Promise<PredefinedListDTO> {
    const response = await this.client.call('GET', `${ListEndpoint}/${listId}/${language}`, null)
    return await response.json()
  }
}