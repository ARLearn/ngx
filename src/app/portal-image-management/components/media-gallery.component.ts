import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActionsSubject, Store } from "@ngrx/store";
import { ofType } from "@ngrx/effects";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import Debounce from 'debounce-decorator';

import { State } from "../../core/reducers";
import {
    CreateFolder, DeleteFolder, DeleteSelectedFiles,
    GoBackTo,
    PortalImagesActionTypes,
    Query,
    Search, SelectFile,
    SelectFolder
} from "../store/portal-images.actions";
import {
    getFiles,
    getFolders,
    getHistory,
    getSearchResults,
    getSelectedFiles,
    getSelectedFolder
} from "../store/portal-images.selectors";
import { FolderFormModalComponent } from "../modals/folder-form.modal";
import {ConfirmDialogComponent} from "../../portal-user-management/components/confirm-dialog.component";
import {SuspendAccountRequest} from "../../portal-user-management/store/portal-users.actions";
import {MediaGalleryItem} from "../store/portal-images.state";

@Component({
    selector: 'app-media-gallery-container',
    template: `
        <div [class.select-search]="assessmentSelect">
            <mat-form-field class="search-input">
                <mat-icon class="search-icon" matPrefix>search</mat-icon>
                <input matInput type="text" [(ngModel)]="searchQuery" (ngModelChange)="search()" placeholder="Search..." />
            </mat-form-field>
        </div>
            
        <div class="parent" [class.select]="assessmentSelect">
            <div class="folders" *ngIf="searchMode">
                <button mat-raised-button color="primary" (click)="setSearchMode(false)">Back</button>
            </div>
            <div class="folders" *ngIf="!searchMode">          
                <div class="folder" *ngIf="selectedFolder$ | async as selectedFolder">
                    <div (click)="goBack(null)" class="home-ico"><mat-icon>home</mat-icon></div>
                    <div class="folder-icon"><mat-icon>arrow_right</mat-icon></div>
                    <ng-container *ngFor="let item of (history$ | async); let i = index">
                        <div (click)="item != selectedFolder && goBack(item)" class="folder-custom">{{ item.name }}</div>
                        <div class="folder-icon" *ngIf="i !== (history$ | async).length - 1"><mat-icon>arrow_right</mat-icon></div>
                    </ng-container>
                </div>
                
                <div class="folder" *ngFor="let folder of (folders$ | async)" (click)="selectFolder(folder)">
                    <button mat-icon-button class="delete-folder" (click)="deleteFolder($event, folder)"><mat-icon>close</mat-icon></button>
                    <div class="folder-icon"><mat-icon>folder</mat-icon></div>
                    <div class="folder-label">{{ folder.name }}</div>
                </div>
 
                <div *ngIf="!assessmentSelect" class="folder" (click)="createFolder()">
                    <div class="folder-icon"><mat-icon>create_new_folder</mat-icon></div>
                    <div class="folder-label create-folder">New folder</div>
                </div>
            </div>
            <div class="files" *ngIf="!searchMode">
                <app-media-gallery-item
                    *ngFor="let item of (files$ | async)"
                    [path]="item.path"
                    [name]="item.name"
                    [selected]="(selectedFiles$ | async).includes(item.path)"
                    (onClick)="selectFile(item.path)"
                >
                </app-media-gallery-item>
            </div>
            <div class="files" *ngIf="searchMode">
                <app-media-gallery-item
                        *ngFor="let item of (searchResults$ | async)"
                        [path]="'mediaLibrary/' + item.path + '/' + item.name + '.png'"
                        [name]="item.name"
                        [selected]="(selectedFiles$ | async).includes('mediaLibrary' + (item.path.startsWith('/') ? '' : '/') + item.path + (item.path.endsWith('/') ? '' : '/') + item.name + '.png')"
                        (onClick)="selectFile('mediaLibrary' + (item.path.startsWith('/') ? '' : '/') + item.path + (item.path.endsWith('/') ? '' : '/') + item.name + '.png')"
                >
                </app-media-gallery-item>
            </div>
        </div>
        
        <div class="toolbar-wrapper" *ngIf="!assessmentSelect">
            <div class="toolbar maxwidth">

                <div class="badge">
                    <div class="badge-num primary-background-color">{{ (selectedFiles$ | async).length }}</div>
                    <div class="badge-label">Selected</div>
                </div>

                <div>
                    <button class="delete-btn" mat-raised-button color="primary" (click)="deleteFiles()" [disabled]="(selectedFiles$ | async).length === 0"><mat-icon>delete</mat-icon> {{ 'ACTIONS.DELETE' | translate }}</button>
                </div>
            </div>
        </div>        
    `,
    styles: [
        `
            .parent {
                display: flex;
                height: 100%;
                margin-bottom: 68px;
            }
            
            .parent.select {
                padding-top: 60px;
                margin-bottom: 0;
            }
            
            .select-search {
                position: absolute;
                top: 6px;
                text-align: right;
                width: 100%;
             }

            .folders {
                flex: 0 0 225px;
                margin-right: 20px;
            }
            
            .folder {
                position: relative;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                padding: 10px;
                cursor: pointer;
            }

            .folder:hover .delete-folder {
                display: block;
            }
            
            .folder .delete-folder {
                position: absolute;
                top: 1px;
                left: -32px;
                display: none;
            }
            
            .folder-icon {
                color: #3EA3DC;
                height: 25px;
            }
            
            .folder-label {
                margin-left: 10px;
            }
            
            .folder-custom {
                white-space: nowrap;
                max-width: 60px;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            
            .folder-custom:last-child {
                max-width: 120px;
            }
            
            .create-folder {
                opacity: 0.8;
            }
            .files {
                display: flex;
                flex-wrap: wrap;
                flex: 1;
                opacity: 1;
                margin-bottom: 71px;
            }
            .home-ico {
                height: 25px;
                color: #212529;
                opacity: 0.6;
                
                transition: all 0.25s;
            }
            .home-ico:hover {
                opacity: 1;
            }
            .search-input {
                width: 270px;
            }
            
            .toolbar-wrapper {
                position: fixed;
                right: 0;
                left: 0;
                bottom: 0;
                background: #ffffff;
                z-index: 10;
            }
            
            .toolbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 0;
            }
            
            .badge {
                display: flex;
                align-items: center;
            }

            .badge-num {
                padding: 10px 20px;
                border-radius: 20px;
                margin-right: 20px;
                color: #ffffff;
            }
            
            .badge-label {
                font-size: 16px;
                text-transform: uppercase;
                font-weight: 400;
            }
            
            .delete-btn {
                text-transform: uppercase;
            }
            
            .delete-btn .mat-icon {
                line-height: 23px;
            }
        `
    ]
})
export class MediaGalleryComponent implements OnInit, OnDestroy {
    @Input() assessmentSelect = false;
    @Input() multiSelect = true;

