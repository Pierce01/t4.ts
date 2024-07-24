import { Client, batcher, chunk } from '../dist'
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'))
const { media } = new Client(config.url, config.token)

await media.add({
  categoryID: 198818,
  name: 'API Test',
  file: 'path',
  type: 1,
  description: 'Misha!!',
  fileName: 'test.jpg'
})
