import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Query} from "../store/arlearn-actions.actions";
import {GetCurrentRunFromRouterRequestAction, GetGameRunsRequestAction} from "../../game-runs-management/store/game-runs.actions";
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";
import {PlayerLoadRequestAction} from "../../player-management/store/player.actions";

@Component({
    selector: 'app-actions-overview',
    template: `
        <app-game-detail-navbar [game]="game$|async">
            <div class="button-placeholder">

            </div>
        </app-game-detail-navbar>
        <div class="full-width-container maxwidth">
            <app-run-tab-select></app-run-tab-select>
            <div class="run-container">
                <app-arlearn-actions-table></app-arlearn-actions-table>
            </div>
        </div>
    `,
    styles: [`
        .run-container {
            position: absolute;
            top: 70px;
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            align-content: center;
        }
    `]
})
export class ActionsOverviewComponent implements OnInit {
    public game$: Observable<Game> = this.store.select(getGame);

    constructor(
        private store: Store<State>,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetGameRunsRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.store.dispatch(new GetCurrentRunFromRouterRequestAction());
        this.store.dispatch(new PlayerLoadRequestAction());
        this.store.dispatch(new Query());
    }

}
