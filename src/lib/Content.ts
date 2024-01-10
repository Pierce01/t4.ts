import { Client } from './Client.js'
import { ContentDTO, contenUploadDTO, NewContentDTO, ContentTypeElement, Elements, contentUploadData, VersionDTO } from './utility/Global.js'

export const ContentEndpoint = 'content'
export class Content {
  private client: Client
  util: {
    getElementNames: (elements: ContentTypeElement[], useAlias?: boolean) => Elements,
    lazyMap: (elements: Elements, formattedNames: Elements) => Elements
    getEmptyElements: (elements: ContentTypeElement[]) => Elements
  }
  constructor(client: Client) {
    this.client = client
    this.util = {
      getElementNames: (elements: ContentTypeElement[], useAlias: boolean = true): Elements => {
        return elements.reduce((elementObj: Elements, { alias, name, id, type }) => {
          elementObj[useAlias ? alias || name : name] = `${name}#${id}:${type}`
          return elementObj
        }, {})
      },
      lazyMap: (elements: Elements, formattedNames: Elements) => {
        let newElements: Elements = {}
        Object.keys(elements).forEach(key => {
          if (formattedNames.hasOwnProperty(key)) {
            newElements[formattedNames[key]] = elements[key]
          }
        })
        return newElements
      },
      getEmptyElements: (elements: ContentTypeElement[]): Elements => {
        return elements.reduce((elementObj: Elements, { name, id, type }) => {
          elementObj[`${name}#${id}:${type}`] = ''
          return elementObj
        }, {})
      }
    }
  }

  async getVersions(contentId: number, language: string = this.client.language): Promise<VersionDTO[]> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version`, null)
    let jsonResp = await response.json()
    if (jsonResp.errorText) {
      jsonResp = await this.client.version.get(contentId, language)
    }
    return jsonResp
  }

  async get(contentId: number, sectionId: number, language: string = this.client.language): Promise<ContentDTO> {
    const response = await this.client.call('GET', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return await response.json()
  }

  async getWithoutSection(contentId: number, version?: string, language: string = this.client.language): Promise<ContentDTO> {
    if (!version) version = (await this.getVersions(contentId, language))[0].version
    const response = await this.client.call('GET', `${ContentEndpoint}/${contentId}/${language}/version/${version}`, null)
    return await response.json()
  }

  async delete(contentId: number, sectionId: number, language: string = this.client.language) {
    const response = await this.client.call('DELETE', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null)
    return response?.ok 
  }

  async create(sectionId: number, options: contenUploadDTO, isFormatted: boolean = false): Promise<ContentDTO> {
    const {
      channels,
      canPublishNow,
      canSaveAndApprove,
      contentType
    } = await this.prePopulateContentInfo(options.contentTypeID, sectionId)
    if(!isFormatted) {
      const formattedElementNames = this.util.getElementNames(contentType.contentTypeElements)
      options.elements = this.util.lazyMap(options.elements, formattedElementNames)
    }
    options.elements = {
      ...this.util.getEmptyElements(contentType.contentTypeElements),
      ...options.elements
    }
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

  async prePopulateContentInfo(contentTypeId: number, sectionId: number): Promise<NewContentDTO> {
    const response = await this.client.call('GET', `${ContentEndpoint}/type/${contentTypeId}/${sectionId}`, null)
    return await response.json()
  }

  async listLinkContent(sectionId: number) {
    const response = await this.client.call('GET', `${ContentEndpoint}/link/${sectionId}`, null)
    return await response.json()
  }

  async modify(contentId: number, sectionId: number, options: ContentDTO, language: string = this.client.language): Promise<ContentDTO> {
    let existingContent = await this.get(contentId, sectionId, language)
    if (!existingContent) throw Error(`Content ${contentId} in section ${sectionId} does not exist`)
    const response = await this.client.call('POST', `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, {
      body: {
        ...existingContent,
        ...options,
        elements: {
          ...existingContent.elements, 
          ...options.elements
        }
      }
    })
    return await response.json()
  }

  async purge(contentIds: number[], language: string = this.client.language): Promise<boolean> {
    const response = await this.client.call('POST', `${ContentEndpoint}/purge`, {
      body: {
        languageCode: language,
        contentIds
      }
    })
    return response.status == 204
  }
}
