import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {GameDetailScreensComponent} from '../game-detail-screens/game-detail-screens.component';
import {Observable, Subscription} from "rxjs";
import {getFilteredMessagesSelector, getMessagesLoading} from "../../store/game-messages.selector";
import {GameMessage} from "../../store/game-messages.state";
import {
    GameMessageDirectSaveAction,
    GameMessageEditCompletedAction,
    GameMessageUpdateAction,
} from "../../../game-message/store/game-message.actions";
import {getEditMessageSelector} from "../../../game-message/store/game-message.selector";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {AngularFireStorage} from "angularfire2/storage";
import {SetPreviewMessageAction} from "../../store/game-messages.actions";
import { map, tap } from 'rxjs/operators';
import {SetLoadingAction} from "../../../game-management/store/current-game.actions";

@Component({
    selector: 'app-game-detail-flowchart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-game-detail-navbar [game]="game$|async"></app-game-detail-navbar>

        <div *ngIf="messages$ | async as messages">
            <lib-wireflow
                    *ngIf="messages.length > 0 && !((loading$ | async))"
                    (selectMessage)="selectMessage($event)"
                    [messages]="messages"
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
    public messages$: Observable<GameMessage[]> = this.store.select(getFilteredMessagesSelector).pipe(
        map(messages => {
            for (const message of messages) {
                const path = message && message.fileReferences && message.fileReferences.background;
                if (path) {
                    message['backgroundPath'] = this.getDownloadUrl(path);
                }
            }

            return messages;
        })
    );
    loading$ = this.store.select(getMessagesLoading);

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
        console.log("message is changed in game-detail-flowchart.compontent.ts line 97");
// this message should not be called when loaading...
        messages.map(message => this.store.dispatch(new GameMessageDirectSaveAction(message)));
    }


    selectMessage($event) {

        this.store.dispatch(new GameMessageEditCompletedAction($event));
        this.store.dispatch(new SetPreviewMessageAction($event.id));
    }

    deselectMessage($event) {
        this.store.dispatch(new GameMessageEditCompletedAction(null));
        this.store.dispatch(new SetPreviewMessageAction(null));
    }

    noneSelected() {
        this.store.dispatch(new GameMessageEditCompletedAction(null));
        this.store.dispatch(new SetPreviewMessageAction(null));
    }

    onEvent(event) {
        switch (event.type) {
            case 'newOutputAdded': {
                if (event.nodeType === 'ScanTag' || event.nodeType === 'TextQuestion') {
                    this.store.dispatch(new GameMessageUpdateAction(event.payload.outputs));
                }

                break;
            }
            case 'FIRST_CHUNK_LOADING': {
                this.store.dispatch(new SetLoadingAction(event.payload));

                break;
            }
        }
    }
}

