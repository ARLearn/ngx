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
}

const initialState: PortalImageState = {
    queryLoading: false,
    folders: [],
    files: [],
    history: [],
    selectedFolder: null,
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
            return {
                ...state,
                history: [ ...state.history, action.payload ]
            }

        case PortalImagesActionTypes.GO_BACK_TO_RESPONSE: {
            const selectedFolderIdx = state.history.indexOf(action.payload);

            return {
                ...state,
                history: state.history.filter((_, i) => selectedFolderIdx !== -1 && i <= selectedFolderIdx)
            }
        }

        default:
            return state;
    }
}
