import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from "../shared/shared.module";
import { reducers } from "./store/portal-images.reducer";
import { PortalImagesEffects } from "./store/portal-images.effects";
import { ManageImagesComponent } from "./pages/manage-images.component";
import { PortalImagesService } from "../core/services/portal-images.service";
import { ImageFormModalComponent } from './modals/image-form.modal';
import { MediaGalleryComponent } from "./components/media-gallery.component";
import { MediaGalleryItemComponent } from "./components/media-gallery-item.component";
import { FolderFormModalComponent } from "./modals/folder-form.modal";
import { GalleryFilePickerComponent } from "./components/gallery-file-picker.component";


@NgModule({
    declarations: [
        ManageImagesComponent,
        ImageFormModalComponent,
        MediaGalleryComponent,
        MediaGalleryItemComponent,
        FolderFormModalComponent,
        GalleryFilePickerComponent,
    ],
    imports: [
        SharedModule.forChild(),
        CommonModule,
        StoreModule.forFeature('portal-images', reducers),
        EffectsModule.forFeature([PortalImagesEffects]),
    ],
    exports: [
        MediaGalleryComponent
    ],
    providers: [
        PortalImagesService,
    ],
    entryComponents: [
        ImageFormModalComponent,
        FolderFormModalComponent,
    ]
})
export class PortalImageManagementModule { }
