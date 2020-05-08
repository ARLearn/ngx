import {Component, OnInit} from '@angular/core';
import {
    AddUserToRunRequestAction,
    DeleteUserFromRunRequestAction,
    GetCurrentRunFromRouterRequestAction,
    GetGameRunsRequestAction
} from "../store/game-runs.actions";
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {AddPlayerDialogComponent} from "../components/add-player-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {currentRunPlayers} from "../store/game-runs.selector";
import {PendingPlayer} from "../../player-management/store/player.state";
import {PlayerLoadRequestAction} from "../../player-management/store/player.actions";

@Component({
    selector: 'app-run-players-page',
    template: `
        <app-game-detail-navbar [game]="game$|async">
            <div class="button-placeholder">
                <div class="button-center">
                    <button color="accent" mat-fab (click)="addPlayer()">
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>

        </app-game-detail-navbar>

        <div class="full-width-container maxwidth">
                <app-run-tab-select></app-run-tab-select>
                <div class="run-container">
                    <div class="connectionTile" *ngFor="let player of (currentPlayers$|async)">
                        <app-connection-tile class="gameTile"
                                             [player]="player"
                                             (remove)="remove(player)"
                        ></app-connection-tile>

                    </div>
                </div>
        </div>
    `,
    styles: [`
        .run-tabs {
            position: absolute;
            top: 0px;
        }

        .run-container {
            position: absolute;
            top: 70px;
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            align-content: center;
        }

        .connectionTile {
            position: relative;
            width: 152px;
            height: 160px;

            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 10px #0000001A;
            border-radius: 2px;
            opacity: 1;

            margin: 5px;
        }

    `]
})
export class RunPlayersPageComponent implements OnInit {
    public game$: Observable<Game> = this.store.select(getGame);
    currentPlayers$: Observable<any> = this.store.select(currentRunPlayers);

    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new GetGameRunsRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.store.dispatch(new GetCurrentRunFromRouterRequestAction());
        this.store.dispatch(new PlayerLoadRequestAction());

    }

    addPlayer() {
        const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {fullId: ""}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("result is now ", result);
            if (result && result.fullId) {
                this.store.dispatch(new AddUserToRunRequestAction(result.fullId));
            }

        });
    }

    remove(player: PendingPlayer) {

        this.store.dispatch(new DeleteUserFromRunRequestAction(player));


    }
}
