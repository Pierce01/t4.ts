import { Client } from './Client.js'
import { SectionDTO, ReadDTO, HierarchyResponse, HierarchyContentResponseDTO } from './utility/Global.js'

export const HierarchyEndpoint = 'hierarchy'
export class Hierarchy {
  private client: Client;
  constructor(client: Client) {
    this.client = client
  }

  async get(id: number, language: string = this.client.language): Promise<SectionDTO> {
    const response = await this.client.call('GET', `${HierarchyEndpoint}/${id}/${language}`, null)
    return await response.json() 
  }

  async getSection(id: number, options?: Partial<ReadDTO>): Promise<HierarchyResponse> {
    const response = await this.client.call('POST', `${HierarchyEndpoint}/section`, {
      body: {
        read: {
          section: { id, language: 'en' },
          activeNode: id,
          openNodes: [id],
          recursionDepth: -1,
          restrictedToPermitedSections: false,
          showContentInfo: true,
          showAllSections: true,
          expandCollapseAllChildren: true,
          ...options
        }
      }
    })
    const json = await response.json()
    return json[0] || json
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

  async delete(id: number, isMandatory?: boolean): Promise<boolean> {
    const response = await this.client.call('DELETE', `${HierarchyEndpoint}/${id}${isMandatory ? '?mandatory=true' : ''}`, null)
    return response?.ok
  }

  async update(id: number, options: Partial<SectionDTO>, language: string = this.client.language): Promise<boolean> {
    let section = await this.get(id, language)
    const response = await this.client.call('PUT', `${HierarchyEndpoint}/${id}/${language}`, { body: Object.assign({}, section, options) })
    return response?.ok
  }

  async add(parentID: number, options: { name: string, show?: boolean }, language: string = this.client.language): Promise<SectionDTO> {
    const response = await this.client.call('POST', `${HierarchyEndpoint}/${language}`, {
      body: {
        parent: parentID,
        ...options
      }
    })
    return await response.json() 
  }

  async purge(contentIds: number[], language: string = this.client.language): Promise<boolean> {
    const response = await this.client.call('POST', `${HierarchyEndpoint}/purge`, {
      body: {
        languageCode: language,
        contentIds
      }
    })
    return response.status == 204
  }
}