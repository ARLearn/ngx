import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
// import {SearchUserRequestAction} from "../../player-management/store/player.actions";
import {Observable} from "rxjs";
import {Player} from "../../player-management/store/player.state";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {SetGamesFilterAction} from "../../games-management/store/game.actions";
import {GetAccountRequest, Query, UpdateAccountRequest} from "../store/portal-users.actions";
import {selectedUser} from '../store/portal-users.selectors';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import * as fromRootSelector from "../../core/selectors/router.selector";

@Component({
    selector: 'app-manage-user',
    template: `

        <app-top-level-navbar [backUrl]="'/portal/root/usrmgt'" [title]="(selectedUser|async)?.name">
        </app-top-level-navbar>
        <div class="user maxwidth" *ngIf="(selectedUser|async)">
            <div class="info">
                <h4 class="primary-color">{{ 'USER.GENERIC' | translate }}</h4>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.NAME' | translate }}</mat-label>
                        <input matInput
                               [disabled]="(selectedUser|async).accountType != 7"
                               placeholder="Jouw naam" [value]="(selectedUser|async).name">
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.EMAIL' | translate }}</mat-label>
                        <input matInput
                               disabled="true"
                               placeholder="Email" [value]="(selectedUser|async).email">
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field class="example-chip-list">
                        <mat-chip-list #chipList aria-label="Fruit selection">
                            <mat-chip [selectable]="true"
                                      [removable]="true">
                                123
                                <mat-icon matChipRemove>cancel</mat-icon>
                            </mat-chip>
                            <input placeholder="Labels"
                                   [matChipInputFor]="chipList"
                                   [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                                   [matChipInputAddOnBlur]="true">
                        </mat-chip-list>
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.EXPIRE_DATE' | translate }}</mat-label>
                        <input matInput [matDatepicker]="picker">
                        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                        <mat-datepicker #picker></mat-datepicker>
                    </mat-form-field>
                </div>

                <!--                <div class="toggle">-->
                <!--                    <mat-label>Andere auteurs kunnen mij zien</mat-label>-->
                <!--                    <mat-slide-toggle color="primary">Uit</mat-slide-toggle>-->
                <!--                </div>-->

                <div class="save">
                    <button mat-flat-button color="primary" (click)="save()">{{ 'SAVE' | translate }}</button>
                </div>
            </div>
            <div class="avatar">
                <img src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png" alt="">
            </div>

        </div>
    `,
    styles: [`

        .user {
            display: flex;
            align-items: flex-start;
            padding-top: 100px;
        }

        .form-field {
            margin-bottom: 1rem;
        }

        .save {
            margin-top: 1.5rem;
        }

        .save button {
            height: 50px;
            width: 150px;
        }

        .form-field mat-form-field {
            width: 100%;
        }

        .info {
            margin-right: 100px;
            min-width: 500px;
        }

        .avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }

        .avatar img {
            width: 100%;
            height: 100%;
        }

        .toggle {
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        }

        .toggle mat-label {
            display: block;
            opacity: 0.7;
            margin-bottom: 0.5rem;
        }

    `]
})
export class ManageUserComponent implements OnInit, OnChanges {

    separatorKeysCodes: number[] = [ENTER, COMMA];
    currentUserId: Observable<string> = this.store.select(fromRootSelector.selectRouteParam('userId'));

    selectedUser: Observable<Player> = this.store.select(selectedUser);

    constructor(private store: Store<State>) {
    }


    ngOnInit(): void {
        this.ngOnChanges(null);

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.currentUserId.subscribe(userId => this.store.dispatch(new GetAccountRequest(userId)));
    }

    save() {
        const account: Player = {
            "localId": "116743449349920850150",
            "firebaseId": "UHv7zBZlDJQEBWlmqSgVhO50W5D2",
            "accountType": 2,
            "email": "stefaan.ternier@gmail.com",
            "name": "stefaan Ternier (gmail)",
            "label": "Dilsen bibliotheek;Open Universiteit Nederland",
            "picture": "https://lh3.googleusercontent.com/a-/AAuE7mAef8ckla4oidgVEstZRNJOYHjnQQ7vKnOQ_jJeGk0",
            "expirationDate": 1595951888000,
            "fullId": "2:116743449349920850150"
        };
        console.log('saving account');
        this.store.dispatch(new UpdateAccountRequest(account));
    }
}
