import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../../core/reducers";
import {NewMessageRequestedAction} from "../../../../store/game-messages.actions";

@Component({
    selector: 'app-new-message-create',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="esc.emit()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="back.emit()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'MESSAGE.CREATE_TITLE' | translate }}</div>

        </div>
        <div class="pos-inner-block">
            <!--          <div class="pos-tile"></div>-->
            <app-new-message-tile class="pos-tile"
                                  [title]="'MESSAGE.'+messageType.toLocaleUpperCase()"
                                  [screenId]="messageType"
            >
            </app-new-message-tile>

            <mat-form-field class="pos-game-title-field font-regular-16-24-roboto ">
                <input class="contrast-color-50pct"
                       matInput placeholder="{{ 'MESSAGE.NAME_FIELD' | translate }}"
                       [type]="'text'" [(ngModel)]="title">
            </mat-form-field>

            <button class="pos-create-button gl-style-button-no-shadow font-medium-14-20-roboto"
                    mat-raised-button
                    [disabled]="title.length < 2"
                    color="primary" (click)="saveClick()">{{ 'MESSAGE.CREATE' | translate }}</button>

        </div>
    `,
    styles: [`
        .pos-top {
            height: 1px;
        }

        .pos-scratch-button-row {
            position: relative;
            margin-top: 28px;
            height: 44px;
        }

        .pos-title {
            position: relative;
            margin-top: 83px;
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
            margin-top: 86px;
            width: 100%;
        }

        .pos-create-button {
            position: relative;
            margin-top: 37px;

            width: 100%;
            height: 44px;
        }

        .pos-tile {
            position: relative;
            margin-top: 37px;
            left: calc(50% - 118px);
        }
    `]
})
export class NewMessageCreateComponent {
    @Input() messageType: string;
    @Output() esc = new EventEmitter();
    @Output() back = new EventEmitter();

    title = "";

    constructor(public store: Store<State>) {
    }

    saveClick(): void {
        this.store.dispatch(new NewMessageRequestedAction({
            type: 'org.celstec.arlearn2.beans.generalItem.' + this.messageType,
            name: this.title
        }));
        this.esc.emit();
    }

}
