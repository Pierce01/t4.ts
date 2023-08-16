import { Client, batcher, chunk } from "../esm/index.js"
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../config.json', 'utf-8'))
const { media } = new Client(config.url, config.token)

await media.add({
  categoryID: 198818,
  name: 'API Test',
  file: 'C:/Users/Pietce/Desktop/7-12-23/IMG_9824.jpg',
  type: 1,
  description: 'Misha!!'
})
