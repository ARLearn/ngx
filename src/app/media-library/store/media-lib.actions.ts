import {Action} from '@ngrx/store';


export const MediaLibraryActionTypes = {
    GET_FOLDER_LIST_REQUESTED: '[MediaLibrary] Get Folderlist Requested',
    GET_FOLDER_LIST_COMPLETED: '[MediaLibrary] Get Folderlist Completed',

    SET_FILES_TO_UPLOAD: '[MediaLibrary] Set Files to upload',
    START_UPLOAD: '[MediaLibrary] (re)start upload',
    UPDATE_UPLOAD: '[MediaLibrary] update upload',

    SELECT_FILE: '[MediaLibrary] select file',
    DELETE_SELECT_FILE: '[MediaLibrary] delete select file',
    // DELETE_SELECT_FILE: '[MediaLibrary] delete select file',

    SET_UPLOAD_MODUS: '[MediaLibrary] Set Upload Modus',
    SET_ABSPATH: '[MediaLibrary] Set Absolute Path',
    SET_RELPATH: '[MediaLibrary] Set Relative Path',

    CREATE_FOLDER: '[MediaLibrary] Create Folder',
    CREATE_FOLDER_COMPLETE: '[MediaLibrary] Create Folder Complete',
};

export class GetFolderListRequestAction implements Action {
    type = MediaLibraryActionTypes.GET_FOLDER_LIST_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class GetFolderListCompletedAction implements Action {
    type = MediaLibraryActionTypes.GET_FOLDER_LIST_COMPLETED;

    constructor(public payload: any = null) {
    }
}

export class SetFilesToUploadAction implements Action {
    type = MediaLibraryActionTypes.SET_FILES_TO_UPLOAD;

    constructor(public payload: { files: FileList }) {
    }
}

export class StartUploadAction implements Action {
    type = MediaLibraryActionTypes.START_UPLOAD;

    constructor(public payload: any = null) {
    }
}

export class UpdateUpload implements Action {
    type = MediaLibraryActionTypes.UPDATE_UPLOAD;

    constructor(public payload: {
        filename: string;
        value: number;
        completed: boolean;
    }) {
    }
}


export class SelectFileAction implements Action {
    type = MediaLibraryActionTypes.SELECT_FILE;

    constructor(public payload: { file: string; multiSelect: boolean }) {
    }
}

export class DeleteSelectFileAction implements Action {
    type = MediaLibraryActionTypes.DELETE_SELECT_FILE;

    constructor(public payload: any =  null) {
    }
}

export class SetUploadModusAction implements Action {
    type = MediaLibraryActionTypes.SET_UPLOAD_MODUS;

    constructor(public payload: { modus: boolean }) {
    }
}

export class SetAbsolutePathAction implements Action {
    type = MediaLibraryActionTypes.SET_ABSPATH;

    constructor(public payload: { gameId: number }) {
    }
}

export class SetRelativePathAction implements Action {
    type = MediaLibraryActionTypes.SET_RELPATH;

    constructor(public payload: { relativePath: string }) {
    }
}

export class CreateFolderAction implements Action {
    type = MediaLibraryActionTypes.CREATE_FOLDER;

    constructor(public payload: { name: string }) {
    }
}

export class CreateFolderCompletedAction implements Action {
    type = MediaLibraryActionTypes.CREATE_FOLDER_COMPLETE;

    constructor(public payload: any) {
    }
}


export type MediaLibraryAction
    = GetFolderListRequestAction
    | GetFolderListCompletedAction
    | SetUploadModusAction
    | StartUploadAction
    ;
