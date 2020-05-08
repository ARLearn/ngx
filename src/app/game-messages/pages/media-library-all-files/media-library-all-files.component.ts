import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Observable} from "rxjs";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame} from "../../../game-management/store/current-game.selector";
import {GetCurrentGameFromRouterRequestAction} from "../../../game-management/store/current-game.actions";

@Component({
    selector: 'app-media-library-all-files',
    template: `
        <div class="box">
            <app-game-detail-navbar class="row header">

            </app-game-detail-navbar>
            <div class=" whitebackground" style=" flex: 0 1 71px;">
                <app-media-lib-tab-bar [gameId]="(game$|async)?.gameId"></app-media-lib-tab-bar>
            </div>
            <div style=" flex: 1 1 auto;" class="whitebackground">
                <div class="maxwidth">
                    <app-media-lib-container
                            [upload]="true"
                            [multiSelect]="true"
                            [gameId]="(game$|async)?.gameId"
                    ></app-media-lib-container>
                </div>

            </div>
            <div class="select-footer">
                <app-library-footer></app-library-footer>

            </div>
        </div>

    `,
    styles: [`
        .whitebackground {
            background: #FFFFFF;
        }

        .select-footer {
            flex: 0 1 71px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px -6px 15px #0000000F;
            opacity: 1;
            height: 71px;
        }


    `]
})
export class MediaLibraryAllFilesComponent implements OnInit {
    public game$: Observable<Game> = this.store.select(getGame);

    constructor(
        public store: Store<State>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
    }

}
