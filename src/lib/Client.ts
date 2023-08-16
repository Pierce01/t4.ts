import { Elements, UserProfileView } from "./utility/Global.js"
import { Hierarchy } from "./Hierarchy.js"
import { Profile } from "./Profile.js"
import { Content } from "./Content.js"
import { ContentType } from "./ContentType.js"
import { Media } from "./Media.js"
import { MediaCategory } from "./MediaCategory.js"
import { MediaType } from "./MediaType.js"
import { Download } from "./Download.js"

export class Client {
  url: String
  private token: String

  hierarchy: Hierarchy
  profile: Profile
  content: Content
  contentType: ContentType
  media: Media
  mediaCategory: MediaCategory
  mediaType: MediaType
  download: Download
  constructor(url: string, token: string) {
    this.url = url
    this.token = token

    this.hierarchy = new Hierarchy(this)
    this.profile = new Profile(this)
    this.content = new Content(this)
    this.contentType = new ContentType(this)
    this.media = new Media(this)
    this.mediaCategory = new MediaCategory(this)
    this.mediaType = new MediaType(this)
    this.download = new Download(this)
  }
  
  async call(method: string, endpoint: string, options: any) {
    if (!this.token) throw Error('Token not specified')
    try {
      let headers: Elements = {
        'authorization': `Bearer ${this.token}`,
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'connection': 'keep-alive'
      }
      if (options?.body && ((typeof options.body == 'object' && !(options.body instanceof FormData)) || Array.isArray(options.body))) {
        options.body = JSON.stringify(options.body)
        headers['content-type'] = 'application/json'
      }
      headers = options?.headers ? Object.assign(options.headers, headers) : headers
      const request = await fetch(`${this.url}/${endpoint}`, {
        ...options,
        headers,
        method,
      })
      return request
    } catch (error) {
      throw Error(`Request failed due to:\n${error}`)
    }
  }

  async verify(): Promise<UserProfileView> {
    return await this.profile.get()
  }
}