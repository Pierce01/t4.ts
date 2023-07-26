import { Client } from "./Client"
import { MediaData, MediaItemTableData, MediaUpload, MediaUploadData } from "./utility/Global.js"
import { existsSync, readFileSync } from 'node:fs'
import * as path from 'path'


export const MediaEndpoint = 'media'
export class Media {
  client: Client
  constructor(client:Client) {
    this.client = client
  }

  async add(data: MediaUpload) {
    const formData = new FormData()
    const expandedData: MediaData = MediaUploadData(data)
    const filePath = path.resolve(data.file)
    if (!existsSync(filePath)) throw Error(`File at ${filePath} does not exist.`)
    if (!expandedData.fileName) expandedData.fileName = path.basename(filePath)
    const blob = new Blob([readFileSync(filePath)])
    for (let key in expandedData) { key == 'file' ? formData.append('file', blob, expandedData.fileName) : formData.append(key, expandedData[key]) }  
    const response = await this.client.call('POST', `${MediaEndpoint}`, { body: formData })
    return response?.ok ? await response.json() : null
  }

  async get(contentId: number, language: string) {
    const response = await this.client.call('GET', `${MediaEndpoint}/${contentId}/${language}`, null)
    return response?.ok ? await response.json() : null
  }

  async getMediaUsage(mediaID: number, language: string) {
    const response = await this.client.call('GET', `${MediaEndpoint}/${mediaID}/${language}/usage`, null)
    return response?.ok ? await response.json() : null
  }

  async bulkGetMediaUsage (mediaIDs: number[], language: string) {
    const response = await this.client.call('POST', `${MediaEndpoint}/getUsage/${language}`, {body: mediaIDs})
    return await response.json()
  }

  async list(categoryID: number, language: string): Promise<MediaItemTableData> {
    const response = await this.client.call('POST', (`${MediaEndpoint}/category/${categoryID}/${language}/list` +
      '?showPending=true&showUntranslated=true'), {
        body: 'draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=7&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=5&order%5B0%5D%5Bdir%5D=desc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      })
    return await response.json()
  }
}