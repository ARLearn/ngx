
export interface MediaGalleryItem {
    name: string;
    path: string;
    assetId?: string;
}

export interface PortalImage {
    assetId?: string,
    type?: 'org.celstec.arlearn2.beans.medialibrary.MediaLibraryFile',
    tags?: string[],
    name?: string,
    path?: string
}

export interface PortalImageFromServer {
    assetId?: string,
    type?: 'org.celstec.arlearn2.beans.medialibrary.MediaLibraryFile',
    tags?: string,
    name?: string,
    path?: string
}
