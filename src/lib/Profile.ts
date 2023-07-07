import { Client } from "./Client.js"
import { UserProfileView } from "./utility/Global.js"

export const ProfileEndpoint = 'profile' 
export class Profile {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async get(): Promise<UserProfileView> {
    const response = await this.client.call('GET', ProfileEndpoint, null)
    return response?.ok ? await response.json() : null
  }

  async update(body: Partial<UserProfileView>) {
    const currentProfile = await this.get()
    if (!currentProfile) throw Error('Failed to get client profile')
    const response = await this.client.call('POST', ProfileEndpoint, {
      body: Object.assign(currentProfile, body),
    })
    return response?.ok ? await response.json() : false
  }
}