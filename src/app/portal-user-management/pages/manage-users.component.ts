import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {Observable, Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

import {State} from "../../core/reducers";
import {Player} from "../../player-management/store/player.state";
import {Query, CreateAccountRequest, DeleteAccountRequest, SuspendAccountRequest} from "../store/portal-users.actions";
import {selectAll, selectUsersQueryLoading} from '../store/portal-users.selectors';
import {AddUserDialogComponent} from "../components/add-user-dialog.component";
import {map} from 'rxjs/operators';
import {ConfirmDialogComponent} from "../components/confirm-dialog.component";
import {SetExpireDateDialogComponent} from "../components/set-expire-date-dialog.component";
import {UpdateAccountExpirationRequestAction} from "../../player-management/store/player.actions";

@Component({
    selector: 'app-manage-users',
    template: `
        <app-top-level-navbar [title]="'Portaal beheer'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>

            <div class="button-placeholder" (click)="addUser()">
                <div class="button-center">
                    <button color="accent" mat-fab>
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>
        </app-top-level-navbar>
        <div class="users maxwidth">
            <div class="mb-4 mt-5 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <div class="selects">
                         <span>
                            {{ selection.selected.length }} {{ 'SELECTED' | translate }} >
                         </span>
                        <button class="actions-btn" mat-flat-button color="primary"
                                [matMenuTriggerFor]="menu" [disabled]="selection.selected.length === 0">{{ 'BTN.ACTIONS' | translate }}
                            <mat-icon>keyboard_arrow_down</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button mat-menu-item (click)="deleteSelectedUsers()">{{ 'USERS.ACTIONS.DELETE' | translate }}</button>
                            <button mat-menu-item (click)="suspendSelectedUsers()">{{ 'USERS.ACTIONS.SUSPEND' | translate }}</button>
                            <button mat-menu-item (click)="setExpireDateToSelectedUsers()">{{ 'USERS.ACTIONS.SET_EXIPRATION_DATE' | translate }}</button>
                        </mat-menu>
                    </div>
                    <div class="search-wrapper">
                        <app-search-button
                                [placeholder]="'MESSAGE.START_TYPING_TO_SEARCH' | translate"
                                [dispatchAction]="dispatchAction"
                                [filter]="filter"
                        >
                        </app-search-button>

                        <span *ngIf="loading$ | async" class="spinner primary-color"><i class="fa fa-spin fa-spinner"></i></span>
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

                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>{{ 'ROW_HEADERS.NAME' | translate }}</th>
                    <td mat-cell *matCellDef="let row" class="name-pointer name"
                        [routerLink]="'/portal/root/usrmgt/'+row.fullId">{{row.name}} </td>
                </ng-container>

                <ng-container matColumnDef="location">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let row" (click)="click(row)">
                        <mat-chip-list *ngIf="row.labels">
                            <mat-chip color="secondary" *ngFor="let label of row.labels" selected>{{label}}</mat-chip>
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
                            <button mat-menu-item (click)="deleteUser(row.fullId)">
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

        th.mat-header-cell:first-of-type {
            padding-left: 0 !important;
        }

        tr.bin-element-row td:first-child{
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

        .search-wrapper {
            display: flex;
            align-items: center;
        }

        .search-wrapper .spinner {
            margin-left: 1rem;
        }

    `]
})
export class ManageUsersComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['select', 'name', 'location', 'email', 'lastModificationDate', 'controls'];
    dataSource: MatTableDataSource<Player>;
    selection = new SelectionModel<Player>(true, []);

    public dispatchAction = new Query();
    public filter: string;

    public loading$ = this.store.select(selectUsersQueryLoading);

    private subscription = new Subscription();

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

    // .pipe(map(users => users.map(user => ({ ...user, labels: user.label && user.label.split(';') }))));

    constructor(
        public dialog: MatDialog,
        private store: Store<State>,
    ) {
    }

    click(item) {
        console.log(item);
    }

    ngOnInit(): void {
        // this.store.dispatch(new Query("stefaan"));

        this.subscription.add(this.userList.subscribe((users) => {
            console.log(users);
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.paginator = this.paginator;
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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


    addUser() {
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        this.subscription.add(dialogRef.componentInstance.submit.subscribe((result) => {
            this.store.dispatch(new CreateAccountRequest(result));
        }));
    }

    deleteSelectedUsers() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        dialogRef.componentInstance.message = 'Are you sure you want to delete these users?';

        this.subscription.add(dialogRef.componentInstance.submit.subscribe(() => {
            this.selection.selected.forEach(x => this.store.dispatch(new DeleteAccountRequest(x.fullId)))
            dialogRef.close();

            this.selection.clear();
        }));
    }

    suspendSelectedUsers() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        dialogRef.componentInstance.message = 'Are you sure you want to suspend these users?';

        this.subscription.add(dialogRef.componentInstance.submit.subscribe(() => {
            this.selection.selected.forEach(x => this.store.dispatch(new SuspendAccountRequest(x.fullId)))
            dialogRef.close();
        }));
    }

    setExpireDateToSelectedUsers() {
        const dialogRef = this.dialog.open(SetExpireDateDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        this.subscription.add(dialogRef.componentInstance.submit.subscribe((value) => {
            this.selection.selected.forEach(x => this.store.dispatch(new UpdateAccountExpirationRequestAction({ fullId: x.fullId, expiration: value.date.getTime() })))
            dialogRef.close();
        }));
    }


    deleteUser(userId: string) {
        this.store.dispatch(new DeleteAccountRequest(userId));
    }
}
