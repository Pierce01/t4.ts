import { Client } from "./Client.js"
import { ServerSideLinkData, ServerSideLinkDTO } from "./utility/Global.js"

export const ServerSideLinkEndpoint = 'ssl'
export class ServerSideLink {
  private client: Client
  id: number
  util: { getFromSection: (sectionId: number, language?: string) => Promise<ServerSideLinkDTO[]> }
  linkId: number
  sslRegex: RegExp
  constructor(client: Client) {
    this.client = client
    this.id = 0
    this.linkId = 14
    this.sslRegex = /sslink_id="(\d+)"/
    this.util = {
      getFromSection: async (sectionId: number, language: string = 'en'): Promise<ServerSideLinkDTO[]> => {
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
    const destinationSection = await this.client.hierarchy.get(options.toSection, options.language)
    if (!destinationSection) throw Error(`${options.toSection} doesn't exist!`)
    if (!options.path) options.path = destinationSection.path
    if (!options.toContent) options.toContent = 0
    const response: ServerSideLinkDTO = await (await this.client.call('PUT', ServerSideLinkEndpoint, { body: { id: ++this.id, ...options } })).json()
    if (response?.id) this.id = ++response.id
    return response
  } 

  // async delete() {
  //   TODO
  // }

  // async modify() {
  //   TODO
  // }

  async get(linkId: number, sectionId: number, contentId: number, language: string = 'en'): Promise<ServerSideLinkDTO> {
    const response = await this.client.call('GET', `${ServerSideLinkEndpoint}/${linkId}/${language}/${sectionId}/${contentId}`, null)
    try {
      return await response.json()
    } catch (e) {
      return {} as ServerSideLinkDTO
    }
  }

  async getSelectedContentsLinks(ids: number[], language: string = 'en') {
    const response = await this.client.call('POST', `${ServerSideLinkEndpoint}/${language}`, { body: ids })
    return await response.json()
  }

  async getLinks(sectionId: number, contentId: number, language: string = 'en') {
    const response = await this.client.call('GET', `${ServerSideLinkEndpoint}/${language}/${sectionId}/${contentId}`, null)
    return await response.json()
  }
}

