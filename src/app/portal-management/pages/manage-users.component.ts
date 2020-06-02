import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {SearchUserRequestAction} from "../../player-management/store/player.actions";
import {Observable} from "rxjs";
import {Player} from "../../player-management/store/player.state";
import {getSearchedUsers} from "../../player-management/store/player.selector";

@Component({
    selector: 'app-manage-users',
    template: `
        <app-top-level-navbar [title]="'Portaal beheer'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
        </app-top-level-navbar>
        
        
        {{userList|async|json}}
    `,
    styles: [`
        .full-width-container {
            background-color: #F0F4F5; /*todo move up*/
        }


        .search {
            top: 155px;
            left: 0px;
            width: 320px;
            height: 35px;
            opacity: 1;
            position: absolute;
        }

        .gamesContainer-outer {
            margin-right: auto;
            margin-left: auto;
            position: relative;
        }

        .gamesContainer {
            position: relative;
            top: 109px;
            left: -8px;
            right: 140px;
            width: calc(100% + 16px);
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            align-content: center;
        }

        .gameTile {
            width: 236px;
            height: 388px;
            margin: 8px;
        }
    `]
})
export class ManageUsersComponent implements OnInit {
    subMenuItems = [
        {
            routerLink: '/portal/root/portal',
            label: 'MANAGE.GAME_LIBRARY'
        },
        {
            routerLink: '/portal/root/usrmgt',
            label: 'MANAGE.USERS'
        },
    ];


    userList: Observable<Player> = this.store.select(getSearchedUsers);
    constructor(private store: Store<State>
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(new SearchUserRequestAction({query: "some query"}));
    }

}
