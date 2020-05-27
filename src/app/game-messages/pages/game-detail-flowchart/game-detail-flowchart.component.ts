import {Component, OnInit} from '@angular/core';
import {GameDetailScreensComponent} from '../game-detail-screens/game-detail-screens.component';
import {Observable} from "rxjs";
import {getFilteredMessagesSelector} from "../../store/game-messages.selector";
import {GameMessage} from "../../store/game-messages.state";
import {
    GameMessageDirectSaveAction,
    GameMessageEditAction,
    GameMessageEditCompletedAction
} from "../../../game-message/store/game-message.actions";
import {getEditMessageSelector} from "../../../game-message/store/game-message.selector";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-game-detail-flowchart',
    template: `
        <app-game-detail-navbar [game]="game$|async"></app-game-detail-navbar>

        <div *ngIf="(messages$|async).length !== 0 ">
            <lib-wireflow
                    (selectMessage)="selectMessage($event)"
                    [messages]="messages$ |async"
                    (messagesChange)="messagesChange($event)"
                    (deselectMessage)="deselectMessage($event)"
                    (noneSelected)="noneSelected()"
                    [lang]="lang"
            ></lib-wireflow>
        </div>

        <app-preview-pane class="pos-preview-pane" *ngIf="editMessage$|async">
        </app-preview-pane>


    `,
    styles: [`
        .pos-preview-pane {
            position: fixed;
            right: 0px;
            top: 0px;
            background: #FAFAFA;
            width: 429px;
            height: 100vh;
            z-index: 1;
            box-shadow: 0px 9px 18px #0000002E;
        }
    `]
})
export class GameDetailFlowchartComponent extends GameDetailScreensComponent {
    editMessage$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    public messages$: Observable<any> = this.store.select(getFilteredMessagesSelector);
    lang = 'en';

    messagesChange(messages: GameMessage[]) {
        // console.log('FROM WIREFLOW', messages);
        messages.map(message => this.store.dispatch(new GameMessageDirectSaveAction(message)));
    }

    ngOnInit() {
        super.ngOnInit();
    }

    selectMessage($event) {

        this.store.dispatch(new GameMessageEditCompletedAction($event));
    }

    deselectMessage($event) {

    }

    noneSelected() {

    }
}

