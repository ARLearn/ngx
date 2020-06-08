import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../core/reducers';
import {Observable} from "rxjs";
import * as fromSel from '../store/arlearn-actions.selectors';
import {MatTableDataSource} from "@angular/material/table";
import {ARLearnAction} from "../store/arlearn-actions.state";
import {getFilteredMessagesSelector, getMessagesSelector} from "../../game-messages/store/game-messages.selector";
import {GetGameMessagesRequestAction} from "../../game-messages/store/game-messages.actions";
import {GameMessage} from "../../game-messages/store/game-messages.state";

@Component({
    selector: 'app-arlearn-actions-table',
    template: `
        <div class="pos-full-width">
            <mat-table class="pos-full-width" [dataSource]="dataSource" class="mat-elevation-z8">
                <!-- Position Column -->

                <ng-container matColumnDef="identifier">
                    <mat-header-cell *matHeaderCellDef> Id.</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{element.identifier}} </mat-cell>
                </ng-container>
                <ng-container matColumnDef="action">
                    <mat-header-cell *matHeaderCellDef> action.</mat-header-cell>
                    <mat-cell *matCellDef="let element"> {{element.action}} </mat-cell>
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
                

                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
        </div>
    `,
    styles: [`
        .pos-full-width {
            position: relative;
            width: 900px;
        }
    `]
})
export class ArlearnActionsTableComponent implements OnInit {
    public messages$: Observable<any> = this.store.select(getMessagesSelector);
    displayedColumns = ['identifier', 'action', 'generalItemId',  'messageName'];
    arlearnActions$: Observable<any> = this.store.select(fromSel.selectAll);

    dataSource: MatTableDataSource<ARLearnAction>;
    messagesAsync = {};

    constructor(private store: Store<State>) {
        this.messages$.subscribe((messages: GameMessage[]) => {
            messages.forEach(message=>{
               console.log("message is ", message);
               this.messagesAsync[message.id] = message;
            });
        });
    }

    ngOnInit(): void {
        this.arlearnActions$.subscribe((arlearnActions) => {
            this.dataSource = new MatTableDataSource(arlearnActions);

        });
        this.store.dispatch(new GetGameMessagesRequestAction());
    }

    getMessageName(id: string) {
        if (!this.messagesAsync[Number(id)]) {
            return "-";
        }
        return this.messagesAsync[Number(id)].name;

}


}
