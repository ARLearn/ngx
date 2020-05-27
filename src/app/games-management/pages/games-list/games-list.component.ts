import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {getGame} from '../../../game-management/store/current-game.selector';
import {Observable, Subscription} from 'rxjs';
import {Game} from '../../../game-management/store/current-game.state';
import {CloneGameRequestAction, DeleteGameRequestAction, GetGameListRequestAction, SetGamesFilterAction} from '../../store/game.actions';
import {
    getFilteredGamesSelector,
    getGameList,
    getGameListSorted,
    getGamesFiltersSelector
} from '../../store/game.selector';
import {MatDialog} from '@angular/material/dialog';
import {NewGameComponent} from '../../modal/new-game/new-game.component';
import {SetFilterAction} from "../../../game-messages/store/game-messages.actions";
import {getFiltersSelector} from "../../../game-messages/store/game-messages.selector";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-games-list',
    template: `
        <app-top-level-navbar [title]="'My games'">
            <div class="button-placeholder">
                <div class="button-center">
                    <button color="accent" mat-fab (click)="newGame()">
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>
        </app-top-level-navbar>
        <div class="full-width-container maxwidth">

            <div class="gamesContainer-outer">
                <app-search-button
                        placeholder="Start typing to search games ..."
                        [dispatchAction]="dispatchAction"
                        [filter]="filter"

                >
                </app-search-button>
                <div class="gamesContainer">

                    <app-screen-tile class="gameTile"
                                     *ngFor="let game of (gameList$|async)"
                                     [title]="game.title"
                                     [subtitle]="game.lastModificationDate | date:'mediumDate'"
                                     [imagePath]="game.splashScreen"
                                     [actionText]="['GAME.DELETEGAME', 'GAME.CLONEGAME']"
                                     [clickText]="'GAME.EDITGAME'"
                                     [navTo]="'/portal/game/' +game.gameId+ '/detail/screens'"
                                     (actionClicked)="deleteGame(game, $event)"
                    ></app-screen-tile>

                </div>

            </div>

        </div>


    `,
    styles: [`
        .full-width-container {
            background-color: #F0F4F5; /*todo move up*/
        }


        .account-dropdown {
            position: absolute;
            top: 0px;
            right: 0px;
            width: auto;
            height: auto;

            color: #FFFFFF;
            opacity: 0.7;

        }

        .search {
            top: 155px;
            left: 0px;
            width: 320px;
            height: 35px;
            opacity: 1;
            position: absolute;
        }

        .gamesContainer-outer {
            margin-right: auto;
            margin-left: auto;
            position: relative;
        }

        .gamesContainer {
            position: relative;
            top: 109px;
            left: -8px;
            right: 140px;
            width: calc(100% + 16px);
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            align-content: center;
        }

        .gameTile {
            width: 236px;
            height: 388px;
            margin: 8px;
        }
    `]
})
export class GamesListComponent implements OnInit, OnDestroy {
    gameList$: Observable<Game[]> = this.store.select(getFilteredGamesSelector);
    public currentFilter$: Observable<string[]> = this.store.select(getGamesFiltersSelector).pipe(
        take(1),
    );

    private filterSubscription: Subscription;
    public filter: string;
    public dispatchAction = new SetGamesFilterAction();

    constructor(
        public dialog: MatDialog,
        private store: Store<State>
    ) {

    }

    ngOnInit() {
        this.filterSubscription = this.currentFilter$.subscribe((f) => this.filter = f[0]);
    }

    newGame() {
        const dialogRef = this.dialog.open(NewGameComponent, {
            width: '99%',
            data: {},
            panelClass: ['modal-fullscreen', "modal-dialog"]

        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    ngOnDestroy(): void {
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
    }

    deleteGame(game, action) {
        if (action === "GAME.DELETEGAME") {
            this.store.dispatch(new DeleteGameRequestAction({gameId: game.gameId}));
        } else if (action === "GAME.CLONEGAME") {
            this.store.dispatch(new CloneGameRequestAction({gameId: game.gameId}));
        }
    }
}
