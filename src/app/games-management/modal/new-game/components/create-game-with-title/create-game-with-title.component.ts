import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreateGameRequestAction} from '../../../../store/game.actions';
import {State} from '../../../../../core/reducers';
// @ts-ignore
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-create-game-with-title',
    template: `
        <div class="maxwidth">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="esc.emit()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="back.emit()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">

            <div class="pos-scratch-button-row">
            </div>
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'GAME.NEW_GAME_TITLE' | translate }}</div>
            <div class="pos-subtitle contrast-color-50pct font-regular-17-13-roboto">{{ 'GAME.NEW_GAME_SUBTITLE' | translate }}</div>
            <!--        <app-game-patterns-container class="pos-tiles">tiles</app-game-patterns-container>-->
        </div>
        <div class="pos-inner-block">
            <mat-form-field class="pos-game-title-field font-regular-16-24-roboto ">
                <input class="contrast-color-50pct"
                       matInput placeholder="{{ 'GAME.NAME_FIELD' | translate }}"
                       [type]="'text'" [(ngModel)]="title">
            </mat-form-field>

            <button class="pos-create-button gl-style-button-no-shadow font-medium-14-20-roboto"
                    mat-raised-button
                    color="primary" (click)="saveClick()">{{ 'GAME.CREATE_BUTTON_TITLE' | translate }}</button>

        </div>

    `,
    styles: [`
        .pos-scratch-button-row {
            position: relative;
            margin-top: 28px;
            height: 44px;
        }

        .pos-title {
            position: relative;
            margin-top: 11px;
            height: 38px;
            text-align: center;
        }

        .pos-subtitle {
            position: relative;
            margin-top: 18px;
            height: 23px;
            text-align: center;
        }

        .pos-inner-block {
            position: relative;
            width: 320px;
            left: 50%;
            transform: translate(-50%, 0%);
        }

        .pos-game-title-field {
            position: relative;
            margin-top: 141px;
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
export class CreateGameWithTitleComponent {
    title: string;
    @Output() esc = new EventEmitter();
    @Output() back = new EventEmitter();

    constructor(public store: Store<State>) {
    }

    saveClick() {
        this.store.dispatch(new CreateGameRequestAction({
            title: this.title,
            description: ''
        }));
        this.esc.emit();

    }

}
