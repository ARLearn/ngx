import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter} from "rxjs/operators";
import {Subject, Subscription} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {ActionsSubject, Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Organisation} from "../store/organisations.state";
import {CreateOrganisationError, OrganisationActionTypes} from "../store/organisations.actions";

@Component({
    selector: 'app-add-organization-dialog',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <form class="maxwidth" [formGroup]="form">
            <div class="pos-title primary-color font-medium-32-43-roboto">
                {{ 'CONTACT.ADD_ORGANISATION' | translate }}
            </div>
            <div class="pos-inner-block">
                <div class="form-field">
                    <mat-form-field>
                        <mat-label>{{ 'USER.NAME' | translate }}</mat-label>
                        <input matInput
                               placeholder="Organisatie naam"
                               formControlName="name"
                        >
                        <mat-error>Field is required</mat-error>
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
export class AddOrganizationDialogComponent implements OnInit , OnDestroy {
    user: Partial<Organisation> = {
        name: ''
    };
    form: FormGroup;
    private _submit$: Subject<Organisation> = new Subject<Organisation>();

    get submit() {
        return this._submit$.asObservable();
    }

    private subscription = new Subscription();

    constructor(
        public dialogRef: MatDialogRef<AddOrganizationDialogComponent>,
        private store: Store<State>,
        private actionsSubject$: ActionsSubject,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]]
        });

        this.subscription.add(this.actionsSubject$.pipe(
            filter((action) => action.type === OrganisationActionTypes.ADD_ALL)
        ).subscribe(() => {
            this.dialogRef.close();
        }));

        this.subscription.add(this.actionsSubject$.pipe(
            filter((action) => action.type === OrganisationActionTypes.CREATE_ORGANISATION_ERROR)
        ).subscribe((action: CreateOrganisationError) => {
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
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
