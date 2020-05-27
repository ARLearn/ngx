import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlayerLoadRequestAction} from '../../player-management/store/player.actions';
import {select, Store} from '@ngrx/store';
import {State} from '../../core/reducers';
import {Observable} from 'rxjs';
import {combineLatest} from 'rxjs';

// import { combineLatest } from 'rxjs/operators';
import {getAllPlayers, getAllPlayersAndMySelf, getPortalUser} from '../../player-management/store/player.selector';
import {FormControl} from "@angular/forms";
import {map, startWith, withLatestFrom} from "rxjs/operators";
import {Player} from "../../player-management/store/player.state";
import {AddUserToRunRequestAction, DeleteUserFromRunRequestAction} from "../store/game-runs.actions";

export interface AccountResultData {
    fullId: string;
    role: string;
}

@Component({
    selector: 'app-add-player-dialog',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">
                {{ 'CONTACT.ADD_PLAYER' | translate }}
            </div>
            <div class="pos-inner-block">
                <form class="full-width-container">
                    <mat-form-field class="pos-name-field">
                        <input matInput [placeholder]="'CONTACT.ADD_COLLAB_NAME_AUTO' | translate" [matAutocomplete]="auto"
                               [formControl]="stateCtrl">
                        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayPlayer">
                            <mat-option *ngFor="let player of filteredPlayers | async" [value]="player">
                                {{player.name}}
                            </mat-option>
                        </mat-autocomplete>
                    </mat-form-field>
                    

                </form>
               

                <button class="pos-create-button gl-style-button-no-shadow font-medium-14-20-roboto"
                        mat-raised-button color="primary"
                        (click)="onSaveClick()" [disabled]="!this.stateCtrl.value.fullId">
                    {{ 'CONTACT.ADD_COLLAB_BUTTON' | translate }}
                </button>
            </div>
        </div>


        <!--        <h1 mat-dialog-title>Kies connectie</h1>-->
        <!--        <div class="full-width-container">-->
        <!--            <div mat-dialog-content>-->

        <!--              -->
        <!--            </div>-->
        <!--            <div class="button-row">-->
        <!--                <button mat-raised-button color="primary"-->
        <!--                        (click)="onSaveClick()" [disabled]="!this.stateCtrl.value.fullId">-->
        <!--                    ADD-->
        <!--                </button>-->

        <!--                <button mat-button color="primary" color="primary" (click)="onNoClick()">-->
        <!--                    CANCEL-->
        <!--                </button>-->
        <!--            </div>-->
        <!--        </div>-->

    `,
    styles: [`

        .pos-top {
            height: 1px;
        }

        .pos-title {
            position: relative;
            margin-top: 83px;
            height: 38px;
            text-align: center;
        }

        .pos-inner-block {
            position: relative;
            width: 320px;
            left: 50%;
            transform: translate(-50%, 0%);
        }

        .pos-name-field {
            position: relative;
            margin-top: 141px;
            width: 100%;
        }

        .pos-role-field {
            position: relative;
            margin-top: 47px;
            width: 100%;
        }

        .full-width-container {
            position: relative;
            width: 100%;
        }

        .pos-create-button {
            position: relative;
            margin-top: 37px;

            width: 100%;
            height: 44px;
        }

    `]
})
export class AddPlayerDialogComponent {

    stateCtrl = new FormControl('');
    filteredPlayers: Observable<Player[]>;
test$ = this.store.pipe(select(getPortalUser)) ;

    // public players$: Observable<Player[]> = this.store.pipe(select(getAllPlayersAndMySelf));
    // public filter;

    constructor(
        public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
        private store: Store<State>,
        @Inject(MAT_DIALOG_DATA) public data: AccountResultData
    ) {
        // this.store.dispatch(new PlayerLoadRequestAction());

        this.data.role = '2';
        this.filteredPlayers = combineLatest([
            this.stateCtrl.valueChanges.pipe(startWith('')),
            this.store.pipe(select(getAllPlayersAndMySelf))
        ]).pipe(
            map(([value, players]: [Player, Player[]]) => value ? this._filterPlayers(value, players) : players.slice())
        );
    }

    private _filterPlayers(value: any, players: Player[]): Player[] {
        let filterValue = '';
        if (value.name) {
            // console.log(value);
            filterValue = value.name.toLowerCase();
        } else {
            filterValue = value.toLowerCase();
        }
        return players.filter(p => {
            // console.log("play", p);
            return p.name && p.name.toLowerCase().indexOf(filterValue) === 0;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick() {
        this.data.fullId = this.stateCtrl.value;

        this.dialogRef.close(this.data);
    }

    displayPlayer(player) {
        return player.name;
    }

    selectionChange(event: any) {
        this.data.role = event.value;
    }

}
