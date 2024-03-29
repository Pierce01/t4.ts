import { Content } from "./Content.js"
import { ContentType } from "./ContentType.js"
import { Download } from "./Download.js"
import { Elements } from "./utility/Global.js"
import { FormBuilder } from "./FormBuilder.js"
import { Hierarchy } from "./Hierarchy.js"
import { Media } from "./Media.js"
import { MediaCategory } from "./MediaCategory.js"
import { MediaType } from "./MediaType.js"
import { List } from "./List.js"
import { Profile } from "./Profile.js"
import { ServerSideLink } from "./ServerSideLink.js"
import { Type } from "./Type.js"
import { Upload } from "./Upload.js"
import { Version } from "./Version.js"

export class Client {
  url: String
  private token: String
  language: string
  fetch: any

  content: Content
  contentType: ContentType
  download: Download
  formBuilder: FormBuilder
  hierarchy: Hierarchy
  media: Media
  mediaCategory: MediaCategory
  mediaType: MediaType
  list: List
  profile: Profile
  serverSideLink: ServerSideLink
  type: Type
  upload: Upload
  version: Version
  constructor(url: string, token: string, language: string = 'en', _fetch = fetch) {
    this.url = url
    this.token = token
    this.language = language

    this.content = new Content(this)
    this.contentType = new ContentType(this)
    this.download = new Download(this)
    this.formBuilder = new FormBuilder(this)
    this.hierarchy = new Hierarchy(this)
    this.media = new Media(this)
    this.mediaCategory = new MediaCategory(this)
    this.mediaType = new MediaType(this)
    this.list = new List(this)
    this.profile = new Profile(this)
    this.serverSideLink = new ServerSideLink(this)
    this.type = new Type(this)
    this.upload = new Upload(this)
    this.version = new Version(this)

    this.isAuthorized = this.isAuthorized.bind(this)
    this.fetch = _fetch
  }
  
  async call(method: string, endpoint: string, options: any): Promise<Response> {
    if (!this.token) throw Error('Token not specified')
    try {
      let headers: Elements = {
        'authorization': `Bearer ${this.token}`,
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
      }
      if (options?.body && ((typeof options.body == 'object' && !(options.body instanceof FormData)) || Array.isArray(options.body))) {
        options.body = JSON.stringify(options.body)
        headers['content-type'] = 'application/json'
      }
      headers = options?.headers ? Object.assign(options.headers, headers) : headers
      const request = await this.fetch(`${this.url}/${endpoint}`, {
        ...options,
        headers,
        method,
      })
      return request
    } catch (error: any) {
      throw Error(`Request failed due to:\n${error.message}\n${error.cause}`)
    }
  }

  async isAuthorized() {
    return (await this.profile.get()).username !== undefined
  }
}