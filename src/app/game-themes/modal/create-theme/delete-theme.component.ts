import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Subject} from "rxjs";
import {AngularFireStorage} from "angularfire2/storage";
import {GameTheme} from "../../store/game-theme.state";
import {getGame} from "../../../game-message/store/game-message.selector";
import {getMessagesSelector, getCurrentGameMessages} from "../../../game-messages/store/game-messages.selector";
import {GameMessageEditCompletedAction, ResetGameMessageEditAction} from "../../../game-message/store/game-message.actions";
import {StartUploadAction} from "../../../media-library/store/media-lib.actions";

@Component({
    selector: 'app-delete-theme',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'THEME.DELETE_THEME' | translate }}</div>

            <div class="pos-inner-block">
                <div class="message">
                    Ben je zeker dat je dit thema wil verwijderen
                </div>

                <div class="actions">
                    <button color="secondary" mat-raised-button (click)="onNoClick()">{{ 'ACTIONS.CANCEL' | translate }}</button>
                    <button color="primary" mat-raised-button (click)="onSubmit()">{{ 'ACTIONS.SUBMIT' | translate }}</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .pos-inner-block {
            position: relative;
            width: 320px;
            margin-top: 60px;
            left: 50%;
            transform: translate(-50%, 0%);
        }
        
        .actions {
            text-align: center;
        }

        .actions > * {
            margin: 8px;
        }
        
        .pos-top {
            height: 1px;
        }

        .pos-title {
            position: relative;
            margin-top: 83px;
            height: 38px;
            text-align: center;
        }

        .theme-panel .form {
            margin-right: 4rem;
        }


        .theme-icon label {
            color: rgba(0, 0, 0, 0.4);
        }
    `]
})
export class DeleteThemeComponent implements OnInit, OnDestroy {
    public theme: any = {
        iconPath: '',
        primaryColor: '#ffffff',
        fullAccount: '',
        themeId: ''
    };

    private submit$: Subject<GameTheme> = new Subject<GameTheme>();


    get submit() {
        return this.submit$.asObservable();
    }

    constructor(public dialogRef: MatDialogRef<DeleteThemeComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public store: Store<State>) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }

    onNoClick() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submit$.next({
            ...this.theme,
        });
    }
}
