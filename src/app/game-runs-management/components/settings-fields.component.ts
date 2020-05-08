import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {GameRun} from "../store/game-runs.state";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {getEditRunSelector} from "../store/game-runs.selector";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {RunSaveAction, RunUpdateAction} from "../store/game-runs.actions";


@Component({
    selector: 'app-settings-fields',
    template: `
        <div class="title primary-color font-regular-24-24-roboto gl-pos-between-fields">{{(run$|async)?.title}}</div>
        <div class="pos-fields-container gl-pos-between-fields">


            <mat-form-field class="gl-pos-field-full-width gl-pos-between-fields">

                <mat-label>{{'RUNS.GROUP_NAME'|translate}}</mat-label>

                <input matInput placeholder="Title"

                       [ngModel]="(run$|async)?.title"
                       (ngModelChange)="runTitleChange($event)">

            </mat-form-field>
            

            <mat-slide-toggle
                    class="gl-pos-between-fields gl-pos-field-full-width font-regular-11-15-roboto gl-multiple-choice color-black-8a"
                    [ngModel]="(run$|async)?.runConfig.selfRegistration"
                    [labelPosition]="'before'"
                    (change)="changeSelfRegistration($event)">{{'RUNS.SELF_REGISTRATION'|translate}}
            </mat-slide-toggle>

            <button
                    class="gl-pos-button-right pos-button gl-style-stroke-button gl-style-large-button"
                    mat-stroked-button color="primary" (click)="submit()">{{'ACTIONS.SAVE' |translate}}
            </button>
        </div>
    `,
    styles: [`
        .title {
            margin-top: 74px;
            width: 100%;
            left: 84px;
            text-align: left;

        }

        .pos-fields-container {
            position: relative;
            width: 403px;
            left: 84px;
        }

        .pos-button {
            margin-top: 40px;
            width: 131px;
            text-transform: uppercase;
        }
    `]
})
export class SettingsFieldsComponent implements OnInit {

    @Output() showQrCode = new EventEmitter<boolean>();
    run$: Observable<GameRun> = this.store.select(getEditRunSelector);
    title = '';
    type = '';

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
    }

    runTitleChange(event: any) {
        console.log("$ev", event);
        this.store.dispatch(new RunUpdateAction({
            title: event
        }));
    }



    changeSelfRegistration(event: MatSlideToggle) {
        console.log("$ev", event);
        this.store.dispatch(new RunUpdateAction({
            runConfig: {
                selfRegistration: event.checked
            }
        }));
    }

    submit() {
        this.store.dispatch(new RunSaveAction());
    }
}
