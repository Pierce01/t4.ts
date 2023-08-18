import { Client, batcher, chunk } from "../esm/index.js"
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'))
const { media } = new Client(config.url, config.token)

let ids = await media.util.getMediaIDs(config.parent_category)
const bulkWrapper = async ids => await media.bulkGetMediaUsage(ids, 'en')
ids = chunk(ids, 100)
const result = await batcher(ids, 30, 1000, bulkWrapper)
console.log(result)
