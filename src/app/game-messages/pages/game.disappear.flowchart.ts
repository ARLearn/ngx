import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {GameDetailScreensComponent} from './game-detail-screens/game-detail-screens.component';
import {Observable, Subscription} from "rxjs";
import {map, withLatestFrom} from 'rxjs/operators';
import {getFilteredMessagesSelector, getMessagesLoading} from "../store/game-messages.selector";
import {GameMessage} from "../store/game-messages.state";
import {
    GameMessageDirectSaveAction,
    GameMessageEditCompletedAction,
    GameMessageUpdateAction,
} from "../../game-message/store/game-message.actions";
import {getEditMessageSelector} from "../../game-message/store/game-message.selector";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {AngularFireStorage} from "angularfire2/storage";
import {ResetAction, SetPreviewMessageAction} from "../store/game-messages.actions";
import {SetLoadingAction} from "../../game-management/store/current-game.actions";
import {ActivatedRoute} from "@angular/router";
import {GoogleAnalyticsService} from "ngx-google-analytics";

@Component({
    selector: 'app-game-disappear-flowchart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-game-detail-navbar [game]="game$|async"></app-game-detail-navbar>

        <div *ngIf="messages$ | async as messages">
            <lib-wireflow
                    *ngIf="messages.length > 0 && !(loading$ | async)"
                    (selectMessage)="selectMessage($event)"
                    [messages]="messages"
                    [endsOnDisabled]="true"
                    (messagesChange)="messagesChange($event)"
                    (deselectMessage)="deselectMessage($event)"
                    (noneSelected)="noneSelected()"
                    (onEvent)="onEvent($event)"
                    [lang]="lang"
                    [selector]="'disappearOn'"
                    [noimage]="noimage$ | async"
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
export class GameDisappearFlowchartComponent extends GameDetailScreensComponent implements OnInit, OnDestroy {
    editMessage$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    noimage$ = this.activatedRoute.data.pipe(map(data => data.noimage));

    public messages$: Observable<GameMessage[]> = this.store.select(getFilteredMessagesSelector).pipe(
        withLatestFrom(this.noimage$),
        map(([messages, noimage]) => {
            if (noimage) {
                return messages;
            }

            for (const message of messages) {
                const path = message && message.fileReferences && message.fileReferences.background;
                if (path) {
                    message['backgroundPath'] = this.getDownloadUrl(path);
                }
            }
            return messages;
        })
    );
    lang = 'en';
    loading$ = this.store.select(getMessagesLoading);
    private messagesSubscription: Subscription;

    constructor(
        public dialog: MatDialog,
        public store: Store<State>,
        public afStorage: AngularFireStorage,
        private activatedRoute: ActivatedRoute,
        public gaService: GoogleAnalyticsService
    ) {
        super(dialog, store, gaService);
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

        this.store.dispatch(new ResetAction());
    }

    messagesChange(messages: GameMessage[]) {
        console.log("message change trigger");
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
                if (event.nodeType === 'ScanTag') {
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

