import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../core/reducers';
import { Observable, Subscription } from "rxjs";
import * as fromSel from '../store/run-responses.selectors';
import { getMessagesSelector } from "../../game-messages/store/game-messages.selector";
import { GetGameMessagesRequestAction } from "../../game-messages/store/game-messages.actions";
import { GameMessage } from "../../game-messages/store/game-messages.state";
import { getEditMessageSelector } from 'src/app/game-message/store/game-message.selector';
import { getPlayers } from 'src/app/game-runs-management/store/game-runs.selector';

@Component({
    selector: 'app-arlearn-responses-table',
    template: `
    <div class="answers" *ngIf="editMessage$ | async as editMessage">
        <ng-container *ngIf="isPictureQuestion(editMessage.type); else answers">
            <div class="users-filter-wrapper">
                <button class="actions-btn" mat-button [matMenuTriggerFor]="menu">{{ 'BTN.ACTIONS' | translate }} <mat-icon>keyboard_arrow_down</mat-icon></button>
                <mat-menu #menu="matMenu" [overlapTrigger]="true" class="rounded-0">
                    <div class="users-filter" (click) = "$event.stopPropagation()">
                        <div>
                            <mat-form-field appearance="standard" class="search-input">
                                <mat-label>Zoek een speler</mat-label>
                                <input [(ngModel)]="playerQuery" matInput placeholder="Zoek een speler">
                                <mat-icon class="search-icon" matPrefix>search</mat-icon>
                            </mat-form-field>
                        </div>
                        <ul class="user-list">
                            <li class="user-list-item selectable" [class.selected]="selectedUser && user.fullId == selectedUser.fullId" *ngFor="let user of filteredPlayers" (click)="selectUser(user)">
                                <div class="user-avatar"><mat-icon>people</mat-icon><span class="user-avatar__text">{{ getShortAvatarName(user.name) }}</span></div>
                                <div class="user-name">{{ user.name }}</div>
                            </li>
                        </ul>
                    </div>
                </mat-menu>
            </div>

            <app-photo-gallery class="w-100" [responses]="getResponsesImages()" [user]="selectedUser"></app-photo-gallery>
        </ng-container>

        <ng-template #answers>
            <mat-card class="answer mat-elevation-z3" [class.selected]="answer.isCorrect" *ngFor="let answer of editMessage.answers">
                <div *ngIf="answer.isCorrect" class="selected-icon">
                    <mat-icon class="icon">check</mat-icon>
                </div>
                <div class="border-bottom pb-3">
                        <div *ngIf="isImageTest(editMessage.type); else title">
                            <app-filestore-background-image
                                    *ngIf="!((!editMessage?.fileReferences) || (!(editMessage?.fileReferences[answer.id]))) "
                                    [paths]="[(editMessage?.fileReferences[answer.id])]"
                                    [deleteButton]="false"

                            >
                            </app-filestore-background-image>
                        </div>

                        <ng-template #title>
                            <h5 class="m-0 py-1">{{ answer.answer }}</h5>
                        </ng-template>
                </div>
                <ul class="user-list">
                    <li class="user-list-item" *ngFor="let user of getUsers(answer.id)">
                        <div class="user-avatar"><span class="user-avatar__text">{{ getShortAvatarName(user.name) }}</span></div>
                        <div class="user-name">{{ user.name }}</div>
                    </li>
                </ul>
            </mat-card>
        </ng-template>
    </div>
    `,
    styles: [`
        .answers {
            display: flex;
            align-items: stretch;
            width: 100%;
            height: 100%;

        }
        .answers .answer:not(:last-child) {
            margin-right: 1rem;
        }
        .answer {
            padding: 1rem;
            min-width: 210px;
            box-shadow: 0 1px 10px #0000001A;
            border: 2px solid transparent;
            border-radius: 2px;
        }
        .answer.selected {
            position: relative;
            border-color: #3DA1DE;
        }
        .answer ::ng-deep .background-pane {
            position: relative;
            width: 100%;
            height: 94px;
            object-fit: cover;
        }
        .selected-icon {
            position: absolute;
            top: -12px;
            right: -12px;
            background-color: #3DA1DE;
            color: #FFFFFF;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            text-align: center;
        }
        .selected-icon .icon {
            font-size: 18px;
            line-height: 24px;
        }
        .user-list {
            list-style: none;
            padding: 0.5rem 0 0;
            margin: 0;
        }
        .user-list-item {
            display: flex;
            align-items: center;
            margin: 1rem 0;
            cursor: pointer;
        }
        .user-list-item .user-avatar {
            margin-right: 1rem;
        }
        .user-avatar {
            width: 30px;
            height: 30px;
            background: #DFE4E6 0 0 no-repeat padding-box;
            border-radius: 2px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
            line-height: 30px;
            letter-spacing: 0;
        }
        .user-avatar mat-icon {
            font-size: 20px;
            line-height: 31px;
            color: #ffffff;
            display: none;
        }
        .user-list-item.selectable .user-name {
            opacity: 0.54;
        }
        .user-list-item.selectable:hover .user-name,
        .user-list-item.selectable.selected .user-name {
            opacity: 1;
        }
        .user-list-item.selectable:hover .user-avatar,
        .user-list-item.selectable.selected .user-avatar  {
            background: #f44336;
        }
        .user-list-item.selectable:hover .user-avatar .user-avatar__text,
        .user-list-item.selectable.selected .user-avatar .user-avatar__text {
            display: none;
        }
        .user-list-item.selectable:hover .user-avatar mat-icon,
        .user-list-item.selectable.selected .user-avatar mat-icon {
            display: inline-block;
        }
        .user-avatar__text {
            color: #000000;
            opacity: 0.3;
        }
        .users-filter-wrapper {
            position: absolute;
            top: 7px;
            right: 0;
            z-index: 5;
        }
        .users-filter {
            padding: 0 1.5rem;
        }
        ::ng-deep .search-input .mat-form-field-prefix {
            bottom: -6px;
        }
    `]
})
export class ArlearnResponsesTableComponent implements OnInit, OnDestroy {
    @Input() selectedScreen: any;
    public messages$: Observable<any> = this.store.select(getMessagesSelector);
    public editMessage$: Observable<any> = this.store.select(getEditMessageSelector);
    public messagesAsync = {};
    public players: any[] = [];
    public selectedUser: any;
    public playerQuery: string = '';

