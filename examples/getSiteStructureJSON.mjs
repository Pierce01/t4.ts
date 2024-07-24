import { Client } from 't4.ts'
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'))
const { hierarchy } = new Client(config.url, config.token)

const parentID = 1
const response = await hierarchy.getSection(parentID)
console.log(response)
