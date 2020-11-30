import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

import { GameMessage } from "../../../../game-messages/store/game-messages.state";
import { getEditMessageSelector, selectedColor } from "../../../store/game-message.selector";
import { State } from "../../../../core/reducers";
import { GameMessageUpdateAction, RemoveColorAction } from "../../../store/game-message.actions";
import { iCanWrite } from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-screen-editor-type-scan-tag',
    template: `
        <mat-form-field class="gl-pos-between-fields gl-pos-field-full-width">

            <input matInput [placeholder]="'GAME.TITLE'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.name"
                   (ngModelChange)="titleChange($event)">
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
export class ScreenEditorTypeScanTagComponent {
    primColor$ = this.store.select(selectedColor);
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    constructor(private store: Store<State>) {}

    titleChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({name: event}));
    }

    primColorChange(color: string) {
        if (color === "default") {
            this.store.dispatch(new RemoveColorAction());

        } else {
            this.store.dispatch(new GameMessageUpdateAction({primaryColor: color}));
        }

    }
}
