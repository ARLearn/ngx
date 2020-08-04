export interface MediaLibraryState {
    folders: string[];
    items: string[];
    uploadModus: boolean;
    absolutePath: string;
    relativePath: string;
    filesToUpload: FileToUpload[];

    selectedFiles: string[];
}

export const mediaLibraryInitialState: MediaLibraryState = {
    folders: [],
    items: [],
    uploadModus: false,
    absolutePath: '',
    relativePath: '/',

    selectedFiles: [],
    filesToUpload: [
    ]
};


export interface FileToUpload {
    uploading: boolean;
    completed: boolean;
    customPath: boolean;
    file: File;
    progress: number;
    pathPrefix: string;
}
