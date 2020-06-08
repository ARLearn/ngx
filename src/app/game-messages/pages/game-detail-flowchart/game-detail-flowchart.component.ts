import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDetailScreensComponent} from '../game-detail-screens/game-detail-screens.component';
import {Observable, Subscription} from "rxjs";
import {getFilteredMessagesSelector} from "../../store/game-messages.selector";
import {GameMessage} from "../../store/game-messages.state";
import {
    GameMessageDirectSaveAction,
    GameMessageEditCompletedAction,
    GameMessageUpdateAction,
} from "../../../game-message/store/game-message.actions";
import {getEditMessageSelector} from "../../../game-message/store/game-message.selector";
import {first, take} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {AngularFireStorage} from "angularfire2/storage";

@Component({
    selector: 'app-game-detail-flowchart',
    template: `
        <app-game-detail-navbar [game]="game$|async"></app-game-detail-navbar>

        <div *ngIf="messageAsync.length !== 0 ">
            <lib-wireflow
                    (selectMessage)="selectMessage($event)"
                    [messages]="messageAsync"
                    (messagesChange)="messagesChange($event)"
                    (deselectMessage)="deselectMessage($event)"
                    (noneSelected)="noneSelected()"
                    (onEvent)="onEvent($event)"
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
export class GameDetailFlowchartComponent extends GameDetailScreensComponent implements OnInit, OnDestroy {
    editMessage$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    public messages$: Observable<GameMessage[]> = this.store.select(getFilteredMessagesSelector);
    public messageAsync: GameMessage[] = [];
    lang = 'en';
    private messagesSubscription: Subscription;

    constructor(
        public dialog: MatDialog,
        public store: Store<State>,
        public afStorage: AngularFireStorage
    ) {
        super(dialog, store);
    }

    ngOnInit() {
        super.ngOnInit();
        this.messagesSubscription = this.messages$.subscribe(messages => this.onMessages(messages));
    }

    private onMessages(messages: GameMessage[]) {
        this.messageAsync = messages;

        for (const message of messages) {
            const path = message && message.fileReferences && message.fileReferences.background;
            if (path) {
                message['backgroundPath'] = this.getDownloadUrl(path);
            }
        }
    }

    private getDownloadUrl(path: string) {
        return this.afStorage.ref(path).getDownloadURL() as Observable<string>;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.messagesSubscription) {
            this.messagesSubscription.unsubscribe();
        }
    }

    messagesChange(messages: GameMessage[]) {
        messages.map(message => this.store.dispatch(new GameMessageDirectSaveAction(message)));
    }


    selectMessage($event) {

        this.store.dispatch(new GameMessageEditCompletedAction($event));
    }

    deselectMessage($event) {

    }

    noneSelected() {

    }

    onEvent(event) {
        switch (event.type) {
            case 'newOutputAdded': {
                if (event.nodeType === 'ScanTag') {
                    this.store.dispatch(new GameMessageUpdateAction(event.payload.outputs));
                }

                break;
            }
        }
    }
}

