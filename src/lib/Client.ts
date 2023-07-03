import { Elements } from "./utility/Global.js"
import { Hierarchy } from "./Hierarchy.js"
import { Profile } from "./Profile.js"
import { Content } from "./Content.js"
import { Download } from "./Download.js"

export class Client {
  url: String
  private token: String

  hierarchy: Hierarchy
  profile: Profile
  content: Content
  download: Download
  constructor(url: String, token: String) {
    this.url = url
    this.token = token

    this.hierarchy = new Hierarchy(this)
    this.profile = new Profile(this)
    this.content = new Content(this)
    this.download = new Download(this)
  }
  
  async call(method: string, endpoint: string, options: any) {
    if (!this.token) throw Error('Token not specified')
    try {
      let headers: Elements = {
        'authorization': `Bearer ${this.token}`,
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9'
      }
      if (options?.body && typeof options.body == 'object') {
        options.body = JSON.stringify(options.body)
        headers['content-type'] = 'application/json'
      }
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

  setToken(token: string) {
    this.token = token
  }

  setURL(url: string) {
    this.url = url
  }

  verify() {
    // Check if client can make requests
  }
}