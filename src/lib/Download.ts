import { Client } from "./Client"
import { FileDownload } from './utility/Global.js'

export const DownloadEndpoint = 'download'
export class Download {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async getFileFromElement(element: string, contentId: number, language: string): Promise<FileDownload> {
    const response = await this.client.call('GET', `${DownloadEndpoint}/${contentId}/${language}/${element}`, null)
    return await response.json()
  }

  async getFileFromElementVersion(element: string, contentId: number, language: string, version: number): Promise<FileDownload> {
    const response = await this.client.call('GET', `${DownloadEndpoint}/${contentId}/${language}/${version}/${element}`, null)
    return await response.json()
  }
}

