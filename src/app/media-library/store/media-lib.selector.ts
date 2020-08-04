import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import {MediaLibraryState} from './media-lib.state';
import * as fromRoot from 'src/app/core/reducers';

export interface State extends fromRoot.State {
    mediaLibrary: MediaLibraryState;
}

export const getMediaLibFeature = createFeatureSelector<State, any>('mediaLibrary');


const _folders = (state: MediaLibraryState) => state.folders;
const _items = (state: MediaLibraryState) => state.items;
const _uploadModus = (state: MediaLibraryState) => state.uploadModus;
const _filesToUpload = (state: MediaLibraryState) => state.filesToUpload;
const _relativePath = (state: MediaLibraryState) => state.relativePath;
const _absPath = (state: MediaLibraryState) => state.absolutePath;
const _selectedFiles = (state: MediaLibraryState) => state.selectedFiles;

export const getFolders = createSelector(getMediaLibFeature, _folders);
export const getItems = createSelector(getMediaLibFeature, _items);
export const getUploadModus = createSelector(getMediaLibFeature, _uploadModus);
export const getFilesToUpload = createSelector(getMediaLibFeature, _filesToUpload);
export const getRelativePath = createSelector(getMediaLibFeature, _relativePath);
export const getAbsolutePath = createSelector(getMediaLibFeature, _absPath);
export const getSelectedFiles = createSelector(getMediaLibFeature, _selectedFiles);

export const filesAvailableForUploading = createSelector(getFilesToUpload, (files) => {
    console.log("check files available?");
    if (files.filter((f) => f.uploading).length >= 2) {
        return false;
    }
    if (files.filter((f) => !f.uploading).length > 0) {
        return true;
    }
    return false;
});
export const nextFileForUploading = createSelector(getFilesToUpload, (files) => {
    const notUploaded = files.filter((f) => !f.uploading);
    if (notUploaded.length === 0) {
        return null;
    }
    return notUploaded[0];
});
export const relativePathWithTrailingSlash = createSelector(getRelativePath,
    (path) => {
        if (path.endsWith("/")) {
            return path;
        }
        return path + "/";
    });

export const getSelectedFilesFullPath = createSelector(getSelectedFiles, getAbsolutePath,

    (files,  abs) => {
    console.log("test", abs, files);
        return files.map(f => abs +  f);
    });

