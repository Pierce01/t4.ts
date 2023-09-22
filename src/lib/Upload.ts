import { Client } from "./Client.js"
import { UploadDTO, UploadObject, UploadData, UploadListDTO } from "./utility/Global.js"
import { promises } from 'node:fs'
import * as path from 'path'
const { readFile } = promises

export const UploadEndpoint = 'upload'
export class Upload {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async list(): Promise<UploadListDTO> {
    const response = await this.client.call('GET', UploadEndpoint, null)
    return await response.json()
  }

  async add({ file, filename, elementID }: UploadObject): Promise<UploadDTO> {
    const filePath = path.resolve(file)
    if (!filename) filename = path.basename(filePath)
    const blob = new Blob([await readFile(filePath)])
    const transformedData: UploadData = {
      filename,
      file: blob,
      elementID
    }
    const formData = new FormData()
    for (let key in transformedData) { 
      key == 'file' 
      ? formData.append(key, transformedData[key], transformedData.filename) 
      : formData.append(key, transformedData[key]) 
    }
    const response = await this.client.call('POST', UploadEndpoint, { body: formData })
    return await response.json()
  }

}

