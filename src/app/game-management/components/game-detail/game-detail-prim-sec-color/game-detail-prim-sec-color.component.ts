import { Component } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { State } from "../../../../core/reducers";
import { GameConfigUpdateAction } from "../../../store/current-game.actions";
import { iAmOwner, getGameColor } from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-game-detail-prim-sec-color',
    template: `
        <div class="colors">
            <app-color-input
                    [label]="'COMMON.PRIMARY_COLOR'|translate"
                    [color]="primColor$ | async"
                    [canEdit]="iAmOwner|async"
                    (onChange)="primColorChange($event)"
            ></app-color-input>
        </div>
    `,
    styles: [`
        .colors {
            position: relative;
            margin-top: 22px;
            width: 100%;
            height: 59px;
        }

        .move-to-right {
            position: absolute;
            left: 168px;
        }

    `]
})
export class GameDetailPrimSecColorComponent {
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));
    primColor$ = this.store.select(getGameColor);


    constructor(
        private store: Store<State>
    ) {
    }

    primColorChange(color: string) {
        this.store.dispatch(new GameConfigUpdateAction({
            "primaryColor": color
        }));
    }
}
