import { Client } from './Client.js'
import { ContentDTO, contenUploadDTO, NewContentDTO, ContentTypeElement, Elements, contentUploadData } from './utility/Global.js'

export const ContentEndpoint = 'content'
export class Content {
  private client: Client
  util: {
    getElementNames: (elements: ContentTypeElement[]) => Elements,
    lazyMap: (elements: Elements, formattedNames: Elements) => Elements
  }
  constructor(client: Client) {
    this.client = client
    this.util = {
      getElementNames: (elements: ContentTypeElement[]): Elements => {
        return elements.reduce((elementObj: Elements, { alias, name, id, type }) => {
          elementObj[alias || name] = `${name}#${id}:${type}`
          return elementObj
        }, {})
      },
      lazyMap: (elements: Elements, formattedNames: Elements) => {
        let newElements: Elements = {};
        Object.keys(elements).forEach(key => {
          if (formattedNames.hasOwnProperty(key)) {
            newElements[formattedNames[key]] = elements[key];
          }
        })
        return newElements
      }
    }
  }

  async getVersions(contentId: number, language: string): Promise<ContentDTO[]> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version`, null)
    return await response.json()
  }

  async get(contentId: number, sectionId: number, language: string): Promise<ContentDTO> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return await response.json()
  }

  async getWithoutSection(contentId: number, language: string, version?: string) {
    if (!version) version = (await this.getVersions(contentId, language))[0].version
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version/${version}`, null)
    return await response.json()
  }

  async delete(contentId: number, sectionId: number, language: string) {
    const response = await this.client.call('DELETE', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return response?.ok 
  }

  async create(sectionId: number, options: contenUploadDTO) {
    const {
      channels,
      canPublishNow,
      canSaveAndApprove,
      contentType
    } = await this.prePopulateContentInfo(options.contentTypeID, sectionId)
    const formattedElementNames = this.util.getElementNames(contentType.contentTypeElements)
    options.elements = this.util.lazyMap(options.elements, formattedElementNames)
    const uploadData = contentUploadData({
      channels,
      canPublishNow,
      canSaveAndApprove,
      ...options
    })
    const response = await this.client.call('POST', `${ContentEndpoint}/${sectionId}/${options.language}?prepareForEditor=true`, {
      body: uploadData
    })
    return await response.json()
  }

  async prePopulateContentInfo(contentTypeId: number, sectionId:number): Promise<NewContentDTO> {
    const response = await this.client.call('GET', `${ContentEndpoint}/type/${contentTypeId}/${sectionId}`, null)
    return await response.json()
  }
}



