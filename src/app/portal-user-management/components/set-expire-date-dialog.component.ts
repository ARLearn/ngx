import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionsSubject, Store} from '@ngrx/store';

import { State } from '../../core/reducers';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Player} from "../../player-management/store/player.state";
import {MatChipInputEvent} from "@angular/material/chips";
import {Subject, Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {CreateAccountError, PortalUserActionTypes} from "../store/portal-users.actions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-set-expire-date-dialog',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <form class="maxwidth" [formGroup]="form" (ngSubmit)="form.valid && onSubmit()">
            <div class="pos-title primary-color font-medium-32-43-roboto">
                {{ 'PORTAL_MANAGEMENT.USERS.EXPIRES_DATE_LABEL' | translate }}
            </div>
            
            <div class="pos-inner-block">
                <mat-form-field>
                    <mat-label>{{ 'USER.EXPIRE_DATE' | translate }}</mat-label>
                    <input matInput [matDatepicker]="picker" formControlName="date" />
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                    <mat-error>This field is required</mat-error>
                </mat-form-field>

                <div class="actions">
                    <button color="secondary" type="button" mat-raised-button (click)="onNoClick()">{{ 'BTN.CANCEL' | translate }}</button>
                    <button color="primary" type="submit" mat-raised-button>{{ 'BTN.SUBMIT' | translate }}</button>
                </div>    
            </div>
            
            
        </form>
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
            margin-top: 60px;
            left: 50%;
            transform: translate(-50%, 0%);
        }
        
        .message {
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .actions {
            margin-top: 10px;
            text-align: center;
        }

        .actions > * {
            margin: 8px;
        }
        
        mat-form-field {
            width: 100%;
        }

    `]
})
export class SetExpireDateDialogComponent implements OnInit, OnDestroy {
    form: FormGroup;

    private _submit$: Subject<any> = new Subject();

    get submit() {
        return this._submit$.asObservable();
    }

    private subscription = new Subscription();

    constructor(
        public dialogRef: MatDialogRef<SetExpireDateDialogComponent>,
        private store: Store<State>,
        private actionsSubject$: ActionsSubject,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
    ) {
        this.form = this.fb.group({
            date: ['', [Validators.required]]
        });
    }

    ngOnInit() {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this._submit$.next(this.form.value);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
