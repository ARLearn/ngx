import {Component, OnInit} from "@angular/core";
import {MediaLibraryService} from "../../core/services/medialibrary.service";
import {State} from "../../core/reducers";
import {Store} from "@ngrx/store";
import {getFiles, getFolders, getHistory, getSelectedFolder} from "../store/portal-images.selectors";
import {GoBackTo, SelectFolder} from "../store/portal-images.actions";

@Component({
    selector: 'app-media-gallery-container',
    template: `
        <div class="parent">
            <div class="folders">                
                <div class="folder" *ngIf="selectedFolder$ | async as selectedFolder">
                    <div (click)="goBack(null)" class="home-ico"><mat-icon>home</mat-icon></div>
                    <div class="folder-icon"><mat-icon>arrow_right</mat-icon></div>
                    <ng-container *ngFor="let item of (history$ | async); let i = index">
                        <div (click)="item != selectedFolder && goBack(item)">{{ item.name }}</div>
                        <div class="folder-icon" *ngIf="i !== (history$ | async).length - 1"><mat-icon>arrow_right</mat-icon></div>
                    </ng-container>
                </div>
                
                <div class="folder" *ngFor="let folder of (folders$ | async)" (click)="selectFolder(folder)">
                    <div class="folder-icon"><mat-icon>folder</mat-icon></div>
                    <div class="folder-label">{{ folder.name }}</div>
                </div>
            </div>
            <div class="line">
            </div>
            <div class="files">
                <app-media-gallery-item
                    *ngFor="let item of (files$ | async)"
                    [path]="item.path"
                    [name]="item.name"
                >
                </app-media-gallery-item>
            </div>
        </div>
    `,
    styles: [
        `
            .parent {
                display: flex;
                height: 100%;
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
            
            .folder.selected {
                background: #ffffff 0% 0% no-repeat padding-box;
            }
            
            .folder-icon {
                color: #3EA3DC;
                height: 25px;
            }
            
            .folder-label {
                margin-left: 10px;
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
        `
    ]
})
export class MediaGalleryComponent {
    selectedFolder$ = this.store.select(getSelectedFolder);
    history$ = this.store.select(getHistory);
    files$ = this.store.select(getFiles);
    folders$ = this.store.select(getFolders);

    constructor(
        private mediaLibraryService: MediaLibraryService,
        private store: Store<State>
    ) {}

    selectFolder(folder) {
        this.store.dispatch(new SelectFolder(folder));
    }

    goBack(folder) {
        this.store.dispatch(new GoBackTo(folder));
    }

}