    selectedFolder$ = this.store.select(getSelectedFolder);
    history$ = this.store.select(getHistory);
    files$ = this.store.select(getFiles);
    searchResults$ = this.store.select(getSearchResults);
    folders$ = this.store.select(getFolders);
    selectedFiles$ = this.store.select(getSelectedFiles);

    searchMode = false;
    searchQuery: string;


    private modalRef: MatDialogRef<FolderFormModalComponent, any>;
    private subscriptions = new Subscription();

    constructor(
        private store: Store<State>,
        private dialog: MatDialog,
        private actions$: ActionsSubject
    ) {
        const sub = this.actions$.pipe(
            ofType(PortalImagesActionTypes.SELECT_FOLDER),
            filter(() => !!this.modalRef)
        ).subscribe(() => {
            this.modalRef.close();
            this.modalRef = null;
        });

        this.subscriptions.add(sub);
    }

    ngOnInit() {
        this.store.dispatch(new Query(null, true));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    setSearchMode(searchMode: boolean) {
        this.searchMode = searchMode;

        if (!this.searchMode) {
            this.searchQuery = null;
        }
    }

    selectFolder(folder) {
        this.store.dispatch(new SelectFolder(folder));
    }

    selectFile(path) {
        this.store.dispatch(new SelectFile(path, this.multiSelect));
    }

    goBack(folder) {
        this.store.dispatch(new GoBackTo(folder));
    }

    createFolder() {
        this.modalRef = this.dialog.open(FolderFormModalComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        this.modalRef.componentInstance.submit.subscribe((name: string) => {
           this.store.dispatch(new CreateFolder(name));
        });
    }

    deleteFiles() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        dialogRef.componentInstance.message = 'PORTAL_MANAGEMENT.IMAGES.CONFIRM_DELETE_FILES';

        this.subscriptions.add(dialogRef.componentInstance.submit.subscribe(() => {
            this.store.dispatch(new DeleteSelectedFiles());
            dialogRef.close();
        }));
    }

    @Debounce(800)
    search() {
        this.setSearchMode(true);

        const query = this.searchQuery.trim();

        this.store.dispatch(new Search(query));
    }

    deleteFolder(event: MouseEvent, folder: MediaGalleryItem) {
        event.stopPropagation();

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        dialogRef.componentInstance.message = 'PORTAL_MANAGEMENT.IMAGES.CONFIRM_DELETE_FOLDER';

        this.subscriptions.add(dialogRef.componentInstance.submit.subscribe(() => {
            this.store.dispatch(new DeleteFolder(folder.path));
            dialogRef.close();
        }));


    }
}
