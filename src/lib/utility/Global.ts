export interface UserProfileView {
  firstName:               string;
  lastName:                string;
  username:                string;
  emailAddress:            string;
  defaultLanguage:         string;
  oldPassword?:            string;
  newPassword?:            string;
  newPasswordConfirm?:     string;
  uiLocale:                string;
  htmlEditorId:            string;
  defaultPreviewChannelId: string;
  userLevel:               string;
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

export interface Content {
  id:                       string;
  contentTypeID:            string;
  archiveSection:           string;
  publishDate:              Date;
  reviewDate:               Date;
  expiryDate:               Date;
  language:                 string;
  name:                     string;
  alternativeLanguages:     AlternativeLanguages;
  status:                   string;
  lastModified:             Date;
  lastModifiedBy:           string;
  lastModifierName:         string;
  contentTypeName:          string;
  contentTypeAlias:         string;
  owner:                    Owner;
  version:                  string;
  previousVersion:          string;
  channels:                 string;
  mirroredSectionPaths:     Elements;
  editable:                 string;
  expired:                  string;
  lock:                     Lock;
  canPublishNow:            string;
  canSaveAndApprove:        string;
  contentTypeAccess:        string;
  contentTypeLock:          Lock;
  elements:                 Elements;
  contentType:              ContentType;
  types:                    Types;
  insertAtIndex:            string;
  sortLock:                 string;
  excludedMirrorSectionIds: string;
  locked:                   string;
  sectionIDs:               string;
}

export interface AlternativeLanguages {
  language: string;
  name:     string;
}

export interface ContentType {
  id:                   string;
  name:                 string;
  description:          string;
  type:                 string;
  editable:             string;
  primaryGroup:         PrimaryGroup;
  sharedGroups:         string;
  alias:                string;
  workflow:             string;
  systemTemplate:       string;
  sharedGroupCount:     string;
  contentTypeElements:  string;
  metaMapped:           string;
  lock:                 Lock;
  minAuthLevel:         string;
  enableDirectEdit:     string;
  elementIdforFilename: string;
  warningMessage:       string;
  sectionId:            string;
  duplicate:            string;
  duplicatedFromId:     string;
  fullyAccessible:      string;
}

export interface FileDownload {
  name: string
  file?: string
  mimeType?: string
  fileLocation: string
  code?: string
  cleanUp?: boolean
  contentID?: number
  language?: string
  version?: Version
  element?: string
}

export interface Version {
  version: string
  subMinor: number
  major: number
  minor: number
}

export interface Lock {
  assetID:     string;
  assetType:   string;
  lockType:    string;
  expiry:      string;
  owner:       string;
  ownerName:   string;
  currentUser: string;
  language:    string;
}

export interface PrimaryGroup {
  ownershipLevel: string;
  group:          string;
  assetID:        string;
  groupID:        string;
  assetType:      string;
  readLevel:      string;
  groupName:      string;
}

export interface Owner {
  id:   string;
  type: string;
}

export interface Types {
  id:       string;
  name:     string;
  listType: string;
}

export interface ContentDTO {
  id:                       string;
  contentTypeID:            string;
  archiveSection:           string;
  publishDate:              Date;
  reviewDate:               Date;
  expiryDate:               Date;
  language:                 string;
  name:                     string;
  alternativeLanguages:     string;
  status:                   string;
  lastModified:             Date;
  lastModifiedBy:           string;
  lastModifierName:         string;
  contentTypeName:          string;
  contentTypeAlias:         string;
  owner:                    Owner;
  version:                  string;
  previousVersion:          string;
  channels:                 string;
  mirroredSectionPaths:     Elements;
  editable:                 string;
  expired:                  string;
  lock:                     Lock;
  canPublishNow:            string;
  canSaveAndApprove:        string;
  contentTypeAccess:        string;
  contentTypeLock:          Lock;
  elements:                 Elements;
  contentType:              ContentType;
  types:                    string;
  insertAtIndex:            string;
  sortLock:                 sortLock;
  excludedMirrorSectionIds: string;
  locked:                   string;
  sectionIDs:               string;
}

export type sortLock = 'TOP' | 'BOTTOM' | 'UNLOCKED'
export interface Lock {
  assetID:     string;
  assetType:   string;
  lockType:    string;
  expiry:      string;
  owner:       string;
  ownerName:   string;
  currentUser: string;
  language:    string;
}

export interface Elements {
  [Key: string]: string;
}
export interface InheritedPageLayouts extends Elements {}

export interface Owner {
  id:   string;
  type: string;
}

export interface AccessControl {
  id:      string;
  type:    string;
  enabled: string;
  active:  string;
}
export interface MetaData extends AccessControl {}

export interface Channels {
  id:                  string;
  pageLayout:          string;
  inheritedPageLayout: string;
  valid:               string;
}
export interface AppliedPageLayoutsDTO extends Channels {}

export interface ContentTypeScopes {
  id:        string;
  scope:     string;
  inherited: string;
}

export interface LinkInfo {
  type:          string;
  section:       string;
  url:           string;
  language:      string;
  target:        string;
  accessControl: string;
  override:      string;
  overridden:    string;
}

export interface MetaDatas {
  id:    string;
  value: string;
  lang:  string;
}

export interface MediaItemTableData {
  draw:            string;
  recordsTotal:    string;
  recordsFiltered: string;
  accessLevel:     string;
  mediaRows:       MediaRow[];
}

export interface MediaRow {
  id:               string;
  status:           string;
  language:         string;
  name:             string;
  description:      string;
  version:          string;
  fileName:         string;
  fileSize:         string;
  mediaTypeName:    string;
  thumbnailURL:     string;
  binaryLanguage:   string;
  lock:             string;
  numberOfVariants: string;
  lastModified:     Date;
}

export interface Category {
  id: number
  language: string
  name: string
  accessLevel: number
  status: number
  children: Category[]
  lastModified: string
  printSequence: number
  open: boolean
}