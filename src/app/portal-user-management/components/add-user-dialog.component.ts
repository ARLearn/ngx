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
    selector: 'app-add-user-dialog',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <form class="maxwidth" [formGroup]="form">
            <div class="pos-title primary-color font-medium-32-43-roboto">
                {{ 'CONTACT.ADD_PLAYER' | translate }}
            </div>
            <div class="pos-inner-block">
                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.NAME' | translate }}</mat-label>
                        <input matInput
                               placeholder="Jouw naam"
                               formControlName="name"
                        >
                        <mat-error>Field is required</mat-error>
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.EMAIL' | translate }}</mat-label>
                        <input matInput
                               placeholder="Email"
                               formControlName="email"
                        >
                        <mat-error *ngIf="form.controls.email.errors && form.controls.email.errors.required">Field is required</mat-error>
                        <mat-error *ngIf="form.controls.email.errors && form.controls.email.errors.email">Email is invalid</mat-error>
                    </mat-form-field>
                </div>

                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.PASSWORD' | translate }}</mat-label>
                        <input matInput type="password"
                               placeholder="Password"
                               formControlName="password"
                        >
                        <mat-error>Field is required</mat-error>
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
               

                <button class="pos-create-button gl-style-button-no-shadow font-medium-14-20-roboto"
                        mat-raised-button color="primary"
                        (click)="onSaveClick()">
                    {{ 'CONTACT.ADD_COLLAB_BUTTON' | translate }}
                </button>
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
        
        .form-field {
            margin-top: 20px;
        }

        .form-field mat-form-field {
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
export class AddUserDialogComponent implements OnInit, OnDestroy {
    separatorKeysCodes: number[] = [ENTER, COMMA];
    user: Partial<Player> = {
        name: '',
        password: '',
        email: '',
        label: ''
    };
    labels: string[] = [];

    form: FormGroup;

    private _submit$: Subject<Player> = new Subject<Player>();

    get submit() {
        return this._submit$.asObservable();
    }

    private subscription = new Subscription();

    constructor(
        public dialogRef: MatDialogRef<AddUserDialogComponent>,
        private store: Store<State>,
        private actionsSubject$: ActionsSubject,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            password: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            label: ['', []],
        });

        this.subscription.add(this.actionsSubject$.pipe(
            filter((action) => action.type === PortalUserActionTypes.CREATE_ACCOUNT_SUCCESS)
        ).subscribe(() => {
            this.dialogRef.close();
        }));

        this.subscription.add(this.actionsSubject$.pipe(
            filter((action) => action.type === PortalUserActionTypes.CREATE_ACCOUNT_ERROR)
        ).subscribe((action: CreateAccountError) => {
            this._snackBar.open(action.message, '', {
                duration: 3000,
                panelClass: 'my-snack-bar'
            });
        }));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick() {
        if (this.form.valid) {
            this._submit$.next(this.form.value);
        }
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

        this.form.patchValue({ label: this.labels.join(';') });
    }

    removeLabel(label: string): void {
        const index = this.labels.indexOf(label);

        if (index >= 0) {
            this.labels.splice(index, 1);
        }

        this.form.patchValue({ label: this.labels.join(';') });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
