import { Client } from './Client.js'
import { Category, MediaData, MediaItemTableData, MediaRow, MediaUpload, MediaUploadData } from './utility/Global.js'
import { batcher } from './utility/helpers.js'
import * as path from 'path'
import { promises } from 'node:fs'
const { readFile, stat } = promises

export const MediaEndpoint = 'media'
export class Media {
  client: Client
  util: { getMediaIDs: (parentID: number, arrLimit?: number, reqTimeout?: number) => Promise<number[]> }
  constructor(client:Client) {
    this.client = client
    this.util = {
      getMediaIDs: async (parentID: number, arrLimit: number = 50, reqTimeout: number = 10000) => {
        const structure = await this.client.mediaCategory.list(parentID, 'en')
        let categoryIds: number[] = []
        const populateIds = (category: Category) => {
          if (category?.id) categoryIds.push(category.id)
          if (category?.children?.length) category.children.map(cat => populateIds(cat))
        }
        populateIds(structure[0])
        const list = async (id: number) => await client.media.list(id, 'en')
        const categories = await batcher(categoryIds, arrLimit, reqTimeout, list)
        const IdList = categories.map(category => category.mediaRows.map((row: MediaRow) => row.id))
        return IdList.flat(Infinity)
      }
    }
  }

  async add(data: MediaUpload) {
    const formData = new FormData()
    const expandedData: MediaData = MediaUploadData(data)
    const filePath = path.resolve(data.file)
    if (!await stat(filePath)) throw Error(`File at ${filePath} does not exist.`)
    if (!expandedData.fileName || expandedData.fileName == 'undefined') expandedData.fileName = path.basename(filePath)
    const blob = new Blob([await readFile(filePath)])
    for (let key in expandedData) { key == 'file' ? formData.append('file', blob, expandedData.fileName) : formData.append(key, expandedData[key]) }  
    const response = await this.client.call('POST', `${MediaEndpoint}`, { body: formData })
    return await response.json()
  }

  async get(contentId: number, language: string) {
    const response = await this.client.call('GET', `${MediaEndpoint}/${contentId}/${language}`, null)
    return await response.json()
  }

  async getMediaUsage(mediaID: number, language: string) {
    const response = await this.client.call('GET', `${MediaEndpoint}/${mediaID}/${language}/usage`, null)
    return await response.json()
  }

  async bulkGetMediaUsage (mediaIDs: number[], language: string) {
    const response = await this.client.call('POST', `${MediaEndpoint}/getUsage/${language}`, {body: mediaIDs})
    return await response.json()
  }

  async list(categoryID: number, language: string): Promise<MediaItemTableData> {
    const response = await this.client.call('POST', `${MediaEndpoint}/category/${categoryID}/${language}/list?showPending=true&showUntranslated=true`, {
        body: 'draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=7&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=5&order%5B0%5D%5Bdir%5D=desc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      })
    return await response.json()
  }

  async downloadSingle(id: number, type: 'media' | 'file' | 'thumbnail', version?: string) {
    if (!version) version = (await this.client.content.getVersions(id, 'smxx'))[0].version
    const inital = await this.client.call('GET', `${MediaEndpoint}/${id}/smxx/${version}/${type}`, { redirect: 'manual' })
    if (inital.status != 302) return null
    const fileURL = await inital.text()
    const response = await fetch(fileURL)
    return await response.arrayBuffer()
  }
}