import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {currentGameRuns} from '../../store/game-runs.selector';
import {RunAccessRight, GameRun, RunAccess} from '../../store/game-runs.state';
import {DeleteRunRequestAction, SelectRunAction} from '../../store/game-runs.actions';
import {Router} from "@angular/router";
import * as fromRunAccess from "src/app/game-runs-management/store/game-runs-access.selector";
import {Dictionary} from "@ngrx/entity";
import {getPortalUser} from "../../../player-management/store/player.selector";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-runs-table',
    template: `
        <div *ngIf="runAccess$|async as ra">
            <table mat-table [dataSource]="dataSource" matSort aria-label="Elements" *ngIf="me |async as myFullId">

                <ng-container matColumnDef="title">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'ROW_HEADERS.TITLE' | translate }}</th>
                    <td mat-cell *matCellDef="let row" (click)="click(row, ra[myFullId+'_'+row.runId]?.accessRights)">{{row.title}}</td>
                </ng-container>

                <ng-container matColumnDef="lastModificationDate">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'ROW_HEADERS.DATE' | translate }}</th>
                    <td mat-cell *matCellDef="let row"
                        (click)="click(row, ra[myFullId+'_'+row.runId]?.accessRights)">{{row.lastModificationDate |  date:'medium'}}</td>
                </ng-container>


                <ng-container matColumnDef="controls" stickyEnd>
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let row" class="cell-right">
                        <button
                                *ngIf="((runAccess$|async)[myFullId+'_'+row.runId])?.accessRights == 1"
                                mat-icon-button [matMenuTriggerFor]="menu">
                            <mat-icon>more_vert</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button mat-menu-item (click)="deleteRun(row)">
                                <mat-icon>delete_forever</mat-icon>
                                <span>{{ 'ACTIONS.DELETE_RUN' | translate }}</span>
                            </button>

                        </mat-menu>
                    </td>
                </ng-container>


                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr class="bin-element-row" mat-row
                    *matRowDef="let row; columns: displayedColumns;"

                ></tr>
            </table>
        </div>

    `,
    styles: [`
        table.mat-table {
            background-color: transparent;
        }

        table {
            width: 100%;
        }

        .cell-right {
            text-align: right;

        }

        tr.bin-element-row:hover {
            background: #f5f5f5;
        }

        tr.bin-element-row {
            cursor: pointer;
        }

        tr.example-element-row:active {
            background: #efefef;
        }

        @media only screen and (max-width: 900px) {
            .hide900 {
                display: none;
            }
        }

        @media only screen and (max-width: 500px) {
            .hide500 {
                display: none;
            }
        }

    `]
})
export class RunsTableComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['title', 'lastModificationDate', 'controls'];
    public messages$: Observable<any> = this.store.select(currentGameRuns);
    public runAccess$: Observable<Dictionary<RunAccess>> = this.store.select(fromRunAccess.selectEntities);
    public me: Observable<any> = this.store.select(getPortalUser).pipe(map(pu => pu.fullId));
    dataSource: MatTableDataSource<GameRun>;

    public subscription: Subscription;

    constructor(
        private store: Store<State>,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.subscription = this.messages$.subscribe((messages) => {
            this.dataSource = new MatTableDataSource(messages);
            const sortState: Sort = {active: 'lastModificationDate', direction: 'desc'};
            if (this.sort) {
                this.sort.active = sortState.active;
                this.sort.direction = sortState.direction;
                this.sort.sortChange.emit(sortState);

            }

            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });

    }

    click(gameRun: GameRun, accessRights: number) {
        console.log("in click", accessRights);
        if (accessRights === RunAccessRight.EDITOR) {
            console.log("in click ed", accessRights);
            this.router.navigate([`portal/game/${gameRun.gameId}/detail/runs/${gameRun.runId}/players`]);
        } else if (accessRights === RunAccessRight.OWNER) {
            console.log("in click ow", accessRights);
            this.router.navigate([`portal/game/${gameRun.gameId}/detail/runs/${gameRun.runId}/settings`]);
        } else {
            console.log("in click no", accessRights);
            this.router.navigate([`portal/game/${gameRun.gameId}/detail/runs/${gameRun.runId}/results`]);
        }

    }


    deleteRun(toDeleteRun: GameRun) {
        this.store.dispatch(new DeleteRunRequestAction(toDeleteRun));

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
