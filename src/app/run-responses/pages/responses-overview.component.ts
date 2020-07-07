import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { Game } from "../../game-management/store/current-game.state";
import { getGame } from "../../game-management/store/current-game.selector";
import { Store } from "@ngrx/store";
import { State } from "../../core/reducers";
import { Query } from "../store/run-responses.actions";
import { GetCurrentRunFromRouterRequestAction, GetGameRunsRequestAction } from "../../game-runs-management/store/game-runs.actions";
import { GetCurrentGameFromRouterRequestAction } from "../../game-management/store/current-game.actions";
import { PlayerLoadRequestAction } from "../../player-management/store/player.actions";
import {
    getMultipleMessagesSelector,
    getSelectedScreen
} from "../../game-messages/store/game-messages.selector";
import { SetSelectedScreenAction} from "../../game-messages/store/game-messages.actions";
import {GameMessageEditCompletedAction, ResetGameMessageEditAction} from "../../game-message/store/game-message.actions";
import { getEditMessageSelector } from 'src/app/game-message/store/game-message.selector';

@Component({
    selector: 'app-actions-overview',
    template: `
        <ng-container>
            <app-game-detail-navbar [game]="game$ | async">
                <div class="button-placeholder">

                </div>
            </app-game-detail-navbar>
            <div class="full-width-container maxwidth">
                <app-run-tab-select></app-run-tab-select>
                <div class="run-container">
                    <div class="photo-container" *ngIf="selectedImageUrl">
                        <div class="photo">
                            <app-preview-pane-mobile-view></app-preview-pane-mobile-view>
                        </div>
                    </div>
                    <div class="answers-wrapper">
                        <app-arlearn-responses-table [selectedScreen]="selectedScreen"></app-arlearn-responses-table>
                    </div>
                </div>
            </div>

            <mat-toolbar class="toolbar-white mat-elevation-z2" *ngIf="messages">
                <div class="maxwidth">
                    <div class="count-wrapper">
                        <span class="font-medium-14-20-roboto count-label">Schermen</span>
                        <mat-chip-list>
                            <mat-chip class="count" color="primary" disableRipple selected>{{ messages.length }}</mat-chip>
                        </mat-chip-list>
                    </div>
                    <div class="screens horizontal-scroll-wrapper" (wheel)="onScrollChips($event)">
                        <mat-chip-list>
                            <mat-chip
                                    *ngFor="let item of messages"
                                    color="primary"
                                    class="light-chip"
                                    (click)="selectedScreen === item.id ? deselect() : onSelect(item)"
                                    [selected]="selectedScreen == item.id"
                            >{{ item.name }}</mat-chip>
                        </mat-chip-list>
                    </div>
                </div>
            </mat-toolbar>
        </ng-container>
    `,
    styles: [`
        .run-container {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
            align-content: center;
        }
        .toolbar-white {
            background-color: #ffffff;
            position: fixed;
            bottom: 0;
            height: 71px;
        }
        .toolbar-white .maxwidth {
            flex: 1;
            display: flex;
        }
        .count-wrapper {
            display: flex;
            align-items: center;
        }
        .count-label {
            margin-right: 10px;
            text-transform: uppercase;
        }
        .count {
            min-height: 28px;
            padding: 5px 20px;
        }
        .screens {
            margin-left: 40px;
            width: 100%;
            overflow-x: auto;
        }
        @media all and (min-width: 992px) {
            .screens {
                width: 70vw;
                margin-right: -50%;
            }
        }
        .horizontal-scroll-wrapper::-webkit-scrollbar {
            width: 1px;
            height: 1px;
        }

        .horizontal-scroll-wrapper::-webkit-scrollbar-button {
            width: 1px;
            height: 1px;
        }
        ::ng-deep .screens .mat-chip-list-wrapper {
            flex-wrap: nowrap;
            margin: 0;
        }
        .photo-container {
            border-right: 1px solid #e8eaea;
            margin: 0 20px 0 0;
        }
        .photo {
            margin: 0 20px 0 0;
            min-height: 360px;
            position: relative;
        }
        .photo img {
            display: block;
            width: 100%;
            height: 100%;
        }
        .photo ::ng-deep .preview-outer-pane {
            top: 0;
        }
        .photo ::ng-deep .preview-outer-pane .preview-pane {
            width: 280px;
        }
        .answers-wrapper {
            width: 100%;
            margin: -1rem;
            padding: 1rem;
            overflow: auto;
        }
    `]
})
export class ResponsesOverviewComponent implements OnInit, OnDestroy {
    public game$: Observable<Game> = this.store.select(getGame);
    public selectedScreen;
    public messages;
    public selectedImageUrl;
    
    public editMessage$: Observable<any> = this.store.select(getEditMessageSelector);
    private messages$: Observable<any> = this.store.select(getMultipleMessagesSelector);
    private selectedScreen$: Observable<any> = this.store.select(getSelectedScreen);
    private subscription: Subscription;

    constructor(
        private store: Store<State>,
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.selectedScreen$.subscribe(data => {
            this.selectedScreen = data;

            if (this.messages) {
                const mess = this.messages.find(message => message.id === this.selectedScreen);
                this.selectedImageUrl = mess && mess.fileReferences.background;
            }
        });

        this.subscription.add(this.messages$.subscribe(data => {
            this.messages = data;
            if (data[0]) {
                this.store.dispatch(new SetSelectedScreenAction(data[0].id));
                this.store.dispatch(new GameMessageEditCompletedAction(data[0]));
            }
        }));

        this.store.dispatch(new GetGameRunsRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.store.dispatch(new GetCurrentRunFromRouterRequestAction());
        this.store.dispatch(new PlayerLoadRequestAction());
        this.store.dispatch(new Query());
    }

    onSelect(item) {
        this.store.dispatch(new SetSelectedScreenAction(item.id));
        this.store.dispatch(new GameMessageEditCompletedAction(item));
    }

    deselect() {
        this.store.dispatch(new SetSelectedScreenAction(null));
        this.store.dispatch(new ResetGameMessageEditAction());
    }

    onScrollChips(event) {
        document.querySelector('.screens').scrollLeft += event.deltaY;
        event.preventDefault();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
