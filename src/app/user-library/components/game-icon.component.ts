import {Component, Input, OnInit} from '@angular/core';
import {PortalGame} from "../../portal-management/store/portal-games.state";
import {Game} from "../../game-management/store/current-game.state";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Query} from "../../game-themes/store/game-theme.actions";
import {Observable} from "rxjs";
import {selectEntities} from 'src/app/game-themes/store/game-theme.selectors';
import {GameTheme} from "../../game-themes/store/game-theme.state";
import {Dictionary} from "@ngrx/entity";

@Component({
    selector: 'app-game-icon',
    template: `

        <div class="icon-outer">
            <!--     {{(iconUrl|async)[game.theme]?.iconPath}}-->
            <div class="abbr">{{game.iconAbbreviation}}</div>
            <img class="icon"
                 [src]="'https://storage.googleapis.com/serious-gaming-platform-dev.appspot.com'+(iconUrl|async)[game.theme]?.iconPath"/>
        </div>
    `,
    styles: [`
        .icon-outer {
            position: relative;
        }

        .icon {
            width: 68px;
        }

        .abbr {
            position: absolute;
            color: white;
            bottom: 10px;
            left: 10px;

            font-size: 20px;
            font-weight: 800;
        }
    `]
})
export class GameIconComponent implements OnInit {
    @Input() game: Game;
    iconUrl: Observable<Dictionary<GameTheme>> = this.store.select(selectEntities);

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {


    }

}
