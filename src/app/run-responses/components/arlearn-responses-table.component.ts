import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../core/reducers';
import { Observable } from "rxjs";
import * as fromSel from '../store/run-responses.selectors';
import { MatTableDataSource } from "@angular/material/table";
import { RunResponse } from "../store/run-responses.state";
import { getMessagesSelector } from "../../game-messages/store/game-messages.selector";
import { GetGameMessagesRequestAction } from "../../game-messages/store/game-messages.actions";
import { GameMessage } from "../../game-messages/store/game-messages.state";

@Component({
    selector: 'app-arlearn-responses-table',
    template: `
        <div class="pos-full-width" *ngIf="responses$ | async as data">
            <mat-table class="pos-full-width" [dataSource]="getTableDataSource(data)" class="mat-elevation-z8">
                <!-- Position Column -->

                <ng-container matColumnDef="responseId">
                    <mat-header-cell *matHeaderCellDef> responseId.</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{element.responseId}} </mat-cell>
                </ng-container>
                <ng-container matColumnDef="responseValue">
                    <mat-header-cell *matHeaderCellDef> responseValue.</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{element.responseValue}} </mat-cell>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="generalItemId">
                    <mat-header-cell *matHeaderCellDef> generalItemId</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{element.generalItemId}} </mat-cell>
                </ng-container>


                <ng-container matColumnDef="messageName">
                    <mat-header-cell *matHeaderCellDef> Title</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{getMessageName(element.generalItemId)}} </mat-cell>
                </ng-container>
                <ng-container matColumnDef="userId">
                    <mat-header-cell *matHeaderCellDef> User</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{element.userId}} </mat-cell>
                </ng-container>

                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
        </div>
    `,
    styles: [`
        .pos-full-width {
            position: relative;
            width: 950px;
        }
    `]
})
export class ArlearnResponsesTableComponent implements OnInit {
    @Input() selectedScreen: any;
    public messages$: Observable<any> = this.store.select(getMessagesSelector);
    displayedColumns = ['responseId', 'responseValue', 'generalItemId', 'messageName', 'userId'];
    responses$: Observable<any> = this.store.select(fromSel.selectAll);

    dataSource: MatTableDataSource<RunResponse>;
    messagesAsync = {};

    constructor(private store: Store<State>) {
        this.messages$.subscribe((messages: GameMessage[]) => {
            messages.forEach(message => {
                // console.log("message is ", message);
                this.messagesAsync[message.id] = message;
            });
        });
    }

    ngOnInit(): void {
        this.store.dispatch(new GetGameMessagesRequestAction());
    }

    getTableDataSource(data) {
        if (this.selectedScreen) {
            return new MatTableDataSource(
                data.filter(response => response.generalItemId.toString() === this.selectedScreen.toString())
            );
        }

        return new MatTableDataSource(data);
    }

    getMessageName(id: string) {
        if (!this.messagesAsync[Number(id)]) {
            return "-";
        }
        return this.messagesAsync[Number(id)].name;

    }


}
