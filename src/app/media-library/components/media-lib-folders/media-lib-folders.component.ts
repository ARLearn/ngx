import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {getFolders, getRelativePath} from "../../store/media-lib.selector";
import {GetFolderListRequestAction, SetRelativePathAction} from "../../store/media-lib.actions";

@Component({
    selector: 'app-media-lib-folders',
    template: `

        <div [class.selected]="'/'==(relativePath$|async)"
             class="root"
             (click)="selectFolder('')">
            <div class="folder-icon">
                <mat-icon aria-hidden="false">folder</mat-icon>
            </div>
            <div class="folder-label">{{'MEDIA.MEDIA_BIBLIOTHEEK' |translate}}</div>
        </div>
        <div class="level1 " [class.selected]="('/'+folder)==(relativePath$|async)"
             *ngFor="let folder of (folders$ |async)" (click)="selectFolder(folder)">
            <div class="folder-icon">
                <mat-icon aria-hidden="false">folder</mat-icon>
            </div>
            <div class="folder-label">{{folder}}</div>
        </div>
    `,
    styleUrls: ['./media-lib-folders.component.css']
})
export class MediaLibFoldersComponent implements OnInit {
    public folders$: Observable<string[]> = this.store.select(getFolders);
    public relativePath$: Observable<string> = this.store.select(getRelativePath);

    constructor(
        public store: Store<State>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new GetFolderListRequestAction());
    }

    selectFolder(folder: string) {
        console.log("folder selected ", folder);
        this.store.dispatch(new SetRelativePathAction({relativePath: '/' + folder}));
    }
}
