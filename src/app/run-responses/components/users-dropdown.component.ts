import {Component, Input, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../core/reducers';
import {Observable, Subscription} from "rxjs";
import {currentRunPlayers} from "../../game-runs-management/store/game-runs-players.selector";

@Component({
    selector: 'app-users-dropdown',
    template: `
        <div class="users-filter-wrapper">
            <button class="actions-btn" mat-button [matMenuTriggerFor]="menu">{{ 'RUNS.SHOWPLAYERS' | translate }}
                <mat-icon>keyboard_arrow_down</mat-icon>
            </button>
            <mat-menu #menu="matMenu" [overlapTrigger]="true" class="rounded-0">
                <div class="users-filter" (click)="$event.stopPropagation()">
                    <div>
                        <mat-form-field appearance="standard" class="search-input">
                            <mat-label>Zoek een speler</mat-label>
                            <input [(ngModel)]="playerQuery" matInput placeholder="Zoek een speler">
                            <mat-icon class="search-icon" matPrefix>search</mat-icon>
                        </mat-form-field>
                    </div>
                    <ul class="user-list">
                        <li class="user-list-item selectable" [class.selected]="selectedUser && user.fullId == selectedUser.fullId"
                            *ngFor="let user of filteredPlayers" (click)="selectUser(user)">
                            <div class="user-avatar">
                                <mat-icon>people</mat-icon>
                                <span class="user-avatar__text">{{ getShortAvatarName(user.name) }}</span></div>
                            <div class="user-name">{{ user.name }}</div>
                        </li>
                    </ul>
                </div>
            </mat-menu>
        </div>
    `,
    styles: [`
        .actions-btn {
            text-transform: uppercase;
            color: #20272B;
            opacity: 0.4;
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
        .user-list-item.selectable.selected .user-avatar {
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
        }

        .users-filter {
            padding: 0 1.5rem;
        }
    `]
})
export class UsersDropdownComponent implements OnDestroy {
    public players: any[] = [];
    public selectedUser: any;
    public playerQuery: string = '';
    @Output() onSelectUser = new EventEmitter();

    private players$: Observable<any> = this.store.select(currentRunPlayers);
    private subscription: Subscription = new Subscription();

    get filteredPlayers() {
        return this.players.filter(p => p.name?.toLowerCase().includes(this.playerQuery.toLowerCase()));
    }

    constructor(private store: Store<State>) {
        this.subscription.add(this.players$.subscribe(players => {
            this.players = players;
        }));
    }

    getShortAvatarName(name) {
        if (!name) {
            return '-';
        }
        const names = name.split(' ');

        if (names.length === 1) {
            return names[0][0].toUpperCase();
        }

        return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    selectUser(user) {
        this.selectedUser = {fullId: user.fullId, avatar: this.getShortAvatarName(user.name), name: user.name};

        this.onSelectUser.emit(this.selectedUser);
    }

}
