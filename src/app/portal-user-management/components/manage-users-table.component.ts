import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Player} from "../../player-management/store/player.state";
import {SelectionModel} from "@angular/cdk/collections";
import {DeleteAccountRequest} from "../store/portal-users.actions";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Observable, Subscription} from "rxjs";
import {selectAll} from "../store/portal-users.selectors";

@Component({
    selector: 'app-manage-users-table',
    template: `
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

            <ng-container matColumnDef="expirationDate">
                <th mat-header-cell *matHeaderCellDef>{{ 'ROW_HEADERS.EXPIRATION_DATE' | translate }}</th>
                <td mat-cell *matCellDef="let row" (click)="click(row)">{{ row.expirationDate | date }}</td>
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
        
    `]
})
export class ManageUsersTableComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['select', 'name', 'location', 'email', 'expirationDate', 'controls'];
    dataSource: MatTableDataSource<Player>;
    @Input() selection: SelectionModel<Player>;
    private subscription = new Subscription();
    @Input() userList: Observable<Player[]>;

    constructor(private store: Store<State>) {
    }

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

    deleteUser(userId: string) {
        this.store.dispatch(new DeleteAccountRequest(userId));
    }

    click(item) {
        console.log(item);
    }
}
