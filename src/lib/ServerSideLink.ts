import { Client } from "./Client.js"
import { ServerSideLinkData, ServerSideLinkDTO } from "./utility/Global.js"

export const ServerSideLinkEndpoint = 'ssl'
export class ServerSidLink {
  private client: Client
  id: number
  constructor(client: Client) {
    this.client = client
    this.id = 0
  }

  async set(options: ServerSideLinkData) {

  } 

  async delete() {

  }

  async modify() {

  }

  async get() {

  }

  async getSelectedContentsLinks() {

  }

  async getLinks() {

  }
}

