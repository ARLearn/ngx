import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../store/game-message.selector";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame, iCanWrite} from "../../../game-management/store/current-game.selector";
import {select, Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {GameMessageUpdateAction, GameMessageUpdateFileReferenceAction, RemoveColorAction} from "../../store/game-message.actions";
import {SelectAssetComponent} from "../../../media-library/modal/select-asset/select-asset.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-screen-editor-type-audio-object',
    template: `
        <mat-form-field
                class="gl-pos-between-fields gl-pos-field-full-width">
            <input matInput [placeholder]="'GAME.TITLE'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.name"
                   (ngModelChange)="titleChange($event)">
        </mat-form-field>

        <mat-form-field
                class="gl-pos-between-fields gl-pos-field-full-width">
            <input matInput [placeholder]="'MESSAGE.BUTTON_TEXT'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.description"
                   (ngModelChange)="descriptionChange($event)">
        </mat-form-field>

        <app-pick-location-on-map
                class="gl-pos-between-fields"
                [locationBased]="(message$|async)?.lat"
                [showInList]="(message$|async)?.showInList"
                [lat]="(message$|async)?.lat"
                [lng]="(message$|async)?.lng"
        >
        </app-pick-location-on-map>

        <div class="color-picker-class gl-pos-between-fields">
            <app-color-input
                    [canEdit]="(iCanWrite|async)"

                    [label]="'COMMON.PRIMARY_COLOR' |translate"
                    [color]="primColor"
                    [unselect]="true"
                    (onChange)="primColorChange($event)"
            ></app-color-input>
        </div>

        <app-create-label
                class="gl-pos-between-fields"
                [label]="(message$|async)?.label">
        </app-create-label>
        <button mat-raised-button
                (click)="selectAudio()"
                >select audio</button>
    `,
    styles: [`
        .color-picker-class {
            height: 35px;
            top: 10px
        }
    `]
})
export class ScreenEditorTypeAudioObjectComponent implements OnInit {
    title: string;
    primColor = "#D61081";

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    game$: Observable<Game> = this.store.select(getGame);
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));


    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    titleChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({name: event}));
    }

    descriptionChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({description: event}));
    }

    primColorChange(color: string) {
        if (color === "default") {
            this.store.dispatch(new RemoveColorAction());

        } else {
            this.store.dispatch(new GameMessageUpdateAction({primaryColor: color}));
        }

    }
    selectAudio() {
        const dialogRef = this.dialog.open(SelectAssetComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new GameMessageUpdateFileReferenceAction({
                delete: false,
                key: 'audio',
                value: result

            }));
        });
    }
}
