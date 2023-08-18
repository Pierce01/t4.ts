import { Client } from "../esm/index.js"
import * as fs from 'fs'

const config = JSON.parse(fs.readFileSync('../../config.json', 'utf-8'))
const { hierarchy } = new Client(config.url, config.token)
// The ID of the parent section. All the subsections will be updated with the
// fields and values in 'options'
const parentID = 26199

const options = { show: true }
const parentSection = (await hierarchy.section.get(parentID))[0]
if (!parentSection.hasChildren || !parentSection.subsections) throw Error('Section has no child sections to mark.')
const traverseSubsection = async (subsection) => {
  for(let section of subsection) {
    if (section.status != 0) { console.log(`${section.id} not updated due to being inactive/pending`); continue }
    try {
      const updated = await hierarchy.update(section.id, 'en', options)
      console.log(`${section.id} ${updated ? 'Updated' : 'Failed'}`)
      if (section.hasChildren) await traverseSubsection(section.subsections)
    } catch (error) {
      console.log(`Failed to mark ${section.id} due to ${error}`)
    }
  }
}
await traverseSubsection(parentSection.subsections)
