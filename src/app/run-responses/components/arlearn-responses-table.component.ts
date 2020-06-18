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
            box-shadow: 0px 1px 10px #0000001A;
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
        }
        .user-list-item {
            display: flex;
            align-items: center;
            margin: 1rem 0;
        }
        .user-list-item .user-avatar {
            margin-right: 1rem;
        }
        .user-avatar {
            width: 30px;
            height: 30px;
            background: #DFE4E6 0% 0% no-repeat padding-box;
            border-radius: 2px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
            line-height: 30px;
            letter-spacing: 0px;
        }
        .user-avatar__text {
            color: #000000;
            opacity: 0.3;
        }
    `]
})
export class ArlearnResponsesTableComponent implements OnInit, OnDestroy {
    @Input() selectedScreen: any;
    public messages$: Observable<any> = this.store.select(getMessagesSelector);
    public editMessage$: Observable<any> = this.store.select(getEditMessageSelector);
    public messagesAsync = {};

    private responses$: Observable<any> = this.store.select(fromSel.selectAll);
    private players$: Observable<any> = this.store.select(getPlayers);
    private responses: any[];
    private players: any[];
    private subscription: Subscription;

    constructor(private store: Store<State>) {
        this.subscription = this.messages$.subscribe((messages: GameMessage[]) => {
            messages.forEach(message => {
                this.messagesAsync[message.id] = message;
            });
        });

        this.subscription.add(this.responses$.subscribe(responses => {
            this.responses = responses;
        }));

        this.subscription.add(this.players$.subscribe(players => this.players = players));
    }

    ngOnInit(): void {
        this.store.dispatch(new GetGameMessagesRequestAction());
    }

    getUsers(answerId) {
        console.log(answerId, this.responses);

        const userIds = this.responses
            .filter(r => r.generalItemId = this.selectedScreen && r.responseValue === answerId)
            .map(r => r.userId);

        return this.players.filter(u => userIds.includes(u.fullId));
    }

    getShortAvatarName(name) {
        const [firstName, lastName] = name.split(' ');

        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
