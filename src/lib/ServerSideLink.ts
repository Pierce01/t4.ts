import { Client } from "./Client.js"
import { ServerSideLinkData, ServerSideLinkDTO } from "./utility/Global.js"

export const ServerSideLinkEndpoint = 'ssl'
export class ServerSideLink {
  private client: Client
  id: number
  constructor(client: Client) {
    this.client = client
    this.id = 0
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

