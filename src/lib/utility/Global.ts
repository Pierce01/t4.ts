export const max = 999999
export const min = 100000

export type UserProfileView = {
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

export type SectionDTO = {
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

export type Content = {
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
  contentType:              ContentTypeDTO;
  types:                    Type[];
  insertAtIndex:            string;
  sortLock:                 string;
  excludedMirrorSectionIds: string;
  locked:                   string;
  sectionIDs:               string;
}

export type AlternativeLanguages = {
  language: string;
  name:     string;
}

export type ContentTypeDTO = {
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
  contentTypeElements:  ContentTypeElement[];
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

export type FileDownload = {
  name: string
  file?: string
  mimeType?: string
  fileLocation: string
  code?: string
  cleanUp?: boolean
  contentID?: number
  language?: string
  version?: FileVersion
  element?: string
}

export type FileVersion = {
  version: string
  subMinor: number
  major: number
  minor: number
}

export type Lock = {
  assetID:     string;
  assetType:   string;
  lockType:    string;
  expiry:      string;
  owner:       string;
  ownerName:   string;
  currentUser: string;
  language:    string;
}

export type PrimaryGroup = {
  ownershipLevel: string;
  group:          string;
  assetID:        string;
  groupID:        string;
  assetType:      string;
  readLevel:      string;
  groupName:      string;
}

export type ContentDTO = {
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
  contentTypeElements?:     Elements;
  contentType:              ContentTypeDTO;
  types:                    Type[];
  insertAtIndex:            string;
  sortLock:                 sortLock;
  excludedMirrorSectionIds: string;
  locked:                   string;
  sectionIDs:               string;
}

export type sortLock = 'TOP' | 'BOTTOM' | 'UNLOCKED'

export type Elements = {
  [Key: string]: string;
}
export type InheritedPageLayouts = Elements

export type Owner = {
  id:   string;
  type: string;
}

export type AccessControl = {
  id:      string;
  type:    string;
  enabled: string;
  active:  string;
}
export type MetaData = AccessControl

export type Channels = {
  id:                  string;
  pageLayout:          string;
  inheritedPageLayout: string;
  valid:               string;
}
export type AppliedPageLayoutsDTO = Channels

export type ContentTypeScopes = {
  id:        string;
  scope:     string;
  inherited: string;
}

export type LinkInfo = {
  type:          string;
  section:       string;
  url:           string;
  language:      string;
  target:        string;
  accessControl: string;
  override:      string;
  overridden:    string;
}

export type MetaDatas = {
  id:    string;
  value: string;
  lang:  string;
}

export type MediaItemTableData = {
  draw:            string;
  recordsTotal:    string;
  recordsFiltered: string;
  accessLevel:     string;
  mediaRows:       MediaRow[];
}

export type MediaItemDTO = {
  id: number
  contentTypeID: number
  archiveSection: number
  language: string
  name: string
  status: number
  lastModifiedBy: number
  version: string
  editable: boolean
  expired: boolean
  canPublishNow: boolean
  canSaveAndApprove: boolean
  contentTypeAccess: number
  elements: Elements
  contentType: ContentTypeDTO
  types: Type[]
  syntax: number
  type: number
  binaryLanguage: string
  categories: number[]
  description: string
  typeName: string
  mediaURL: string
  thumbnailURL: string
  mediaPath: string
  mediaSize: number
  fileName: string
  variant: number
  variantName: string
  variantDimensions: string
  accessLevel: number
  mediaCanHaveVariants: boolean
}

export type MediaRow = {
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

export type MediaCategoryObject = {
  id: number
  language: string
  name: string
  accessLevel: number
  status: number
  children: MediaCategoryObject[]
  lastModified: string
  printSequence: number
  open: boolean
}

export type NewMediaCategoryDTO = {
  description: string
  archive: boolean
  status: string
  show: boolean
  eForm: boolean
  "output-uri": string
  parent: string
  name: string
  workflow: string
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

export type MediaUpload = {
  name: string,
  description: string,
  type: MediaTypeCodes,
  syntaxType?: SyntaxTypeCodes,
  myMedia?: 0 | 1,
  version?: string,
  binaryLanguage?: 'smxx' | string,
  file: string | Blob,
  keywords?: string[],
  language: string,
  categoryID: string | number,
  fileName?: string
}

export type MediaData = {
  [key: string]: string | Blob,
  name: string,
  description: string,
  type: string,
  syntaxType: string,
  myMedia: string,
  elements: string,
  version: string,
  binaryLanguage: string,
  language: string,
  categories: string,
  fileName: string,
}

export function MediaUploadData(data: Partial<MediaUpload>, existingMedia?: MediaItemDTO): MediaData {
  data = {...existingMedia, ...data} 
  return {
    name: data.name || 'undefined',
    description: data.description || 'undefined',
    type: String(data.type || 1),
    syntaxType: String(data.syntaxType || 0),
    myMedia: String(data.myMedia || 0),
    elements: ((): string => {
      const elementData: {[key: string]: string} = {}
      const keywords = `keywords#9:${String(data.type)}`
      elementData[keywords] = `${data.keywords?.join(', ') || ''}`
      return JSON.stringify(elementData)
    })(),
    version: data.version || 'undefined',
    binaryLanguage: data.binaryLanguage || 'smxx',
    fileName: String(data.fileName),
    language: data.language || 'smxx',
    categories: String(data.categoryID || existingMedia?.categories[0])
  }
}

export type ReadDTO = {
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

export type HierarchyNodeDTO = {
  id: number
  channel: number
  language: string
}

export type HierarchyResponse = {
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
  subsections: HierarchyResponse[]
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

export type HierarchyContentResponseDTO = {
  id: number,
  contents: HierarchyContentResponse[],
  path: string
}

export type HierarchyContentResponse = {
  id: number,
  name: string,
  status: string,
  lastModified: Date,
  lastModifiedBy: string,
  expired: boolean
}

export type FormBuilderResponseDTO = {
  draw: number
  recordsTotal: number
  recordsFiltered: number
  data: FormDTO[]
}

export type FormDTO = {
  id: number
  name: string
  lastModified: number
  submissionSectionId: number
  restricted: boolean
  incompleteMappings: boolean
  usage: FormUsageDTO[]
  description?: string
}

export type FormUsageDTO = {
  formId: number
  assetId: number
  language: string
  element: string
  type: string
  sectionId: number
  name: string
}

export type MediaUsageDTO = {
  contentName: string
  assetType: string
  variant: string
  location: string
  occurrences: number
  language: string
  contentID: number
  sectionID: number
  hasAccess: boolean
  contentLayoutContentTypeID: number
  mediaID: number
  variantUsage: boolean
}

export type contenUploadDTO = {
  id?: number
  channels?: number[]
  canPublishNow?: boolean
  canSaveAndApprove?: boolean
  status: number
  elements: Elements
  contentTypeID: number
  language: string
  publishDate?: Date | null
  expiryDate?: Date | null
  reviewDate?: Date | null
  archiveSection: any
  owner: Owner
  excludedMirrorSectionIds: number[]
}

export function contentUploadData(options: contenUploadDTO) {
  const {
    archiveSection,
    canPublishNow,
    canSaveAndApprove,
    channels,
    contentTypeID,
    elements,
    excludedMirrorSectionIds,
    expiryDate,
    language,
    owner,
    publishDate,
    reviewDate,
    status
  } = options
  return {
    archiveSection,
    canPublishNow,
    canSaveAndApprove,
    channels,
    contentTypeID,
    elements,
    excludedMirrorSectionIds: excludedMirrorSectionIds || [],
    expiryDate,
    language,
    owner: owner || {id: 0, type: "USER"},
    publishDate,
    reviewDate,
    status,
    id: Math.floor(-Math.abs(Math.random() * (max - min) + min)),
  }
}

export type NewContentDTO = {
  contentType: ContentTypeDTO
  channels: number[]
  types: Type[]
  canPublishNow: boolean
  canSaveAndApprove: boolean
}

export type ContentTypeElement = {
  id: number
  contentTypeID: number
  name: string
  description: string
  type: number
  maxSize: number
  compulsory: boolean
  input_method: number
  listId: number
  sequence: number
  alias: string
  show: boolean
  binary: boolean
}

export type Type = {
  id: number
  name: string
  listType: boolean
}

export type UploadObject = {
  file: string,
  filename: string,
  elementID: string
}

export type UploadData = {
  [key: string]: string | Blob,
  file: Blob,
  filename: string,
  elementID: string
}

export type UploadDTO = {
  code: string
  name: string
}

export type UploadListDTO = {
  [key: string] : {
    code: string
    name: string
  }
}

export type ServerSideLinkData = {
  useDefaultLinkText?: boolean
  fromSection: number
  toSection: number
  fromContent: number
  toContent?: number
  linkText?: string
  language: string
  toLanguage?: string
  attributes?: any
  path?: string
  active: boolean
}

export type ServerSideLinkDTO = ServerSideLinkData & {
  id: number
  broken: boolean
}

export type PredefinedListDTO = {
  id: number
  language: string
  name: string
  description: string
  isForcedLanguage: boolean
  isDefaultLanguage: boolean
  items: ListItem[]
  duplicate: boolean
  listEntriesWithListSubLists: any[]
  cteWithListsAsElements: CteWithListsAsElement[]
  formsUsingThisList: FormDTO[]
  sortingEnabled: boolean
  listOverriddenInAnotherLanguage: boolean
  defaultLanguageSetInAnotherLanguage: boolean
  sortType: number
  editable: boolean
  primaryGroup: Partial<ListPrimaryGroup>
  sharedGroups: any[]
  sharedGroupCount: number
  fullAccess: boolean
}

export type ListItem = {
  name: string
  value: string
  sequence: number
  id: number
  isSelected: boolean
  sublist: number
  listId: number
}

export type CteWithListsAsElement = {
  name: string
  description: string
  typeID: number
  type: ListType
  maxSize: number
  compulsory: boolean
  sequence: number
  alias: string
  show: boolean
  id: number
  contentType: number
  listId: number
}

export type ListType = {
  id: number
  name: string
  description: string
  storageMethod: number
  binary: boolean
  elementClass: string
  inputClass: string
  extensionChecking: boolean
  enabled: boolean
}

export type ListPrimaryGroup = {
  group: Group
  fullAccess: boolean
  id: number
  name: string
}

export type Group = {
  id: number
  name: string
  description: string
  emailAddress: string
  createDate: number
  enabled: boolean
  ldap: boolean
  defaultChannel: number
  deleted: boolean
}

export type VersionDTO = {
  language: string
  version: string
  name: string
  lastModified: number
  lastModifierName: string
  owner: number
  lastModifiedBy: number
  previousVersion: string
  status: number
}