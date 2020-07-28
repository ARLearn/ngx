import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
// import {SearchUserRequestAction} from "../../player-management/store/player.actions";
import {Observable} from "rxjs";
import {Player} from "../../player-management/store/player.state";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {SetGamesFilterAction} from "../../games-management/store/game.actions";
import {Query} from "../store/portal-users.actions";
import {selectAll} from '../store/portal-users.selectors';
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
    selector: 'app-manage-user',
    template: `
        <app-top-level-navbar [backUrl]="'/portal/root/usrmgt'" [title]="'user 1'">
        </app-top-level-navbar>
        <div class="user maxwidth">
            <div class="info">
                <h4 class="primary-color">{{ 'USER.TOTAL' | translate }}</h4>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.NAME' | translate }}</mat-label>
                        <input matInput placeholder="Jouw naam">
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.EMAIL' | translate }}</mat-label>
                        <input matInput placeholder="Email">
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
                
                <div class="toggle">
                    <mat-label>Andere auteurs kunnen mij zien</mat-label>
                    <mat-slide-toggle color="primary">Uit</mat-slide-toggle>
                </div>
                
                <div class="save">
                    <button mat-flat-button color="primary">{{ 'SAVE' | translate }}</button>
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
export class ManageUserComponent implements OnInit {
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(private store: Store<State>) {}



    ngOnInit(): void {

    }
}
