import { Client } from "./Client.js"
import { ServerSideLinkData, ServerSideLinkDTO } from "./utility/Global.js"

export const ServerSideLinkEndpoint = 'ssl'
export class ServerSideLink {
  private client: Client
  util: { getFromSection: (sectionId: number, language?: string) => Promise<ServerSideLinkDTO[]> }
  linkId: number
  sslRegex: RegExp
  constructor(client: Client) {
    this.client = client
    this.linkId = 14
    this.sslRegex = /sslink_id="(\d+)"/
    this.util = {
      getFromSection: async (sectionId: number, language: string = this.client.language): Promise<ServerSideLinkDTO[]> => {
        const { hierarchy, content } = this.client
        const serverSideLinks: ServerSideLinkDTO[] = []
        const contentIds = (await hierarchy.getContents(sectionId)).contents.map(content => content.id)
        await Promise.all(contentIds.map(async contentId => {
          const { types, elements, id } = await content.get(contentId, sectionId, language)
          if (!types.some(entry => entry.id == this.linkId)) return
          const keys = Object.keys(elements).filter(name => name.split(':').pop() == this.linkId.toString())
          const maxId = Math.max(...keys.map(key => elements[key].match(this.sslRegex)?.[1]).filter(entry => entry != null).map(Number))
          if (!maxId) return
          for (let i = 1; i <= maxId; i++) {
            const link = await this.get(i, sectionId, parseInt(id))
            if (link.id) serverSideLinks.push(link)
          }
        }))
        return serverSideLinks
      }
    }
  }

  async set(options: ServerSideLinkData) {
    const destinationSection = await this.client.hierarchy.get(options.toSection, options.language || this.client.language)
    if (!destinationSection) throw Error(`${options.toSection} doesn't exist!`)
    options.path = `${destinationSection.path}${options.toContent ? `&raquo; ${options.linkText}` : ''}`
    if (!options.toContent) options.toContent = 0
    const response: ServerSideLinkDTO = await (await this.client.call('PUT', ServerSideLinkEndpoint, { body: options })).json()
    return response
  } 

  async delete(options: ServerSideLinkData) {
    const response = await this.client.call('DELETE', ServerSideLinkEndpoint, { body: options })
    return await response.text()
  }

  async modify(linkId: number, options: ServerSideLinkData) {
    const response = await this.client.call('PUT', `${ServerSideLinkEndpoint}/${linkId}`, { body: options })
    return await response.json()
  }

  async get(linkId: number, sectionId: number, contentId: number, language: string = this.client.language): Promise<ServerSideLinkDTO> {
    const response = await this.client.call('GET', `${ServerSideLinkEndpoint}/${linkId}/${language}/${sectionId}/${contentId}`, null)
    try {
      return await response.json()
    } catch (e) {
      return {} as ServerSideLinkDTO
    }
  }

  async getSelectedContentsLinks(ids: number[], language: string = this.client.language) {
    const response = await this.client.call('POST', `${ServerSideLinkEndpoint}/${language}`, { body: ids })
    return await response.json()
  }

  async getLinks(sectionId: number, contentId: number, language: string = this.client.language) {
    const response = await this.client.call('GET', `${ServerSideLinkEndpoint}/${language}/${sectionId}/${contentId}`, null)
    return await response.json()
  }
}

