import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetFeaturedGames, GetRecentGamesRequestAction, SearchGamesRequestAction} from "../store/user-library.actions";
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import { selectAll } from '../store/user-library.selectors';
import Debounce from 'debounce-decorator';
import {Query} from "../../game-themes/store/game-theme.actions";

@Component({
    selector: 'app-game-library-user',
    template: `
        <app-top-level-navbar [title]="'Game Library'">

        </app-top-level-navbar>
        <div class="maxwidth">
            <div class="mb-3 d-flex align-items-center justify-content-between">
                <div class="search-input">
          

                </div>
            </div>
        </div>
        <div class="game-library maxwidth">
            <app-featured-banner></app-featured-banner>

            <div class="mb-3 d-flex align-items-center justify-content-between">
                <div class="search-input">
                    <mat-form-field appearance="standard" class="search-input">
                        <mat-label>{{'MESSAGE.START_TYPING_TO_SEARCH'|translate}}</mat-label>
                        <input matInput [placeholder]="'MESSAGE.START_TYPING_TO_SEARCH'|translate"
                               (input)="onQueryChange($event.target.value)"
                        >
                        <mat-icon class="search-icon" matPrefix>search</mat-icon>
                    </mat-form-field>
                </div>
            </div>
            <app-library-games-table>

            </app-library-games-table>
        </div>
        
    `,
    styles: [`
        .search-input {
            width: 320px;
        }
    `]
})
export class GameLibraryUserComponent implements OnInit {

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetFeaturedGames());
        this.store.dispatch(new GetRecentGamesRequestAction());
        this.store.dispatch(new Query());
    }

    @Debounce(300)
    onQueryChange(query: string) {
        if (query.length > 2) {
            console.log("query is now", query);
            this.store.dispatch(new SearchGamesRequestAction(query));
        } else {
            this.store.dispatch(new GetRecentGamesRequestAction());
        }
    }

}
