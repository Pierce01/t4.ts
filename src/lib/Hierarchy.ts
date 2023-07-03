import { Client } from './Client.js'
import { SectionDTO } from './utility/Global.js'

export const HierarchyEndpoint = 'hierarchy'
export class Hierarchy {
  private client: Client;
  constructor(client: Client) {
    this.client = client
  }

  async get(id: number, language: string) {
    const response = await this.client.call('GET', `${HierarchyEndpoint}/${id}/${language}`, null)
    return response?.ok ? await response.json() as SectionDTO : null
  }

  async delete(section:number | SectionDTO, isMandatory?: boolean) {
    const id = typeof section == 'number' ? section : section.id
    const response = await this.client.call('DELETE', `${HierarchyEndpoint}/${id}${isMandatory ? '?mandatory=true' : ''}`, null)
    return response?.ok
  }
}