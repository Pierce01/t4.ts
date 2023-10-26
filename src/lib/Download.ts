import { Client } from "./Client.js"
import { FileDownload } from './utility/Global.js'

export const DownloadEndpoint = 'download'
export class Download {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async getFileFromElement(element: string, contentId: number, language: string = this.client.language): Promise<FileDownload> {
    const response = await this.client.call('GET', `${DownloadEndpoint}/${contentId}/${language}/${element}`, null)
    return await response.json()
  }

  async getFileFromElementVersion(element: string, contentId: number, version: number, language: string): Promise<FileDownload> {
    const response = await this.client.call('GET', `${DownloadEndpoint}/${contentId}/${language}/${version}/${element}`, null)
    return await response.json()
  }
}

