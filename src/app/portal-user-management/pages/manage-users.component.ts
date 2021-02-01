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
import {UpdateAccountExpirationRequestAction, UpdateAccountOrganisationRequestAction} from "../../player-management/store/player.actions";
import {SetOrganisationDialogComponent} from "../components/set-organisation-dialog.component";

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
                                [matMenuTriggerFor]="menu"
                                [disabled]="selection.selected.length === 0">{{ 'PORTAL_MANAGEMENT.USERS.ACTION' | translate }}
                            <mat-icon>keyboard_arrow_down</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button mat-menu-item
                                    (click)="deleteSelectedUsers()">{{ 'PORTAL_MANAGEMENT.USERS.ACTIONS_DELETE' | translate }}</button>
                            <button mat-menu-item
                                    (click)="suspendSelectedUsers()">{{ 'PORTAL_MANAGEMENT.USERS.ACTIONS_SUSPEND' | translate }}</button>
                            <button mat-menu-item
                                    (click)="setExpireDateToSelectedUsers()">{{ 'PORTAL_MANAGEMENT.USERS.ACTIONS_SET_EXIPRATION_DATE' | translate }}</button>
                            <button mat-menu-item
                                    (click)="setOrganisationToSelectedUsers()">{{ 'PORTAL_MANAGEMENT.USERS.ACTIONS_SET_ORGANISATION' | translate }}</button>
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
            </div>

            <app-manage-users-table
                    [userList]="userList"
                    [selection]="selection"
            ></app-manage-users-table>
        </div>

    `,
    styles: [`
        .actions-btn {
            margin: 0 20px;
            height: 44px;
        }
        .name {
            font-size: 18px;
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
    displayedColumns = ['select', 'name', 'location', 'email', 'expirationDate', 'controls'];
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
            label: 'PORTAL_MANAGEMENT.USERS.MENU'
        },
        {
            routerLink: '/portal/root/images',
            label: 'PORTAL_MANAGEMENT.IMAGES.MENU'
        },
        {
            routerLink: '/portal/organisations',
            label: 'PORTAL_MANAGEMENT.ORGANISATIONS.MENU'
        },
    ];


    userList: Observable<any> = this.store.select(selectAll);

    // .pipe(map(users => users.map(user => ({ ...user, labels: user.label && user.label.split(';') }))));

    constructor(
        public dialog: MatDialog,
        private store: Store<State>,
    ) {
    }

    // click(item) {
    //     console.log(item);
    // }

    ngOnInit(): void {

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

        dialogRef.componentInstance.message = 'PORTAL_MANAGEMENT.USERS.CONFIRM_USER_DELETION';

        this.subscription.add(dialogRef.componentInstance.submit.subscribe(() => {
            this.selection.selected.forEach(x => this.store.dispatch(new DeleteAccountRequest(x.fullId)));
            dialogRef.close();

            this.selection.clear();
        }));
    }

    suspendSelectedUsers() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        dialogRef.componentInstance.message = 'PORTAL_MANAGEMENT.USERS.CONFIRM_USER_SUSPENSION';

        this.subscription.add(dialogRef.componentInstance.submit.subscribe(() => {
            this.selection.selected.forEach(x => this.store.dispatch(new SuspendAccountRequest(x.fullId)));
            dialogRef.close();
        }));
    }

    setExpireDateToSelectedUsers() {
        const dialogRef = this.dialog.open(SetExpireDateDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        this.subscription.add(dialogRef.componentInstance.submit.subscribe((value) => {
            this.selection.selected.forEach(x => this.store.dispatch(new UpdateAccountExpirationRequestAction({
                fullId: x.fullId,
                expiration: value.date.getTime()
            })));
            dialogRef.close();
        }));
    }

    setOrganisationToSelectedUsers() {
        const dialogRef = this.dialog.open(SetOrganisationDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        this.subscription.add(dialogRef.componentInstance.submit.subscribe((value) => {
            console.log('value is ', value);
            this.selection.selected.forEach(x => this.store.dispatch(new UpdateAccountOrganisationRequestAction({
                fullId: x.fullId,
                organisation: value.organisation
            })));
            dialogRef.close();
        }));
    }
 }
