import { Action } from "@ngrx/store";

import { MediaGalleryItem, PortalImage } from "./portal-images.state";

export enum PortalImagesActionTypes {
    QUERY = '[PortalImages] Query',
    QUERY_RESPONSE = '[PortalImages] Query Response',

    SEARCH = '[PortalImages] Search',
    SEARCH_RESPONSE = '[PortalImages] Search Response',

    CREATE = '[PortalImages] Create Request',

    CREATE_FOLDER = '[PortalImages] Create folder',
    SELECT_FOLDER = '[PortalImages] Select folder',
    SELECT_FOLDER_RESPONSE = '[PortalImages] Select folder Response',
    SELECT_FILE = '[PortalImages] Select file',

    DELETE_FOLDER = '[PortalImages] Delete folder',
    DELETE_FOLDER_RESPONSE = '[PortalImages] Delete folder response',
    DELETE_SELECTED_FILES = '[PortalImages] Delete selected files',
    DELETE_SELECTED_FILES_RESPONSE = '[PortalImages] Delete selected files response',

    GO_BACK_TO = '[PortalImages] Go back to',
    GO_BACK_TO_RESPONSE = '[PortalImages] Go back to Response',
}

export class Query implements Action {
    readonly type = PortalImagesActionTypes.QUERY;

    constructor(public payload: MediaGalleryItem = null, public isGoBack: boolean) {
    }
}

export class QueryResponse implements Action {
    readonly type = PortalImagesActionTypes.QUERY_RESPONSE;

    constructor(public payload: { files: MediaGalleryItem[], folders: MediaGalleryItem[], selectedFolder: MediaGalleryItem }) {
    }
}

export class Search implements Action {
    readonly type = PortalImagesActionTypes.SEARCH;

    constructor(public payload: string) {
    }
}

export class SearchResponse implements Action {
    readonly type = PortalImagesActionTypes.SEARCH_RESPONSE;

    constructor(public payload: PortalImage[]) {
    }
}

export class CreateImage implements Action {
    readonly type = PortalImagesActionTypes.CREATE;

    constructor(public payload: PortalImage) {
    }
}

export class CreateFolder implements Action {
    readonly type = PortalImagesActionTypes.CREATE_FOLDER;

    constructor(public payload: string) {
    }
}

export class DeleteFolder implements Action {
    readonly type = PortalImagesActionTypes.DELETE_FOLDER;

    constructor(public payload: string) {
    }
}

export class DeleteFolderResponse implements Action {
    readonly type = PortalImagesActionTypes.DELETE_FOLDER_RESPONSE;

    constructor(public payload: string) {
    }
}

export class SelectFolder implements Action {
    readonly type = PortalImagesActionTypes.SELECT_FOLDER;

    constructor(public payload: MediaGalleryItem) {
    }
}

export class SelectFolderResponse implements Action {
    readonly type = PortalImagesActionTypes.SELECT_FOLDER_RESPONSE;

    constructor(public payload: MediaGalleryItem) {
    }
}

export class SelectFile implements Action {
    readonly type = PortalImagesActionTypes.SELECT_FILE;

    constructor(public payload: string, public multiSelect: boolean) {
    }
}

export class GoBackTo implements Action {
    readonly type = PortalImagesActionTypes.GO_BACK_TO;

    constructor(public payload: MediaGalleryItem) {
    }
}

export class GoBackToResponse implements Action {
    readonly type = PortalImagesActionTypes.GO_BACK_TO_RESPONSE;

    constructor(public payload: MediaGalleryItem) {
    }
}

export class DeleteSelectedFiles implements Action {
    readonly type = PortalImagesActionTypes.DELETE_SELECTED_FILES;

    constructor(public payload = null) {
    }
}

export class DeleteSelectedFilesResponse implements Action {
    readonly type = PortalImagesActionTypes.DELETE_SELECTED_FILES_RESPONSE;

    constructor(public payload = null) {
    }
}




export type PortalImageActions =
    | Query
    | QueryResponse
    | SearchResponse
    | SelectFolderResponse
    | SelectFile
    | GoBackToResponse
    | DeleteSelectedFilesResponse
    | DeleteFolderResponse;
