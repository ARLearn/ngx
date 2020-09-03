import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetFeaturedGames} from "../store/user-library.actions";
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import { selectAll } from '../store/user-library.selectors';
import Debounce from 'debounce-decorator';

@Component({
    selector: 'app-game-library-user',
    template: `
        <app-top-level-navbar [title]="'Game Library'">

        </app-top-level-navbar>
        <div class="game-library maxwidth">
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
                        <mat-label>Starting type to search games...</mat-label>
                        <input matInput placeholder="Starting type to search games..."
                               (input)="onQueryChange($event.target.value)"
                        >
                        <mat-icon class="search-icon" matPrefix>search</mat-icon>
                    </mat-form-field>
                </div>
            </div>
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
    }

    @Debounce(300)
    onQueryChange(query: string) {
        if (query.length > 2) {
            console.log("query is now", query);
        }
    }

}
