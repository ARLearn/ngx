import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {getLibraryQueryGames} from "../store/user-library.selectors";

@Component({
    selector: 'app-library-games-table',
    template: `
        <div *ngIf="data$ | async as dataSource">
            <table mat-table [dataSource]="dataSource" class="game-library-table">
                <ng-container matColumnDef="icon">
                    <th mat-header-cell *matHeaderCellDef class="icon"></th>
                    <td mat-cell *matCellDef="let element" class="icon">
                       <app-game-icon
                       [game]="element"
                       ></app-game-icon>
                    </td>
                </ng-container>

                <ng-container matColumnDef="title">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element">
                        <div class="heading-wrapper">
                            <h6 class="title">{{ element.title }}</h6>
                            <span *ngIf="element.featured" class="primary-color badge">UITGELICHT</span>
                        </div>
                        <p class="description">{{ element.description }}</p>
                    </td>
                </ng-container>

                <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element" class="date"> {{element.lastModificationDate | date}} </td>
                </ng-container>

                <ng-container matColumnDef="category">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element" class="category"> {{element.category}} </td>
                </ng-container>

                <ng-container matColumnDef="language">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element" class="country"> {{element.language}} </td>
                </ng-container>

                <ng-container matColumnDef="privateMode">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element" class="private center">
                        <mat-icon class="table-icon" *ngIf="element.privateMode">lock</mat-icon>
                        <mat-icon class="table-icon" *ngIf="!element.privateMode">lock_open</mat-icon>
                    </td>
                </ng-container>

                <ng-container matColumnDef="rate">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let element" class="rate">
                            <span> <mat-icon class="table-icon" color="primary">star</mat-icon>
                                {{ element.sharing }} </span>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="game-row"
                    [routerLink]="'/portal/root/library/game/' + row.gameId"></tr>
            </table>
        </div>
    `,
    styles: [`
        .game-library {
            padding: 3rem 0;
        }

        .game-library-table {
            width: 100%;
            background: transparent;
        }
        .game-library-table .icon {
            width: 68px;
        }

        .game-row {
            cursor: pointer;
        }

        .game-library-table tr.cdk-row {
            height: 98px;
        }

        tr.cdk-row td:first-child {
            padding-left: 0;
            padding-right: 1rem;
            border-bottom: none;
        }

        tr.cdk-row td {
            border-color: #ECECEC;
        }

        tr.cdk-row td:last-child {
            padding-right: 0;
        }

        .title {
            margin-bottom: 0.1rem;
        }

        .description {
            /*max-width: 320px;*/
            font-size: 12px;
            margin: 0;
            color: #1919198A;
            text-overflow: ellipsis;
            max-height: 3.6em;
            line-height: 1.8em;
            word-wrap: break-word;
            overflow: hidden;
        }

        .date,
        .category,
        .country {
            color: #0000008A;
        }
        
        td.rate {
            text-align: right;
        }

        .cdk-column-title {
            max-width: 160px;
        }

        .private {
            text-align: center;
        }

        .private .mat-icon {
            color: #A0ABB5;
        }

        .table-icon {
            font-size: 16px;
            height: unset;
            width: unset;
            vertical-align: text-top;
        }


        .game-library-table .cdk-header-row {
            display: none;
        }
    `]
})
export class LibraryGamesTableComponent implements OnInit {
    public data$ = this.store.select(getLibraryQueryGames);
    public displayedColumns: string[] = ['icon', 'title', 'date', 'privateMode', 'rate']; //'category', 'language', 'private', 'rate'

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
    }

}
