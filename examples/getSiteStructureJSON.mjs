import { Client } from '../esm/index'
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../confuig.json', 'utf-8'))
const { hierarchy } = new Client(config.url, config.token)

const parentID = 1
const response = await hierarchy.section.get(parentID)
fs.writeFileSync('./output.json', response)
