import { Client } from './Client.js'
import { SectionDTO, Read, HierarchySection } from './utility/Global.js'

export const HierarchyEndpoint = 'hierarchy'
export class Hierarchy {
  private client: Client;
  section: { get: (id: number, options?: Read) => Promise<HierarchySection>; };
  constructor(client: Client) {
    this.client = client
    this.section = {
      get: async (id, options?) => {
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
    }
  }

  async get(id: number, language: string): Promise<SectionDTO> {
    const response = await this.client.call('GET', `${HierarchyEndpoint}/${id}/${language}`, null)
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