    private responses$: Observable<any> = this.store.select(fromSel.selectAll);
    private players$: Observable<any> = this.store.select(getPlayers);
    private responses: any[];
    private subscription: Subscription;

    get filteredPlayers() {
        return this.players.filter(p => p.name.toLowerCase().includes(this.playerQuery));
    }

    constructor(private store: Store<State>) {
        this.subscription = this.messages$.subscribe((messages: GameMessage[]) => {
            messages.forEach(message => {
                this.messagesAsync[message.id] = message;
            });
        });

        this.subscription.add(this.responses$.subscribe(responses => {
            this.responses = responses;
        }));

        this.subscription.add(this.players$.subscribe(players => {
            this.players = players;
            // players[0] && this.selectUser(players[0]);
        }));
    }

    ngOnInit(): void {
        this.store.dispatch(new GetGameMessagesRequestAction());
    }

    getUsers(answerId) {
        const userIds = this.responses
            .filter(r => r.generalItemId === this.selectedScreen && r.responseValue === answerId)
            .map(r => r.userId);

        return this.players.filter(u => userIds.includes(u.fullId));
    }

    getShortAvatarName(name) {
        const [firstName, lastName] = name.split(' ');

        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    getResponsesImages() {
        return this.responses
            .filter(r => r.generalItemId == this.selectedScreen && (!this.selectedUser || (r.userId === this.selectedUser.fullId)))
            .map(r => r.responseValue);
    }

    getMessageName(id: string) {
        if (!this.messagesAsync[Number(id)]) {
            return "-";
        }
        return this.messagesAsync[Number(id)].name;

    }

    isImageTest(type) {
        return type.includes('ImageTest');
    }

    isPictureQuestion(type) {
        return type.includes('PictureQuestion');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    selectUser(user) {
        this.selectedUser = { fullId: user.fullId, avatar: this.getShortAvatarName(user.name), name: user.name }
    }

}
