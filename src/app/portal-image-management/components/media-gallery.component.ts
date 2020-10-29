import {Component, OnDestroy, OnInit} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActionsSubject, Store } from "@ngrx/store";
import { ofType } from "@ngrx/effects";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import Debounce from 'debounce-decorator';

import { State } from "../../core/reducers";
import {
    CreateFolder, DeleteSelectedFiles,
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

@Component({
    selector: 'app-media-gallery-container',
    template: `
        <div>
            <mat-form-field class="search-input">
                <mat-icon class="search-icon" matPrefix>search</mat-icon>
                <input matInput type="text" [(ngModel)]="searchQuery" (ngModelChange)="search()" placeholder="Search..." />
            </mat-form-field>
        </div>
            
        <div class="parent">
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
                    <div class="folder-icon"><mat-icon>folder</mat-icon></div>
                    <div class="folder-label">{{ folder.name }}</div>
                </div>
 
                <div class="folder" (click)="createFolder()">
                    <div class="folder-icon"><mat-icon>create_new_folder</mat-icon></div>
                    <div class="folder-label create-folder">New folder</div>
                </div>
            </div>
            <div class="line">
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
                        [selected]="(selectedFiles$ | async).includes('mediaLibrary/' + item.path + '/' + item.name + '.png')"
                        (onClick)="selectFile('mediaLibrary/' + item.path + '/' + item.name + '.png')"
                >
                </app-media-gallery-item>
            </div>
        </div>
        
        <div class="toolbar-wrapper">
            <div class="toolbar maxwidth">

                <div class="badge">
                    <div class="badge-num primary-background-color">{{ (selectedFiles$ | async).length }}</div>
                    <div class="badge-label">Selected</div>
                </div>

                <div>
                    <button mat-raised-button color="primary" (click)="deleteFiles()" [disabled]="(selectedFiles$ | async).length === 0"><mat-icon>delete</mat-icon></button>
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

            .folders {
                flex: 0 0 252px;
                margin-right: 20px;
            }
            
            .folder {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                padding: 10px;
                cursor: pointer;
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

            .line {

                width: 2px;
                min-height: 100%;
                background: #DDDDDD 0% 0% no-repeat padding-box;
                opacity: 1;
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
        `
    ]
})
export class MediaGalleryComponent implements OnInit, OnDestroy {
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
        this.store.dispatch(new SelectFile(path));
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
        this.store.dispatch(new DeleteSelectedFiles());
    }

    @Debounce(800)
    search() {
        this.setSearchMode(true);

        const query = this.searchQuery.trim();

        this.store.dispatch(new Search(query));
    }

}
