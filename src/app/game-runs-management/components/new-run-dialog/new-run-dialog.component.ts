import {Component, EventEmitter, Inject, Output,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateRunRequestAction} from "../../store/game-runs.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-new-run-dialog',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="dialogRef.close();"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">
               {{'RUNS.MAKE_RUN'|translate}}
            </div>
            <div class="pos-inner-block">


                <mat-form-field class="gl-pos-field-full-width gl-pos-between-fields font-regular-16-24-roboto ">
                    <mat-label>{{'RUNS.GROUP_NAME'|translate}}</mat-label>
                    <input class="contrast-color-50pct"
                           matInput [(ngModel)]="title"
                           [type]="'text'">
                </mat-form-field>

                <button class="pos-create-button gl-style-button-no-shadow font-medium-14-20-roboto"
                        mat-raised-button
                        [disabled]="title.length < 2"
                        color="primary" (click)="saveClick()">{{'RUNS.MAKE_GROUP' | translate}}
                </button>

            </div>
        </div>


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
            margin-top: 141px;
            width: 320px;
            left: 50%;
            transform: translate(-50%, 0%);
        }
    `]
})
export class NewRunDialogComponent {
    @Output() esc = new EventEmitter();

    title = '';

    constructor(
        public dialogRef: MatDialogRef<NewRunDialogComponent>,
        private store: Store<State>
    ) {
    }

    saveClick(): void {
        this.store.dispatch(new CreateRunRequestAction({title: this.title}));
        this.dialogRef.close();
    }

}
