import { Client, batcher, chunk } from "../esm/index.js"
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../confuig.json', 'utf-8'))
const { media } = new Client(config.url, config.token)

let ids = await media.util.getMediaIDs(config.parent_category)
const bulkWrapper = async ids => await media.bulkGetMediaUsage(ids, 'en')
ids = chunk(ids, 100)
fs.writeFileSync('../output1.json', JSON.stringify(await batcher(ids, 30, 1000, bulkWrapper), null, 2))
