import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {ActionsSubject, Store} from "@ngrx/store";
import {ofType} from "@ngrx/effects";
import {Subscription} from "rxjs";
import {delay, filter} from "rxjs/operators";
import {State} from "../../../core/reducers";
import {
    MediaLibraryActionTypes,
    StartUploadAction,
    UploadCompletedAction
} from "../../../media-library/store/media-lib.actions";
import {PortalGamesActionTypes} from "../../../portal-management/store/portal-games.actions";

@Component({
    selector: 'app-theme-file-picker',
    template: `
        <div>
            <div class="image-class" [class.image-small]="small" *ngIf="imageExists">
                <mat-icon
                        *ngIf="small"
                        class="style-icon btn-delete"
                        (click)="deleteImage()"
                        [svgIcon]="'close'"></mat-icon>
                <button *ngIf="!small" mat-raised-button class="btn-delete" (click)="deleteImage()"><mat-icon>delete</mat-icon></button>
                <app-filestore-background-image
                        (loadFailure)="deleteImage()"
                        [paths]="[path]"
                        (isVideo)="false"
                >
                </app-filestore-background-image>
            </div>
            <app-file-uploader *ngIf="!imageExists"
                                [customPath]="path"
                                (fileDropped)="handleUploadFile()"
                                [isOpen]="true"
                               [title]="title"
                               [small]="small"
            ></app-file-uploader>
        </div>
    `,
    styles: [
        `
            .image-class {
                position: relative;
                height: 418px;
                width: 236px;
            }
            
            .image-class.image-small {
                height: 68px;
                width: 68px;
            }
            
            .image-small .btn-delete {
                top: -1px;
                right: 4px;
                min-width: unset;
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
            
            .btn-delete {
                position: absolute;
                top: 10px;
                right: 10px;
                min-width: 50px;
                z-index: 1;
            }
            
            ::ng-deep .btn-delete svg .a {
                fill: #ffffff;
                opacity: 1;
            }
        `
    ]
})
export class ThemeFilePickerComponent implements OnInit, OnDestroy {
    @Input() title;
    @Input() small = false;
    @Input() path;

    @Output() onUpload = new EventEmitter();
    @Output() onFailure = new EventEmitter();

    imageExists: boolean= false;

    private subscription: Subscription;

    constructor(
        private store: Store<State>,
        private actionsSubj: ActionsSubject,
    ) {
        this.subscription = this.actionsSubj.pipe(
            ofType(MediaLibraryActionTypes.COMPLETED_UPLOAD),
            filter((action: UploadCompletedAction) => action.payload && action.payload.pathPrefix === this.path),
            delay(2000)
        )
            .subscribe(() => {
                this.imageExists = true;
                this.onUpload.emit();
            });
    }

    ngOnInit(): void {}

    handleUploadFile() {
        this.store.dispatch(new StartUploadAction());

    }

    deleteImage() {
        this.imageExists = false;
        this.onFailure.emit();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
