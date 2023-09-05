import { Client } from './Client.js'
import { SectionDTO, ReadDTO, HierarchyResponse, HierarchyContentResponseDTO } from './utility/Global.js'

export const HierarchyEndpoint = 'hierarchy'
export class Hierarchy {
  private client: Client;
  constructor(client: Client) {
    this.client = client
  }

  async get(id: number, language: string): Promise<SectionDTO> {
    const response = await this.client.call('GET', `${HierarchyEndpoint}/${id}/${language}`, null)
    return await response.json() 
  }

  async getSection(id: number, options?: Partial<ReadDTO>): Promise<HierarchyResponse[]> {
    const response = await this.client.call('POST', `${HierarchyEndpoint}/section`, {
      body: {
        read: {
          section: { id, language: 'en' },
          activeNode: id,
          openNodes: [id],
          recursionDepth: 1,
          restrictedToPermitedSections: false,
          showContentInfo: true,
          showAllSections: true,
          expandCollapseAllChildren: true,
          ...options
        }
      }
    })
    return await response.json()
  }

  async getContents(id: number, options?: Partial<ReadDTO>): Promise<HierarchyContentResponseDTO> {
    const response = await this.client.call('POST', `${HierarchyEndpoint}/content`, {
      body: {
        read: {
          section: { id, language: 'en' },
          activeNode: id,
          openNodes: [id],
          recursionDepth: 1,
          restrictedToPermitedSections: false,
          showContentInfo: true,
          showAllSections: true,
          expandCollapseAllChildren: true,
          ...options
        }
      }
    })
    return await response.json()
  }

  async delete(id: number, isMandatory?: boolean) {
    const response = await this.client.call('DELETE', `${HierarchyEndpoint}/${id}${isMandatory ? '?mandatory=true' : ''}`, null)
    return response?.ok
  }

  async update(id: number, language: string, options: Partial<SectionDTO>) {
    let section = await this.get(id, language)
    const response = await this.client.call('PUT', `${HierarchyEndpoint}/${id}/${language}`, { body: Object.assign({}, section, options) })
    return response?.ok
  }
}