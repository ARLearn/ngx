import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Query} from "../store/run-responses.actions";
import {GetCurrentRunFromRouterRequestAction, GetGameRunsRequestAction} from "../../game-runs-management/store/game-runs.actions";
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";
import {PlayerLoadRequestAction} from "../../player-management/store/player.actions";
import * as fromRoot from 'src/app/core/selectors/router.selector';
import {getFilteredGamesSelector, getGameList} from "../../games-management/store/game.selector";
import {
    getFilteredMessagesSelector,
    getMultipleMessagesSelector,
    getSelectedScreen
} from "../../game-messages/store/game-messages.selector";
import {SetSelectedScreenAction} from "../../game-messages/store/game-messages.actions";

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
                            <app-filestore-background-image
                                    *ngIf="selectedImageUrl"
                                    [paths]="[selectedImageUrl]"
                                    [deleteButton]="false"

                            >
                            </app-filestore-background-image>
                        </div>
                    </div>
                    
 
<!--                    <div class="photo" *ngIf="selectedImageUrl">-->
<!--                        <img [src]="selectedImageUrl" alt="" />-->
<!--                    </div>-->
                    <div class="table">
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
                    <div class="screens">
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
            height: 94px;
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
            overflow-y: hidden;
        }
        ::ng-deep .screens .mat-chip-list-wrapper {
            flex-wrap: nowrap;
            margin: 0;
        }
        .photo-container {
            border-right: 1px solid #e8eaea;
            margin: 0 30px 0 0;
        }
        .photo {
            padding: 0 30px 0 0;
            margin: 0 30px 0 0;
            min-width: 260px;
            max-width: 260px;
            min-height: 360px;
            position: relative;
        }
        .photo img {
            display: block;
            width: 100%;
            height: 100%;
        }
    `]
})
export class ResponsesOverviewComponent implements OnInit, OnDestroy {
    public game$: Observable<Game> = this.store.select(getGame);
    public selectedScreen;
    public messages;
    public selectedImageUrl;

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
                this.selectedImageUrl = mess.fileReferences.background;
            }
        });

        this.subscription.add(this.messages$.subscribe(data => {
            this.messages = data;
        }));

        this.store.dispatch(new GetGameRunsRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.store.dispatch(new GetCurrentRunFromRouterRequestAction());
        this.store.dispatch(new PlayerLoadRequestAction());
        this.store.dispatch(new Query());
    }

    onSelect(item) {
        this.store.dispatch(new SetSelectedScreenAction(item.id));
    }

    deselect() {
        this.store.dispatch(new SetSelectedScreenAction(null));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
