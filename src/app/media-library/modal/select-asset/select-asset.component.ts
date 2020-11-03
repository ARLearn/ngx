import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Observable} from "rxjs";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame} from "../../../game-management/store/current-game.selector";
import {getSelectedFiles as getSelectedLocalFiles, getSelectedFilesFullPath} from "../../store/media-lib.selector";
import {getSelectedFiles as getSelectedGlobalFiles } from "../../../portal-image-management/store/portal-images.selectors";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-select-asset',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'MESSAGE.SELECT_ASSET' | translate }}</div>
        </div>
        
        <div class="maxwidth">
            <mat-tab-group (selectedIndexChange)="globalFilesOpened = $event === 1" class="wrap">
                <mat-tab label="Local">
                    <app-media-lib-container
                            [multiSelect]="false"
                            [upload]="false"
                            (doubleClick)="saveMessage()"
                            [gameId]="(game$|async)?.gameId"
                    ></app-media-lib-container>
                </mat-tab>
                <mat-tab label="Global">
                    <app-media-gallery-container
                            [multiSelect]="false"
                            [assessmentSelect]="true"
                    ></app-media-gallery-container>
                </mat-tab>
            </mat-tab-group>
        </div>
        <div class="maxwidth pos-media-select">
            <div class="toolbar-wrapper">
                <div class="toolbar maxwidth">
                    <button class="gl-pos-button-right"
                            *ngIf="!globalFilesOpened"
                            [disabled]="(selectedLocalFileNames$|async).length === 0"
                            mat-raised-button (click)="saveMessage()" color="primary"> Selecteer
                    </button>

                    <button class="gl-pos-button-right"
                            *ngIf="globalFilesOpened"
                            [disabled]="(selectedGlobalFileNames$|async).length === 0"
                            mat-raised-button (click)="saveMessage()" color="primary"> Selecteer
                    </button>
                </div>
            </div>
            
            
        </div>



    `,
    styles: [`
        .pos-top {
            height: 1px;
        }

        .pos-title {
            position: relative;
            margin-top: 83px;
            height: 38px;
            text-align: center;
        }

        .pos-media-select {
            position: relative;
            margin-top: 59px;
            margin-bottom: 50px;
        }
        
        .buttons > * {
            margin-right: 10px;
        }
        
        .wrap {
            margin-bottom: 68px;
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
        
        ::ng-deep .gl-pos-modal-esc-button {
            right: 0;
        }

        ::ng-deep .gl-pos-modal-back-button {
            left: 0;
        }
    `]
})
export class SelectAssetComponent implements OnInit {
    globalFilesOpened = false;

    public game$: Observable<Game> = this.store.select(getGame);
    public selectedLocalFileNames$: Observable<string[]> = this.store.select(getSelectedLocalFiles);
    public selectedGlobalFileNames$: Observable<string[]> = this.store.select(getSelectedGlobalFiles);

    constructor(public dialogRef: MatDialogRef<SelectAssetComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public store: Store<State>) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveMessage() {

        let stream$;

        if (this.globalFilesOpened) {
            stream$ = this.store.select(getSelectedGlobalFiles).first().pipe(map(([url]) => ['/' + url]));
        } else {
            stream$ = this.store.select(getSelectedFilesFullPath).first();
        }

        stream$.subscribe(x => {
            if (x.length === 0) {
                this.dialogRef.close();
            } else {
                this.dialogRef.close(x[0]);
            }
        });

    }
}
