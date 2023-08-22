import { Client } from "./Client"
import { FormBuilderResponseDTO } from "./utility/Global"

export const FormBuilderEndpoint = 'formbuilder'
export class FormBuilder {
  private client: Client
  constructor(client: Client) {
    this.client = client
  }

  async list(language: string = 'en'): Promise<FormBuilderResponseDTO> {
    const response = await this.client.call('POST', `${FormBuilderEndpoint}/${language}`, {
      body: 'draw=5&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=name&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=lastModified&columns%5B1%5D%5Bname%5D=lastModified&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=usage&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=actions&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
    return await response.json()
  }
}

