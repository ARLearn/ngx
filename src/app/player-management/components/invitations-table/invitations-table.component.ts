import {Component, OnInit} from '@angular/core';
import {getAllPendingToMe} from "../../store/player.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {MatTableDataSource} from "@angular/material/table";
import {AcceptInvitationRequestAction, RemovePendingContactsRequestAction} from "../../store/player.actions";

@Component({
    selector: 'app-invitations-table',
    template: `
        <div class="pos-container">
            <table mat-table [dataSource]="dataSource" matSort aria-label="Elements">
                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'ROW_HEADERS.NAME' | translate }}</th>
                    <td mat-cell *matCellDef="let row" class="font-regular-16-24-roboto">{{row.fromName}}</td>
                </ng-container>

                <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'LOGIN.EMAIL' | translate }}</th>
                    <td mat-cell *matCellDef="let row"
                        class="font-regular-14-19-roboto style-date">{{row.timestamp | date:'medium'}}</td>
                </ng-container>

                <ng-container matColumnDef="accept">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'LOGIN.EMAIL' | translate }}</th>
                    <td mat-cell *matCellDef="let row" class="style-accept-text">
                        <button mat-button (click)="accept(row.invitationId)"
                                class="font-regular-14-19-roboto">
                            <mat-icon class="black-color">check_circle_outline</mat-icon>
                            Accepteer
                        </button>
                    </td>
                </ng-container>

                <ng-container matColumnDef="deny">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ 'LOGIN.EMAIL' | translate }}</th>
                    <td mat-cell *matCellDef="let row" class="style-accept-text">
                        <button mat-button (click)="deny(row.invitationId)"
                                class="font-regular-14-19-roboto">
                            <mat-icon class="black-color">remove_circle_outline</mat-icon>
                            Wijs af
                        </button>
                    </td>
                </ng-container>

                <tr class="bin-element-row" mat-row
                    *matRowDef="let row; columns: displayedColumns;"
                ></tr>
            </table>
        </div>

    `,
    styles: [`

        .pos-container {
            margin-top: 106px;
        }

        table {
            width: 100%;
            background-color: transparent;
        }

        tr {
            opacity: 1;
        }

        .style-accept-text {
            color: #0000008A;
        }

        .style-date {
            color: #0000008A;

        }

        .style-black {
            color: #000000
        }
    `]
})
export class InvitationsTableComponent implements OnInit {
    showPendingToMe$ = this.store.select(getAllPendingToMe);
    displayedColumns = ['name', 'date', 'accept', 'deny'];

    dataSource: MatTableDataSource<any>;

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {
        this.showPendingToMe$.subscribe((players) => {
            this.dataSource = new MatTableDataSource(players);

        });
    }

    accept(invitationId: string) {
        this.store.dispatch(new AcceptInvitationRequestAction({invitationId: invitationId}));
    }

    deny(invitationId: string) {
        this.store.dispatch(new RemovePendingContactsRequestAction({id: invitationId}));
    }
}
