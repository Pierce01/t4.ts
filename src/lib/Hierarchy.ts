import { Client } from './Client.js';
import { Channels, ContentTypeScopes, MetaDatas, MetaData, 
         LinkInfo, AccessControl, sortLock, InheritedPageLayouts } from './utility/Global.js';

export const HierarchyEndpoint = 'hierarchy'
export class Hierarchy {
  private client: Client;
  constructor(client: Client) {
    this.client = client
  }

  async get(id: number, language: string) {
    const response = await this.client.call('GET', `${HierarchyEndpoint}/${id}/${language}`, null)
    return response?.ok ? await response.json() as SectionDTO : null
  }

  async delete(section:number | SectionDTO) {
    const id = typeof section == 'number' ? section : section.id
    
  }

}

export interface SectionDTO {
  id:                     string;
  parent:                 string;
  name:                   string;
  description:            string;
  outputUrl:              string;
  outputFilename:         string;
  accessKey:              string;
  keyPhrase:              string;
  status:                 string;
  workflow:               string;
  parentWorkflowName:     string;
  show:                   string;
  iseForm:                string;
  archive:                string;
  lastModified:           Date;
  printSequence:          string;
  contentSortMethod:      string;
  sectionSortMethod:      string;
  path:                   string;
  mirrorOf:               string;
  sourceOfMirror:         string;
  link:                   string;
  channels:               Channels;
  userIDs:                string;
  inheritedUserIDs:       string;
  groupIDs:               string;
  inheritedGroupIDs:      string;
  viewUserIDs:            string;
  viewGroupIDs:           string;
  contentTypeScopes:      ContentTypeScopes;
  metaDatas:              MetaDatas;
  linkInfo:               LinkInfo;
  excludedMirrorSections: string;
  workflowName:           string;
  parentWorkflowID:       string;
  accessControl:          AccessControl;
  metaData:               MetaData;
  pathMembers:            string;
  sortLock:               sortLock;
  editable:               string;
  inheritedLinkSection:   string;
  accessControlEnabled:   string;
  accessControlType:      string;
  metaDataType:           string;
  accessControlInherited: string;
  allowedGroups:          string;
  mirrorOfPath:           string;
  inheritedPageLayouts:   InheritedPageLayouts;
  outputUriEnabled:       string;
  publishEnabled:         string;
  outputFilenameEnabled:  string;
  spellCheckEnabled:      string;
  pathAsOutputUriEnabled: string;
}
