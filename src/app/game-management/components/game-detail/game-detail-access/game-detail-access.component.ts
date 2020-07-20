import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../../store/current-game.state";
import {getGame, iAmOwner} from "../../../store/current-game.selector";
import {filter} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import { MatSelectChange } from "@angular/material/select";
import {GameConfigUpdateAction, GameUpdateAction} from "../../../store/current-game.actions";

@Component({
    selector: 'app-game-detail-access',
    template: `
        <div class="access-container">
            <mat-form-field>
                <mat-label>{{'GAME.ACCESS_WHO'|translate}}</mat-label>
                <mat-select
                        [disabled]="!(iAmOwner|async)"
                        [(ngModel)]="accessValue"
                        (selectionChange)="changeAccess($event)">
                    <mat-option  [value]="1">{{'GAME.ACCESS.PRIVATE' | translate}}</mat-option>
                    <mat-option  [value]="2">{{'GAME.ACCESS.LINK' | translate}}</mat-option>
                    <mat-option  [value]="3">{{'GAME.ACCESS.PUBLIC' | translate}}</mat-option>
                </mat-select>
            </mat-form-field>
        </div>

    `,
    styles: [`
        .access-container {
            width: 100%;
            margin-top: 39px;
        }
        mat-form-field {
            width: 100%;
        }
    `]
})
export class GameDetailAccessComponent implements OnInit {

    @Input() accessValue = 1;
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));


    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

    changeAccess(event: MatSelectChange) {
        this.store.dispatch(new GameUpdateAction({
            "sharing": event.value
        }));
    }
}
