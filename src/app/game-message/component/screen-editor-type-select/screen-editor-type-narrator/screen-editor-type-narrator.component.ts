import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { State } from '../../../../core/reducers';
import { GameMessageUpdateAction, RemoveColorAction } from '../../../store/game-message.actions';
import { GameMessage } from "../../../../game-messages/store/game-messages.state";
import { getEditMessageSelector, selectedColor } from "../../../store/game-message.selector";
import { Game } from "../../../../game-management/store/current-game.state";
import { getGame, iCanWrite } from "../../../../game-management/store/current-game.selector";

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

        <mat-form-field
                class="gl-pos-field-full-width gl-pos-between-fields">
            <input matInput [placeholder]="'GAME.HEADING'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.heading"
                   (ngModelChange)="headingChange($event)">
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
                    [color]="primColor$ | async"
                    [unselect]="true"
                    (onChange)="primColorChange($event)"
            ></app-color-input>
        </div>

        <app-create-label 
                class="gl-pos-between-fields"
                [label]="(message$|async)?.label">

        </app-create-label>
    `,
    styles: [`
        .color-picker-class {
            height: 35px;
            top: 10px
        }
    `]
})
export class ScreenEditorTypeNarratorComponent {
    primColor$: Observable<string> = this.store.select(selectedColor);
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    game$: Observable<Game> = this.store.select(getGame);
    iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    constructor(private store: Store<State>) {}

    titleChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({ name: event }));
    }

    headingChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({ heading: event }));
    }

    descriptionChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({ description: event }));
    }

    textChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({ richText: event }));
    }

    primColorChange(color: string) {
        if (color === "default") {
            this.store.dispatch(new RemoveColorAction());
        } else {
            this.store.dispatch(new GameMessageUpdateAction({ primaryColor: color }));
        }
    }
}
