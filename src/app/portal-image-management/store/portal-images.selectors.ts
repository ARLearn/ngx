import {createFeatureSelector, createSelector} from "@ngrx/store";

import { PortalImageState } from "./portal-images.reducer";

export const getPortalImageFeature = createFeatureSelector<PortalImageState>('portal-images');

export const getQueryLoading = createSelector(getPortalImageFeature, state => state.queryLoading);
export const getFolders = createSelector(getPortalImageFeature, state => state.folders);
export const getFiles = createSelector(getPortalImageFeature, state => state.files);
export const getHistory = createSelector(getPortalImageFeature, state => state.history);
export const getSelectedFolder = createSelector(getPortalImageFeature, state => state.selectedFolder);
export const getSearchResults = createSelector(getPortalImageFeature, state => state.searchResults);
export const getSelectedFiles = createSelector(getPortalImageFeature, state => state.selectedFiles);

