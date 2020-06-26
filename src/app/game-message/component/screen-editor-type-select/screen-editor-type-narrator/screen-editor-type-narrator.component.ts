import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../core/reducers';
import {GameMessageUpdateAction, RemoveColorAction, RemoveLocationAction} from '../../../store/game-message.actions';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import {Observable} from "rxjs";
import {GameMessage} from "../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../../store/game-message.selector";
import {GpsPosition} from "../component/pick-location-on-map/pick-location-on-map.component";
import {Game} from "../../../../game-management/store/current-game.state";
import {getGame, iCanWrite} from "../../../../game-management/store/current-game.selector";
import {combineLatest} from 'rxjs';

@Component({
    selector: 'app-screen-editor-type-narrator',
    template: `
        <mat-form-field
                class="gl-pos-field-full-width gl-pos-between-fields">
            <input matInput [placeholder]="'GAME.TITLE'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.name"
                   (ngModelChange)="titleChange($event)">
        </mat-form-field>

        <mat-form-field class="gl-pos-field-full-width gl-pos-between-fields">

            <input matInput [placeholder]="'MESSAGE.BUTTON_TEXT'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.description"
                   (ngModelChange)="descriptionChange($event)">
        </mat-form-field>

        <mat-form-field [hintLabel]="'MESSAGE.MAX150CHAR' | translate" 
                        class="gl-pos-field-full-width gl-pos-between-fields">
            <textarea matInput #input
                      [disabled]="!(iCanWrite|async)"
                      [ngModel]="(message$|async)?.richText"
                      (ngModelChange)="textChange($event)"
                      placeholder="{{ 'MESSAGE.CONTENT' | translate }}"
                      maxlength="200"></textarea>
            <mat-hint align="end">{{input.value?.length || 00}}/200</mat-hint>
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
        <!--<input  type="file" #fileInput (change)="uploadFile($event.target.files)">-->
<!--        <app-pick-file-input-->
<!--                [backgroundPath]="'/game/'+(message$|async)?.gameId+'/generalItems/'+(message$|async)?.id+'/background.jpg'"-->
<!--        ></app-pick-file-input>-->

<!--        <app-dependency-read-temp class="gl-pos-between-fields">-->

<!--        </app-dependency-read-temp>-->



    `,
    styles: [`
        .color-picker-class {
            height: 35px;
            top: 10px
        }
    `]
})
export class ScreenEditorTypeNarratorComponent implements OnInit {
    title: string;
    primColor = "#D61081";
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    game$: Observable<Game> = this.store.select(getGame);
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    constructor(
        private store: Store<State>,
    ) {
    }

    ngOnInit() {
        combineLatest([this.message$, this.game$])
            .subscribe(([message, game]) => {
                if (message && message.primaryColor) {
                    this.primColor = message.primaryColor;

                } else {
                    if (game) {
                        this.primColor = game.config.primaryColor;

                    }
                }
            });
    }

    titleChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({name: event}));
    }

    descriptionChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({description: event}));
    }

    textChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({richText: event}));
    }

    primColorChange(color: string) {
        if (color === "default") {
            this.store.dispatch(new RemoveColorAction());

        } else {
            this.store.dispatch(new GameMessageUpdateAction({primaryColor: color}));
        }

    }
}
