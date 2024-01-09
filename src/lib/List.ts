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

  async modify(list: PredefinedListDTO, language: string = this.client.language): Promise<any> {
    // Assuming the list object was retrieved from the API, it will have a primaryGroup object name, fullAccess, and group.
    // The API expects the primaryGroup object to only have an id property and will fail if the other properties are present.
    if (Object.keys(list.primaryGroup).length > 1) list.primaryGroup = { id: list.primaryGroup.id }
    const response = await this.client.call('PUT', `${ListEndpoint}/${list.id}/${language}?override=false`, {
      body: list
    })
    return await response.json()
  }
}