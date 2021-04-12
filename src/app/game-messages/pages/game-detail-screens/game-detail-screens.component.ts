import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {GetGameMessagesRequestAction, GetMessageDeleteRequestAction, SetFilterAction} from '../../store/game-messages.actions';
import {Observable, Subscription} from 'rxjs';
import {getGame, iCanWrite} from '../../../game-management/store/current-game.selector';
import {Game} from '../../../game-management/store/current-game.state';
import {GetCurrentGameFromRouterRequestAction} from '../../../game-management/store/current-game.actions';

import {NewMessageComponent} from '../../modal/new-message/new-message.component';
import {MatDialog} from '@angular/material/dialog';
import {getFilteredMessagesSelector, getFiltersSelector} from "../../store/game-messages.selector";
import {take, tap} from "rxjs/operators";
import {SetGamesFilterAction} from "../../../games-management/store/game.actions";
import {environment} from "../../../../environments/environment";
import {selectEntities} from "../../../game-themes/store/game-theme.selectors";
import {Query} from "../../../game-themes/store/game-theme.actions";
import {GoogleAnalyticsService} from "ngx-google-analytics";

@Component({
    selector: 'app-game-detail-screens',
    template: `
        <app-game-detail-navbar [game]="game$|async">
            <div class="button-placeholder" *ngIf="iCanWrite|async">
                <div class="button-center">
                    <button color="accent" mat-fab (click)="newMessage()">
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>
        </app-game-detail-navbar>

        <div class="full-width-container">
            <div class="maxwidth">
                <div class="gamesContainer-outer">
                    <app-search-button
                            [placeholder]="'MESSAGE.START_TYPING_TO_SEARCH' | translate"
                            [dispatchAction]="dispatchAction"
                            [filter]="filter"
                    >
                    </app-search-button>
                    
                    <div class="gamesContainer">
                        <app-screen-tile class="gameTile"
                                         *ngFor="let message of (messages$|async)"
                                         [title]="message.name"
                                         [isVideo]="message.type === 'org.celstec.arlearn2.beans.generalItem.VideoObject'"
                                         [subtitle]="message.lastModificationDate | date:'mediumDate'"
                                         [imagePath]="message?.fileReferences?.background || themes[(game$ | async)?.theme]?.backgroundPath"
                                         [themeId]="(game$ | async)?.theme"
                                         [videoPath]="message?.fileReferences ?message?.fileReferences['video']:null"
                                         [actionText]="['MESSAGE.DELETEMESSAGE']"
                                         [clickText]="'MESSAGE.EDIT_MESSAGE' "
                                         [navTo]="'/portal/'+message.gameId+'/message/'+message.id+'/detail'"
                                         [icon]="getIcon(message)"
                                         [displayAsset]="displayAsset(message)"
                                         (actionClicked)="deleteScreen(message, $event)"></app-screen-tile>
                    </div>
                </div>

            </div>
        </div>`,
    styles: [`
        .gamesContainer-outer {
            margin-right: auto;
            margin-left: auto;
            position: relative;
        }

        .gamesContainer {
            top: 109px;
            left: -8px;
            right: 140px;
            width: calc(100% + 16px);
            position: relative;
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            
            align-content: center;
            /*background-color: blue;*/
        }
        
        .gameTile {
            width: 236px;
            height: 388px;

            margin: 8px;
        }

    `]
})
export class    GameDetailScreensComponent implements OnInit, OnDestroy {
    public game$: Observable<Game> = this.store.select(getGame);
    public messages$: Observable<any> = this.store.select(getFilteredMessagesSelector);
    public currentFilter$: Observable<string[]> = this.store.select(getFiltersSelector).pipe(
        take(1),
    );

    public themes = {};

    public dispatchAction = new SetFilterAction();
    private filterSubscription: Subscription;
    public filter: string;
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));
    public subscription: Subscription;
    constructor(
        public dialog: MatDialog,
        public store: Store<State>,
        public gaService: GoogleAnalyticsService
    ) {
    }

    ngOnInit() {
        if (environment.gatracking !== '') {
            this.gaService.event('OPEN_GAME', 'GAME');
        }

        this.store.dispatch(new Query());
        this.store.dispatch(new GetGameMessagesRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.filterSubscription = this.currentFilter$.subscribe((f) => this.filter = f[0]);
        this.subscription = this.store.select(selectEntities)
            .subscribe(themes => this.themes = themes);
    }

    newMessage() {
        const dialogRef = this.dialog.open(NewMessageComponent, {
            width: '99%',
            data: {},
            panelClass: ['modal-fullscreen', "modal-dialog"]
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.animal = result;
        });
    }

    ngOnDestroy(): void {
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        this.subscription?.unsubscribe();
    }

    deleteScreen(message, action) {
        this.store.dispatch(new GetMessageDeleteRequestAction(message.id));
    }

    getIcon(message) {
        let icon = message.type.substr(message.type.lastIndexOf('.') + 1);
        return environment.messageTypeToIcon[message.type.substr(message.type.lastIndexOf('.') + 1)];

    }

    displayAsset(message) {
        if (message.type === 'org.celstec.arlearn2.beans.generalItem.ScanTag'){
            return '/assets/img/scantag/ScanTag2.png';
        }
        return '';
    }
}
