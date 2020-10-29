import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import Debounce from 'debounce-decorator';
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
                <mat-icon *ngIf="!small" class="deleteIcon btn-delete" (click)="deleteImage()" matPrefix>delete</mat-icon>
                <app-filestore-background-image
                        (loadFailure)="deleteImage()"
                        (loadSuccess)="onUpload.emit()"
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
            
            .deleteIcon {
                background: #f5f5f5;
                padding: 7px;
                cursor: pointer;
                border-radius: 4px;
            }
            
            .btn-delete {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 40px;
                height: 40px;
                z-index: 1;
            }
            
            ::ng-deep .btn-delete svg .a {
                fill: #ffffff;
                opacity: 1;
            }
        `
    ]
})
export class ThemeFilePickerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() title;
    @Input() small = false;
    @Input() path;

    @Output() onUpload = new EventEmitter();
    @Output() onFailure = new EventEmitter();

    imageExists: boolean= true;

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

    ngOnInit(): void {
        //this.onUpload.emit();
    }

    @Debounce(1000)
    ngOnChanges(changes: SimpleChanges) {
        if (!this.imageExists && changes.path && changes.path.currentValue) {
            this.imageExists = true;
        }
    }

    ngAfterViewInit() {
        console.log('after view init');
        // this.onUpload.emit();
    }

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
