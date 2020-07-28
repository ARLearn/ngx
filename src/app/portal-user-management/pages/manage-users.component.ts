import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
// import {SearchUserRequestAction} from "../../player-management/store/player.actions";
import {Observable} from "rxjs";
import {Player} from "../../player-management/store/player.state";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {SetGamesFilterAction} from "../../games-management/store/game.actions";
import {Query} from "../store/portal-users.actions";
import {selectAll} from '../store/portal-users.selectors';

@Component({
    selector: 'app-manage-users',
    template: `
        <app-top-level-navbar [title]="'Portaal beheer'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
        </app-top-level-navbar>
        <div class="users maxwidth">
            <div class="mb-4 mt-5 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <div class="selects">
                         <span>
                            {{ selection.selected.length }} {{ 'SELECTED' | translate }} >
                         </span>
                        <button class="actions-btn" mat-flat-button color="primary" [matMenuTriggerFor]="menu">{{ 'BTN.ACTIONS' | translate }}
                            <mat-icon>keyboard_arrow_down</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button mat-menu-item>Item 1</button>
                            <button mat-menu-item>Item 2</button>
                        </mat-menu>
                    </div>
                    <div>
                        <app-search-button
                                [placeholder]="'MESSAGE.START_TYPING_TO_SEARCH' | translate"
                                [dispatchAction]="dispatchAction"
                                [filter]="filter"
                        >
                        </app-search-button>
                    </div>
                </div>
                
                <div>
                    <button mat-button [matMenuTriggerFor]="orgMenu" class="pr-0">Organsitie
                        <mat-icon>arrow_drop_down</mat-icon>
                    </button>
                    <mat-menu #orgMenu="matMenu">
                        <button mat-menu-item>Item 1</button>
                        <button mat-menu-item>Item 2</button>
                        <button mat-menu-item>Item 3</button>
                    </mat-menu>
                </div>
            </div>


            <table mat-table [dataSource]="dataSource" matSort>

                <!-- Checkbox Column -->
                <ng-container matColumnDef="select">
                    <th mat-header-cell *matHeaderCellDef>
                        <mat-checkbox (change)="$event ? masterToggle() : null"
                                      [checked]="selection.hasValue() && isAllSelected()"
                                      [indeterminate]="selection.hasValue() && !isAllSelected()"
                                      [aria-label]="checkboxLabel()">
                        </mat-checkbox>
                    </th>
                    <td mat-cell *matCellDef="let row">
                        <mat-checkbox (click)="$event.stopPropagation()"
                                      (change)="$event ? selection.toggle(row) : null"
                                      [checked]="selection.isSelected(row)"
                                      [aria-label]="checkboxLabel(row)">
                        </mat-checkbox>
                    </td>
                </ng-container>

                <ng-container matColumnDef="name" >
                    <th mat-header-cell *matHeaderCellDef>{{ 'ROW_HEADERS.NAME' | translate }}</th>
                    <td mat-cell *matCellDef="let row"  class="name-pointer name" [routerLink]="'/portal/root/usrmgt/'+row.fullId" >{{row.name}} test</td>
                </ng-container>

                <ng-container matColumnDef="location">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let row" (click)="click(row)">
                        <mat-chip-list>
                            <mat-chip color="secondary" selected>{{row.label}}</mat-chip>
                        </mat-chip-list>
                    </td>
                </ng-container>

                <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef>{{ 'ROW_HEADERS.EMAIL' | translate }}</th>
                    <td mat-cell *matCellDef="let row" (click)="click(row)">{{ row.email }}</td>
                </ng-container>

                <ng-container matColumnDef="lastModificationDate">
                    <th mat-header-cell *matHeaderCellDef>{{ 'ROW_HEADERS.DATE' | translate }}</th>
                    <td mat-cell *matCellDef="let row" (click)="click(row)">14 Januari 2020</td>
                </ng-container>


                <ng-container matColumnDef="controls" stickyEnd>
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let row" class="cell-right">
                        <button mat-icon-button [matMenuTriggerFor]="menu">
                            <mat-icon>more_vert</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button mat-menu-item>
                                <mat-icon>delete_forever</mat-icon>
                                <span>{{ 'ACTIONS.DELETE_USER' | translate }}</span>
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
        .name-pointer {
            cursor: pointer;
        }
        
        .full-width-container {
            background-color: #F0F4F5; /*todo move up*/
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

        .actions-btn {
            margin: 0 20px;
            height: 44px;
        }

        table.mat-table {
            background-color: transparent;
        }

        table {
            width: 100%;
        }

        .cell-right {
            text-align: right;

        }

        .name {
            font-size: 18px;
        }

        tr.bin-element-row td {
            padding-top: 0.8rem;
            padding-bottom: 0.8rem;
        }

        tr.bin-element-row td:first-child {
            padding-left: 0;
            padding-right: 1rem;
        }

        tr.bin-element-row td:last-child {
            padding-right: 0;
        }

        tr.bin-element-row:hover {
            background: #f5f5f5;
        }

        tr.example-element-row:active {
            background: #efefef;
        }

        .users .cdk-header-row {
            display: none;
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
        
        .selects {
            border-right: 1px solid #e0e0e0;
            padding-right: 10px;
            margin-right: 30px;
        }

    `]
})
export class ManageUsersComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['select', 'name', 'location', 'email', 'lastModificationDate', 'controls'];
    dataSource: MatTableDataSource<Player>;
    selection = new SelectionModel<Player>(true, []);

    public dispatchAction = new Query();
    public filter: string;

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


    userList: Observable<any> = this.store.select(selectAll);

    constructor(private store: Store<State>
    ) {}

    click(item) {
        console.log(item);
    }

    ngOnInit(): void {
        // this.store.dispatch(new Query("stefaan"));

        this.userList.subscribe((users) => {
            console.log(users);
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.paginator = this.paginator;
        });
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Player): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

}
