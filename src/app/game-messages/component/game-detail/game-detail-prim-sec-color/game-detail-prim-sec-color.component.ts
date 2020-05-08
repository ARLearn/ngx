import {Component, Input} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {GameConfigUpdateAction} from "../../../../game-management/store/current-game.actions";
import {Observable} from "rxjs";
import { iAmOwner } from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-game-detail-prim-sec-color',
    template: `
        <div class="colors">
            <app-color-input
                    [label]="'COMMON.PRIMARY_COLOR'|translate"
                    [color]="primColor"
                    [canEdit]="iAmOwner|async"
                    (onChange)="primColorChange($event)"
            ></app-color-input>
<!--            <app-color-input class="move-to-right"-->
<!--                             [label]="'Secundaire steunkleur'"-->
<!--                             [color]="secColor"-->
<!--                             (onChange)="secColorChange($event)"-->
<!--            ></app-color-input>-->
        </div>
    `,
    styles: [`
        .colors {
            position: relative;
            margin-top: 22px;
            width: 100%;
            height: 59px;
            /*background-color: red;*/
        }

        .move-to-right {
            position: absolute;
            left: 168px;
        }

    `]
})
export class GameDetailPrimSecColorComponent {
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));
    @Input() primColor = "#D61081";
    @Input() secColor = "#3EA3DC";


    constructor(
        private store: Store<State>
    ) {
    }

    primColorChange(color: string) {
        this.store.dispatch(new GameConfigUpdateAction({
            "primaryColor": color
        }));
    }

    secColorChange(color: string) {
        this.store.dispatch(new GameConfigUpdateAction({
            "secondaryColor": color
        }));
    }
}
