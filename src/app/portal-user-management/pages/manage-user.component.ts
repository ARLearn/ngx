import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
// import {SearchUserRequestAction} from "../../player-management/store/player.actions";
import {Observable, Subscription} from "rxjs";
import {Player} from "../../player-management/store/player.state";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {SetGamesFilterAction} from "../../games-management/store/game.actions";
import {GetAccountRequest, Query, SelectPlayer, UpdateAccountRequest} from "../store/portal-users.actions";
import {selectedUser} from '../store/portal-users.selectors';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import * as fromRootSelector from "../../core/selectors/router.selector";
import {filter} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
    selector: 'app-manage-user',
    template: `

        <app-top-level-navbar [backUrl]="'/portal/root/usrmgt'" [title]="(selectedUser$|async)?.name">
        </app-top-level-navbar>
        <div class="user maxwidth" *ngIf="(selectedUser$|async)">
            <div class="info">
                <h4 class="primary-color">{{ 'USER.GENERIC' | translate }}</h4>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.NAME' | translate }}</mat-label>
                        <input matInput
                               [disabled]="(selectedUser$|async).accountType != 7"
                               placeholder="Jouw naam"
                               [(ngModel)]="user.name"
                        >
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.EMAIL' | translate }}</mat-label>
                        <input matInput
                               disabled="true"
                               placeholder="Email" [value]="(selectedUser$|async).email">
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field class="example-chip-list">
                        <mat-chip-list #chipList aria-label="Fruit selection">
                            <mat-chip
                                *ngFor="let label of labels"
                                [selectable]="true"
                                [removable]="true"
                                (removed)="removeLabel(label)"
                            >
                                {{ label }}
                                <mat-icon matChipRemove>cancel</mat-icon>
                            </mat-chip>
                            <input placeholder="Labels"
                                   [matChipInputFor]="chipList"
                                   [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                                   [matChipInputAddOnBlur]="true"
                                   (matChipInputTokenEnd)="addLabel($event)">
                        </mat-chip-list>
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.EXPIRE_DATE' | translate }}</mat-label>
                        <input matInput [matDatepicker]="picker" [(ngModel)]="user.expirationDate">
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
export class ManageUserComponent implements OnInit, OnChanges, OnDestroy {

    separatorKeysCodes: number[] = [ENTER, COMMA];
    currentUserId: Observable<string> = this.store.select(fromRootSelector.selectRouteParam('userId'));

    selectedUser$: Observable<Player> = this.store.select(selectedUser);

    user: Player;
    labels: string[] = [];

    private subscription = new Subscription();

    constructor(private store: Store<State>) {}


    ngOnInit(): void {
        this.ngOnChanges(null);
        this.subscription.add(this.selectedUser$.pipe(filter(user => !!user)).subscribe(user => {
            this.user = { ...user };

            if (this.user.expirationDate && Number(this.user.expirationDate) > 0) {
                this.user.expirationDate = new Date(Number(this.user.expirationDate)) as any;
            }

            this.labels = this.user.label.split(';');
        }));

    }

    addLabel(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.labels.push(value.trim());
        }

        if (input) {
            input.value = '';
        }
    }

    removeLabel(label: string): void {
        const index = this.labels.indexOf(label);

        if (index >= 0) {
            this.labels.splice(index, 1);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.subscription.add(
            this.currentUserId.subscribe(userId => this.store.dispatch(new GetAccountRequest(userId)))
        );
    }

    save() {
        const payload = {
            ...this.user,
            expirationDate: this.user.expirationDate ? (this.user.expirationDate as any).getTime() : -1,
            label: this.labels.join(';'),
        }

        this.store.dispatch(new UpdateAccountRequest(payload));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new SelectPlayer(null));
    }
}
