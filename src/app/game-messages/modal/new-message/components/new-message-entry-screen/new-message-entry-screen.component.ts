import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: 'app-new-message-entry-screen',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="esc.emit()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">{{ 'MESSAGE.CREATE_TITLE' | translate }}</div>
            <div class="pos-tiles">
                <div class="flex-game-patterns">
                    <app-new-message-tile
                            *ngFor="let messageType of messageTypes"
                            class="flex-game-pattern-tile"
                            [title]="'MESSAGE.'+messageType.toLocaleUpperCase()"
                            [screenId]="messageType"
                            (click)="clickEvent.emit(messageType)"


                    ></app-new-message-tile>


                </div>
            </div>
        </div>
    `,
    styles: [`
        .pos-top {
            height: 1px;
        }

        .pos-button {
            position: absolute;
            right: 0px;
            width: 236px;
            height: 44px
        }


        .pos-title {
            position: relative;
            margin-top: 83px;
            height: 38px;
            text-align: center;
        }

        .pos-tiles {
            position: relative;
            margin-top: 79px;
            left: -8px;
            right: -8px;
            width: 1008px;

        }

        .flex-game-patterns {
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;

            align-content: flex-start;
            /*margin-top: 38px;*/
            padding-bottom: 20px;
        }


        .flex-game-pattern-tile {
            position: relative;
            width: 236px;
            height: 209px;
            margin: 8px;
            /*margin-bottom: 16px;*/
            /*margin-right: 16px;*/

            /*background: #FFFFFF 0% 0% no-repeat padding-box;*/
            opacity: 1;
        }

        /*.flex-game-pattern-tile:nth-child(4n+4) {*/
        /*    margin-right: 0;*/
        /*}*/

        .flex-game-pattern-tile:hover {
            position: relative;
            width: 236px;
            height: 209px;

            background: #ffffff 0% 0% no-repeat padding-box;
            opacity: 1;
            box-shadow: 0px 19px 38px #00000042;
        }
    `]
})
export class NewMessageEntryScreenComponent implements OnInit {
    @Output() clickEvent = new EventEmitter();
    @Output() esc = new EventEmitter();
    messageTypes: string[];

    constructor() {
        this.messageTypes = environment.messageType;
    }

    ngOnInit(): void {
    }

    selectMessage(mes: string) {
        console.log('select message', mes);
    }

}
