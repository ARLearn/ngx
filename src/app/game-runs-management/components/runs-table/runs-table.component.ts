import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {getRuns} from '../../store/game-runs.selector';
import {GameRun} from '../../store/game-runs.state';
import {DeleteRunRequestAction, SelectRunAction} from '../../store/game-runs.actions';
import {PendingPlayer} from '../../../player-management/store/player.state';
import {Router} from "@angular/router";

@Component({
    selector: 'app-runs-table',
    template: `
        <div>
            <table mat-table [dataSource]="dataSource" matSort aria-label="Elements">

                <ng-container matColumnDef="title">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'ROW_HEADERS.TITLE' | translate }}</th>
                    <td mat-cell *matCellDef="let row" (click)="click(row)">{{row.title}}</td>
                </ng-container>

                <ng-container matColumnDef="lastModificationDate">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'ROW_HEADERS.DATE' | translate }}</th>
                    <td mat-cell *matCellDef="let row" (click)="click(row)">{{row.lastModificationDate |  date:'medium'}}</td>
                </ng-container>


                <ng-container matColumnDef="controls" stickyEnd>
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let row" class="cell-right">
                        <button mat-icon-button [matMenuTriggerFor]="menu">
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
export class RunsTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['title', 'lastModificationDate', 'controls'];
    public messages$: Observable<any> = this.store.select(getRuns);
    dataSource: MatTableDataSource<any>;

    constructor(
        private store: Store<State>,
        private router: Router
    ) {

    }


    ngOnInit() {
        this.messages$.subscribe((messages) => {
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

    click(gameRun: GameRun) {
        this.router.navigate([`portal/game/${gameRun.gameId}/run/${gameRun.runId}/players`]);
    }


    deleteRun(toDeleteRun: GameRun) {
        this.store.dispatch(new DeleteRunRequestAction(toDeleteRun));

    }

}
