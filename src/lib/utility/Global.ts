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

export enum MediaTypeCodes {
  Image = 1,
  MicrosoftOfficeDocument,
  PDF,
  StylesheetCss,
  JavascriptFileProgrammableLayout,
  Font,
  PHP,
  JavascriptFileOnPageJavascript,
  WebDavCSS,
  ImageGallery,
  MP3,
  XMLDocument,
  XBM,
  MP4,
  Text,
  ASPX,
  KML,
  ZIP,
  wat,
  CSV,
  ICS,
  Mobileconfig,
  htaccess,
  DXF,
  JSON,
  Ebook,
  PHAR,
  iCal,
  CommonCartridgeCanvasCourse,
  Javascript
}

export enum SyntaxTypeCodes {
  None,
  Javascript,
  CSS,
  HTML,
  PHP,
  Java
}

export type SyntaxTypeObjects = {
  Javascript: {
    id: SyntaxTypeCodes.Javascript,
    name: "Javascript",
    mime_code: "text/javascript"
  },
  CSS: {
    id: SyntaxTypeCodes.CSS,
    name: "Stylesheet CSS",
    mime_code: "text/css"
  },
  HTML: {
    id: SyntaxTypeCodes.HTML,
    name: "HTML/XML",
    mime_code: "application/xml"
  },
  PHP: {
    id: SyntaxTypeCodes.PHP,
    name: "PHP",
    mime_code: "application/x-httpd-php"
  },
  Java: {
    id: SyntaxTypeCodes.Java,
    name: "Java",
    mime_code: "text/x-java"
  },
}

export interface MediaUpload {
  name: string,
  description: string,
  type: MediaTypeCodes,
  syntaxType?: SyntaxTypeCodes,
  myMedia?: 0 | 1,
  version?: string,
  binaryLanguage?: 'smxx' | string,
  file: string,
  keywords?: string[],
  language: string,
  categoryID: string | number,
  fileName?: string
}

export interface MediaData {
  [key: string]: string | Blob,
  name: string,
  description: string,
  type: string,
  syntaxType: string,
  myMedia: string,
  elements: string,
  version: string,
  binaryLanguage: string,
  file: Blob,
  language: string,
  categories: string,
  fileName: string,
}

export function MediaUploadData(data: MediaUpload): MediaData {
  return {
    name: data.name,
    description: data.description,
    type: String(data.type),
    file: new Blob([data.file]),
    syntaxType: String(data.syntaxType || 0),
    myMedia: String(data.myMedia || 0),
    elements: JSON.stringify({'keywords#9:undefined': `${data.keywords?.join(', ') || ''}`}),
    version: data.version || 'undefined',
    binaryLanguage: data.binaryLanguage || 'smxx',
    fileName: String(data.fileName),
    language: data.language || 'smxx',
    categories: String(data.categoryID)
  }
}

export interface Read {
  section: HierarchyNodeDTO
  recursionDepth: number
  activeNode: number
  mode?: string
  override?: number
  mirrorStructure?: boolean
  showContentInfo: boolean
  showWidget?: boolean
  onlySectionsAllowingContents?: boolean
  openNodes: number[]
  showLinkSections?: boolean
  showFullTree?: boolean
  showAllSections: boolean
  expandCollapseAllChildren: boolean
  restrictedToPermitedSections: boolean
  language?: string
  channel?: number
  id?: number
  valid?: boolean
  asShowInactive?: boolean
  asShowHidden?: boolean
  asExplode?: boolean
}

export interface HierarchyNodeDTO {
  id: number
  channel: number
  language: string
}

export interface HierarchySection {
  id: number
  names: Elements
  hasChildren: boolean
  open: boolean
  getcountContentApproved: number
  getcountContentPending: number
  getcountContentInactive: number
  visible: boolean
  archive: boolean
  seoCheckingResult: number
  accessibilityCheckingResult: number
  status: number
  icon: string
  mirrorType: string
  subsections: HierarchySection[]
  link: boolean
  lastModified: string
  printSequence: number
  language: string
  showOptionsMenu: boolean
  path: string
  enablePublish: boolean
  allowUserModifySections: boolean
  name: string
  publishEnabled: boolean
  userAllowedModifySections: boolean
}