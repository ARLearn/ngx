import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {selectAll} from "../store/user-library.selectors";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";

@Component({
    selector: 'app-featured-banner',
    template: `
        <div>
            <div class="font-regular-24-24-roboto featured-text">Uitgelicht</div>
        </div>
        <div class="featured-outer">
            <div
                    
                    *ngFor="let game of (featuredGames|async)"
                    class="featured-image">

                <div class="positioned-image"
                     [routerLink]="'/portal/root/library/game/' + game.gameId">
                    <app-filestore-background-image

                            [paths]="['/featuredGames/backgrounds/'+game.gameId+'.png']"
                            (isVideo)="false"
                    ></app-filestore-background-image>
                </div>

            </div>
        </div>
    `,
    styles: [
            `
            .featured-text {
                margin-top: 71px;
                text-align: left;
                color: #000000;
                opacity: 1;
            }

            .featured-outer {
                display: flex;
                flex-wrap: wrap;
                margin-top: 8px;
            }

            .featured-image {
                width: 232px;
                height: 134px;
                background-color: #1b77c5;
                border-radius: 3px;
                opacity: 1;
                margin-top: 16px;
                margin-right: 16px;
                cursor: pointer;
            }

            .positioned-image {
                position: absolute;
                width: 236px;
                height: 134px;
            }
        `
    ]
})
export class FeaturedBannerComponent implements OnInit {

    featuredGames: Observable<Game[]> = this.store.select(selectAll);

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
    }

}
