import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../core/reducers';
import {GetPortalGamesRequestAction, SearchPortalGamesRequestAction} from '../store/portal-games.actions';
import {getPortalGames, getQueryGames} from '../store/portal-games.selector';

@Component({
    selector: 'app-manage-game-library',
    template: `
        <app-top-level-navbar [title]="'Portal Beheer'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
        </app-top-level-navbar>

        <div class="game-library maxwidth">
            <div class="mb-3 d-flex align-items-center justify-content-between">
                <div class="search-input">
                    <mat-form-field appearance="standard" class="search-input">
                        <mat-label>Starting type to search games...</mat-label>
                        <input matInput placeholder="Starting type to search games..."
                               (input)="onQueryChange($event.target.value)"
                        >
                        <mat-icon class="search-icon" matPrefix>search</mat-icon>
                    </mat-form-field>
                </div>
                <div>
                    <button mat-button [matMenuTriggerFor]="orgMenu" class="pr-0">Rating
                        <mat-icon>arrow_drop_down</mat-icon>
                    </button>
                    <mat-menu #orgMenu="matMenu">
                        <button mat-menu-item>Item 1</button>
                        <button mat-menu-item>Item 2</button>
                    </mat-menu>
                </div>
            </div>

            <ng-container *ngIf="data$ | async as dataSource">
                <table mat-table [dataSource]="dataSource" class="game-library-table">
                    <ng-container matColumnDef="icon">
                        <th mat-header-cell *matHeaderCellDef class="icon"></th>
                        <td mat-cell *matCellDef="let element" class="icon">
                            <img class="icon" [src]="'/assets/images/games/' + element.icon + '.png'"/>
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

                    <ng-container matColumnDef="private">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let element" class="private center">
                            <mat-icon class="table-icon" *ngIf="element.private">lock</mat-icon>
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="rate">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let element" class="rate">
                            <span> <mat-icon class="table-icon" color="primary">star</mat-icon>
                                {{ element.rate }} </span>
                            <span class="reviews"> ({{ element.reviews }}) </span>
                        </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="game-row"
                        [routerLink]="'/portal/root/portal/' + row.gameId"></tr>
                </table>
            </ng-container>
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
            max-width: 320px;
            font-size: 12px;
            margin: 0;
            color: #1919198A;
        }

        .date,
        .category,
        .country {
            color: #0000008A;
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

        .reviews {
            margin-left: 10px;
            color: #000000DE;
            opacity: 0.5;
        }

        .rate {
            text-align: right;
        }

        .heading-wrapper {
            position: relative;
        }

        .heading-wrapper,
        .heading-wrapper .title {
            display: inline-block;
        }

        .heading-wrapper .badge {
            position: absolute;
            left: 103%;
            top: -6px;
        }

        .search-input {
            width: 320px;
        }

        .game-library-table .cdk-header-row {
            display: none;
        }
    `]
})
export class ManageGameLibraryComponent implements OnInit {
    public data$ = this.store.select(getQueryGames);
    public displayedColumns: string[] = ['icon', 'title', 'date', 'category', 'language', 'private', 'rate'];

    subMenuItems = [
        {
            routerLink: '/portal/root/portal',
            label: 'COMMON.GAMES'
        },
        {
            routerLink: '/portal/root/usrmgt',
            label: 'PORTAL_MANAGEMENT.USERS'
        },
    ];


    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        // this.store.dispatch(new GetPortalGamesRequestAction());
    }

    onQueryChange(query: string) {
        console.log("query is now", query);
        if (query.length > 2) {
            console.log("query is now", query);
            this.store.dispatch(new SearchPortalGamesRequestAction(query));
        }


    }
}
