import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetSelectorComponent} from './components/asset-selector/asset-selector.component';
import {SharedModule} from "../shared/shared.module";
import {MediaLibTabBarComponent} from './components/media-lib-tab-bar/media-lib-tab-bar.component';
import {MediaLibFoldersComponent} from './components/media-lib-folders/media-lib-folders.component';
import {MediaLibContainerComponent} from './components/media-lib-container/media-lib-container.component';
import {MediaLibFilesOverviewComponent} from './components/media-lib-files-overview/media-lib-files-overview.component';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/media-lib.reducer";
import {EffectsModule} from "@ngrx/effects";
import {MediaLibraryEffects} from "./store/media-lib.effects";
import {AppFileTileComponent} from './components/app-file-tile/app-file-tile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FileToUploadComponent} from './components/file-to-upload/file-to-upload.component';
import {SelectAssetComponent} from './modal/select-asset/select-asset.component';
import {CreateFolderComponent} from './modal/create-folder/create-folder.component';
import {LibraryFooterComponent} from './components/library-footer/library-footer.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MediaGalleryComponent} from "../portal-image-management/components/media-gallery.component";
import {PortalImageManagementModule} from "../portal-image-management/portal-image-management.module";


@NgModule({
    declarations: [
        AssetSelectorComponent,
        MediaLibTabBarComponent,
        MediaLibFoldersComponent,
        MediaLibContainerComponent,
        MediaLibFilesOverviewComponent,
        AppFileTileComponent,
        FileToUploadComponent,
        SelectAssetComponent,
        CreateFolderComponent,
        LibraryFooterComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        SharedModule.forRoot(),
        StoreModule.forFeature('mediaLibrary', reducers),
        EffectsModule.forFeature([MediaLibraryEffects]),
        FontAwesomeModule,
        PortalImageManagementModule,
    ],

    entryComponents: [SelectAssetComponent, CreateFolderComponent, LibraryFooterComponent],
    exports: [
        AssetSelectorComponent,
        MediaLibTabBarComponent,
        MediaLibContainerComponent,
        LibraryFooterComponent,
    ]
})
export class MediaLibraryModule {
}
