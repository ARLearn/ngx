import {Action} from "@ngrx/store";
import {MediaGalleryItem, PortalImage} from "./portal-images.state";

export enum PortalImagesActionTypes {
    QUERY = '[PortalImages] Query',
    QUERY_RESPONSE = '[PortalImages] Query Response',

    CREATE = '[PortalImages] Create Request',

    SELECT_FOLDER = '[PortalImages] Select folder',
    SELECT_FOLDER_RESPONSE = '[PortalImages] Select folder Response',

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


export class CreateImage implements Action {
    readonly type = PortalImagesActionTypes.CREATE;

    constructor(public payload: PortalImage) {
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



export type PortalImageActions =
    | Query
    | QueryResponse
    | SelectFolderResponse
    | GoBackToResponse;
