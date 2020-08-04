import * as actions from './media-lib.actions';
import {FileToUpload, mediaLibraryInitialState, MediaLibraryState} from './media-lib.state';
import * as _ from 'lodash';
import {CurrentGameActionTypes} from "../../game-management/store/current-game.actions";
import {GetFolderListRequestAction} from "./media-lib.actions";
import {MediaLibraryActionTypes} from "./media-lib.actions";
import {AuthActionTypes} from "../../auth/store/auth.actions";

export function reducers(
    state = mediaLibraryInitialState, action: actions.MediaLibraryAction): MediaLibraryState {
    switch (action.type) {

        case actions.MediaLibraryActionTypes.GET_FOLDER_LIST_COMPLETED: {
            if (action.payload.folders.length !== 0) {
                // delete action.payload.folders;
                return Object.assign({}, state, action.payload);
            }
            if (!action.payload.items) {
                action.payload.items = [];
            }
            state.items = [...action.payload.items];
            return Object.assign({}, state);
            // if (!action.payload.folders) {
            //     action.payload.folders = [];
            // }

        }

        case actions.MediaLibraryActionTypes.CREATE_FOLDER: {
            if (_.indexOf(state.folders, action.payload.name) !== -1) {
                console.log("state contains folder", action.payload.name);
                return state;
            }
            state.folders = [...state.folders, action.payload.name];
            return Object.assign({}, state);
        }

        case actions.MediaLibraryActionTypes.SET_UPLOAD_MODUS: {
            return Object.assign({}, state, {uploadModus: action.payload.modus});
        }

        case actions.MediaLibraryActionTypes.SET_FILES_TO_UPLOAD: {
            if (action.payload.customPath) {
                const fl: FileList = action.payload.files;
                return Object.assign({}, state, {
                    filesToUpload: [{
                        uploading: false,
                        completed: false,
                        customPath: true,
                        pathPrefix: action.payload.customPath,
                        file: Array.from(fl)[0]
                    }]
                });
            }
            const fl: FileList = action.payload.files;
            const ar = Array.from(fl).map((file: File) => {
                return {
                    uploading: false,
                    completed: false,
                    customPath: false,
                    pathPrefix: state.absolutePath + state.relativePath,
                    file: file
                };
            });
            return Object.assign({}, state, {filesToUpload: ar});
        }

        case actions.MediaLibraryActionTypes.SELECT_FILE: {
            if (!action.payload.multiSelect) {
                state.selectedFiles = [action.payload.file];
            } else {
                const index = state.selectedFiles.indexOf(action.payload.file);
                if (index === -1) {
                    state.selectedFiles = [...state.selectedFiles, action.payload.file];
                } else {
                    state.selectedFiles = state.selectedFiles.filter(element => element !== action.payload.file);
                }
            }
            return Object.assign({}, state);
        }
        case CurrentGameActionTypes.GET_CURRENT_GAME_FROM_ROUTER_REQUESTED: {
            state.selectedFiles = [];
            return Object.assign({}, state);

        }
        case actions.MediaLibraryActionTypes.GET_FOLDER_LIST_REQUESTED: {
            state.selectedFiles = [];
            return Object.assign({}, state);
        }


        case actions.MediaLibraryActionTypes.UPDATE_UPLOAD: {
            const ftu: FileToUpload = state.filesToUpload.filter(f => f.file.name === action.payload.filename)[0];
            ftu.completed = action.payload.completed;
            ftu.progress = action.payload.value;
            ftu.uploading = true;
            state.filesToUpload = [...state.filesToUpload];
            if (ftu.completed) {
                state.filesToUpload = state.filesToUpload.filter(f => f.file.name !== action.payload.filename);
            }
            return Object.assign({}, state);
        }

        case actions.MediaLibraryActionTypes.SET_ABSPATH: {
            return Object.assign({}, state, {absolutePath: `/game/${action.payload.gameId}`});
        }

        case actions.MediaLibraryActionTypes.SET_RELPATH: {
            return Object.assign({}, state, {relativePath: action.payload.relativePath});
        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return mediaLibraryInitialState;
        }

        default: {
            return state;
        }
    }
}
