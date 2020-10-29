import { createEntityAdapter, EntityState } from "@ngrx/entity";

import {MediaGalleryItem, PortalImage} from "./portal-images.state";
import * as actions from "./portal-images.actions";
import { PortalImagesActionTypes } from "./portal-images.actions";
import {State} from "@ngrx/store";


export interface PortalImageState {
    queryLoading?: boolean,
    folders: MediaGalleryItem[],
    files: MediaGalleryItem[],
    history: MediaGalleryItem[],
    selectedFolder: MediaGalleryItem,
    searchResults: PortalImage[],
    selectedFiles: string[],
}

const initialState: PortalImageState = {
    queryLoading: false,
    folders: [],
    files: [],
    history: [],
    selectedFolder: null,
    searchResults: [],
    selectedFiles: [],
}

export function reducers(
    state = initialState, action: actions.PortalImageActions): PortalImageState {
    switch (action.type) {
        case PortalImagesActionTypes.QUERY:
            return {
                ...state,
                queryLoading: true,
            };

        case PortalImagesActionTypes.QUERY_RESPONSE:
            return {
                ...state,
                files: action.payload.files,
                folders: action.payload.folders,
                selectedFolder: action.payload.selectedFolder,
            }

        case PortalImagesActionTypes.SELECT_FOLDER_RESPONSE:
            if (state.history.length > 0 && state.history[state.history.length - 1].path === action.payload.path) {
                return state;
            }

            return {
                ...state,
                history: [ ...state.history, action.payload ]
            }

        case PortalImagesActionTypes.SELECT_FILE:
            if (state.selectedFiles.includes(action.payload)) {
                return { ...state, selectedFiles: state.selectedFiles.filter(x => x !== action.payload) };
            }

            return { ...state, selectedFiles: [ ...state.selectedFiles, action.payload ] };

        case PortalImagesActionTypes.GO_BACK_TO_RESPONSE: {
            const selectedFolderIdx = state.history.indexOf(action.payload);

            return {
                ...state,
                history: state.history.filter((_, i) => selectedFolderIdx !== -1 && i <= selectedFolderIdx)
            }
        }

        case PortalImagesActionTypes.SEARCH_RESPONSE:
            return {
                ...state,
                searchResults: action.payload,
            }

        case PortalImagesActionTypes.DELETE_SELECTED_FILES_RESPONSE:
            return {
                ...state,
                files: state.files.filter(x => !state.selectedFiles.includes(x.path)),
                searchResults: state.searchResults.filter(x => !state.selectedFiles.includes('mediaLibrary/' + x.path + '/' + x.name + '.png')),
                selectedFiles: [],
            }

        default:
            return state;
    }
}
