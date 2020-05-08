import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {GetGameMessagesRequestAction} from "../../../game-messages/store/game-messages.actions";
import {CreateFolderAction, SetUploadModusAction} from "../../store/media-lib.actions";
import { MatDialog } from "@angular/material/dialog";
import {CreateFolderComponent} from "../../modal/create-folder/create-folder.component";

@Component({
    selector: 'app-media-lib-tab-bar',
    template: `
        <div class="media-tab-bar ">
            <div class=" maxwidth">
                <div class="media-nav-container">
                    <nav mat-tab-nav-bar>
                        <a mat-tab-link
                           routerLinkActive #rrla="routerLinkActive"
                           [active]="rrla.isActive"
                           [routerLink]="'/portal/game/'+gameId+'/detail/media'">Alle mediabestanden </a>
                        <!--                <a mat-tab-link-->
                        <!--                   routerLinkActive #rrla1="routerLinkActive"-->
                        <!--                   [active]="rrla1.isActive"-->
                        <!--                   [routerLink]="'/portal/root/connections'"-->
                        <!--                > Connecties </a>-->
                        <!--                <a mat-tab-link-->
                        <!--                   disabled routerLinkActive="tab-selected"> Game Library </a>-->
                    </nav>
                </div>
                <div class="upload-buttons">
                    <button mat-button color="primary" (click)="newFolder()" class="new-folder-text">
                        <mat-icon aria-hidden="false">create_new_folder</mat-icon>
                        Nieuwe map
                    </button>
                    <button mat-raised-button color="primary" (click)="uploadFiles()">
                        <mat-icon aria-hidden="false">cloud_upload</mat-icon>
                    </button>
                </div>


            </div>
        </div>
    `,
    styleUrls: ['./media-lib-tab-bar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MediaLibTabBarComponent implements OnInit {

    @Input() gameId: number;

    constructor(
        public store: Store<State>,
        public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    uploadFiles() {
        this.store.dispatch(new SetUploadModusAction({modus: true}));
    }

    newFolder() {

        const dialogRef = this.dialog.open(CreateFolderComponent, {
            height: '200px',
            width: '420px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(new CreateFolderAction(result));
            }
        });
    }

}
