export interface ContentDto {
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

export interface ContentType {
  id:                   string;
  name:                 string;
  description:          string;
  type:                 string;
  editable:             string;
  primaryGroup:         string;
  sharedGroups:         string;
  alias:                string;
  workflow:             string;
  systemTemplate:       string;
  sharedGroupCount:     string;
  contentTypeElements:  string;
  metaMapped:           string;
  lock:                 string;
  minAuthLevel:         string;
  enableDirectEdit:     string;
  elementIdforFilename: string;
  warningMessage:       string;
  sectionId:            string;
  duplicate:            string;
  duplicatedFromId:     string;
  fullyAccessible:      string;
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

export interface InheritedPageLayouts extends Elements {}

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
