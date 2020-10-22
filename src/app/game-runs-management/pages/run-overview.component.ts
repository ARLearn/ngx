import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../core/reducers';
import {MatDialog} from '@angular/material/dialog';
import {
    AddUserToRunRequestAction,
    CreateRunRequestAction,
    GameMyRunsCollaboratorsRequestAction,
    GetGameRunsRequestAction
} from '../store/game-runs.actions';
import {NewRunDialogComponent} from '../components/new-run-dialog/new-run-dialog.component';
import {Observable} from 'rxjs';
import {getCurrentRunId} from '../store/game-runs.selector';
import {AddPlayerDialogComponent} from '../components/add-player-dialog.component';
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";
import {testing} from "rxjs-compat/umd";


@Component({
    selector: 'app-run-overview',
    template: `
        <app-game-detail-navbar [game]="game$|async">
            <div class="button-placeholder">
                <div class="button-center">
                    <button color="accent" mat-fab (click)="addRun()">
                        <mat-icon>add</mat-icon>
                    </button>
                </div>

            </div>

        </app-game-detail-navbar>

        <div class="full-width-container maxwidth">
            <div class="run-container">
                <app-runs-table></app-runs-table>
            </div>
        </div>


    `,
    styles: [`
        .run-container {
            position: absolute;
            top: 50px;
            width: 100%;
        }

        .card {
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;
            padding: 0;
            position: relative;
            flex-grow: 1;
            flex-shrink: 1;


        }

        .mat-card-header {
            background-color: rgba(0, 0, 0, 0.03) !important;
            color: rgba(0, 0, 0, 0.5);
            padding: 5px !important;
            /* color:white; */
            padding: 15px !important;
        }

        .mat-card {
            padding: 0 !important;
        }


        h1 {
            color: rgba(0, 0, 0, 0.5);
        }


        .icon-card {
            position: absolute;
            right: 4px;
            top: 12px;
            z-index: 9;
        }

        .form-wrapper {
            display: flex;
            flex-direction: column;
        }

        .form-wrapper > * {
            width: 100%;
        }


        .card-container {
            flex-wrap: nowrap;
            padding-left: 0;
            padding-right: 0;
            display: flex;
        }

        .table-column {
            flex-grow: 1;
            flex-shrink: 1;
            width: 360px;
            margin: 10px;

            min-width: 296px;
            flex-basis: 296px;
            /* background: gold; */
        }


        .detail-column {
            flex-grow: 1;
            flex-shrink: 1;
            width: 360px;
            margin: 10px;

            min-width: 296px;
            flex-basis: 296px;
            /* background: gold; */
        }

    `]
})
export class RunOverviewComponent implements OnInit {
    public game$: Observable<Game> = this.store.select(getGame);
    currentRun$: Observable<number> = this.store.select(getCurrentRunId);

    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new GetGameRunsRequestAction());
        console.log('Class: RunOverviewComponent, Function: ngOnInit, Line 141 testing(): '
        , testing);
        this.store.dispatch(new GameMyRunsCollaboratorsRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
    }

    addRun() {
        const dialogRef = this.dialog.open(NewRunDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {title: ''}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result) {
                this.store.dispatch(new CreateRunRequestAction(result));
            }

        });
    }

    // addPlayer() {
    //     const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
    //         panelClass: ['modal-fullscreen', "modal-dialog"],
    //         data: {}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('AddPlayerDialogComponent dialog was closed', result);
    //         if (result && result.fullId) {
    //             this.store.dispatch(new AddUserToRunRequestAction(result));
    //         }
    //
    //     });
    // }

}
