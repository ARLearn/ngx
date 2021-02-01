import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

import {SelectionModel} from "@angular/cdk/collections";
import {Organisation} from "../store/organisations.state";
import {Player} from "../../player-management/store/player.state";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {selectOrgQueryLoading, selectAll} from "../store/organisations.selectors";
import {Observable, Subscription} from "rxjs";
import { DeleteOrganizationRequest } from '../store/organisations.actions';

@Component({
    selector: 'app-organisation-table',
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
                    [routerLink]="'/portal/organisations/'+row.id">{{row.name}} </td>
            </ng-container>

            <ng-container matColumnDef="controls" stickyEnd>
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let row" class="cell-right">
                    <button mat-icon-button [matMenuTriggerFor]="menu">
                        <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="deleteOrganisation(row.id)">
                            <mat-icon>delete_forever</mat-icon>
                            <span>{{ 'ACTIONS.DELETE_ORGANIZATION' | translate }}</span>
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
        :host {
            width: 100%;
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

        .selects {
            border-right: 1px solid #e0e0e0;
            padding-right: 10px;
            margin-right: 30px;
        }
    `]
})
export class OrganisationTableComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['select', 'name', 'controls'];
    dataSource: MatTableDataSource<Organisation>;
    selection = new SelectionModel<Organisation>(true, []);

    public loading$ = this.store.select(selectOrgQueryLoading);
    organisationList: Observable<any> = this.store.select(selectAll);
    private subscription = new Subscription();

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {

        this.subscription.add(this.organisationList.subscribe((orgs) => {
            this.dataSource = new MatTableDataSource(orgs);
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
    checkboxLabel(row?: Organisation): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

    deleteOrganisation(id: string) {
        this.store.dispatch(new DeleteOrganizationRequest(id));
    }
}
