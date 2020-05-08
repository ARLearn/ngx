import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewMessageComponent} from "../../../game-messages/modal/new-message/new-message.component";
import {MatDialog} from "@angular/material/dialog";
import {SelectAssetComponent} from "../../modal/select-asset/select-asset.component";

// import { faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-asset-selector',
    template: `
        <div class="assets-container">

            <div class="pos-icon">
                <mat-icon class="style-icon" [svgIcon]="icon"></mat-icon>

            </div>
            <div class="title font-medium-24-32-roboto">{{title}}</div>
            <div class="subtitle font-medium-16-21-roboto">{{subtitle}}</div>
            <div class="choose">
                <button
                        class="style-button"
                        mat-raised-button color="primary" 
                        (click)="select()">
                    {{'ACTIONS.SELECT'|translate}}
                </button>
            </div>

        </div>
    `,
    styles: [`
        .pos-icon {
            position: relative;
            margin-top: 160px;
            text-align: center;
        }

        .style-icon {
            transform: scale(5);
        }

        .assets-container {
            position: relative;
            width: 290px;
            height: 514px;

            border: 2px dashed rgba(0, 0, 0, 0.12);
            border-radius: 4px;


        }

        .title {
            position: absolute;
            top: 280px;
            width: 100%;

            text-align: center;
            opacity: 0.5;


        }

        .subtitle {
            position: absolute;
            top: 330px;
            width: 100%;

            text-align: center;
            opacity: 0.4;


        }

        .choose {
            position: absolute;
            top: 380px;
            width: 100%;
            text-align: center;
        }

        .style-button {
            text-transform: uppercase;
        }

    `]
})
export class AssetSelectorComponent implements OnInit {
    // faCoffee = faImage;

    @Input() title;
    @Input() subtitle;
    @Input() icon;
    @Output() assetSelect = new EventEmitter<string>();

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    select() {

        const dialogRef = this.dialog.open(SelectAssetComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.assetSelect.emit(result);
            // this.animal = result;
        });
    }
}
