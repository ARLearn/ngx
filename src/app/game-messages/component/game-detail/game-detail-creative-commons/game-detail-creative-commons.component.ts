import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {GameUpdateAction} from "../../../../game-management/store/current-game.actions";
import {Observable} from "rxjs";
import {Game} from "../../../../game-management/store/current-game.state";
import {getGame, iAmOwner} from "../../../../game-management/store/current-game.selector";
import {filter} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";

@Component({
    selector: 'app-game-detail-creative-commons',
    template: `
        <div class="license-container">
            <mat-form-field>
                <mat-label>{{'GAME.LICENSE.CHOOSE' | translate}}</mat-label>
                <mat-select [(ngModel)]="licenseCode"
                            [disabled]="!(iAmOwner|async)"
                            (selectionChange)="changeAccess($event)">
                    <mat-option [value]="'cc-by'">{{'GAME.LICENSE.CC-BY' | translate}}  </mat-option>
                    <mat-option [value]="'cc-by-nd'">{{'GAME.LICENSE.CC-BY-ND' | translate}} </mat-option>
                    <mat-option [value]="'cc-by-sa'">{{'GAME.LICENSE.CC-BY-SA' | translate}} </mat-option>
                    <mat-option [value]="'cc-by-nc'">{{'GAME.LICENSE.CC-BY-NC' | translate}} </mat-option>
                    <mat-option [value]="'cc-by-nc-sa'">{{'GAME.LICENSE.CC-BY-NC-SA' | translate}} </mat-option>
                    <mat-option [value]="'cc-by-nc-nd'">{{'GAME.LICENSE.CC-BY-NC-ND' | translate}} </mat-option>
                </mat-select>
            </mat-form-field>
        </div>

    `,
    styles: [`
        .license-container {
            width: 100%;
            margin-top: 39px;
        }

        mat-form-field {
            width: 100%;
        }

    `]
})
export class GameDetailCreativeCommonsComponent implements OnInit {

    licenseCode = '';
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));

    public game$: Observable<Game> = this.store.select(getGame).pipe(filter(g => g != null));


    constructor(public store: Store<State>) {
        this.game$.first().toPromise().then((g) => {
            this.licenseCode = g.licenseCode;
        });
    }


    ngOnInit() {
    }

    changeAccess(event: MatSelectChange) {

        this.store.dispatch(new GameUpdateAction({
            "licenseCode": event.value
        }));
    }
}
