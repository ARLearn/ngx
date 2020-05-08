import {Component, OnInit} from '@angular/core';
import {
    GetCurrentGameFromRouterRequestAction
} from "../../../game-management/store/current-game.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {GetGameMessagesRequestAction} from "../../store/game-messages.actions";
import {Observable} from "rxjs";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame} from "../../../game-management/store/current-game.selector";

@Component({
    selector: 'app-game-detail-settings',
    template: `
        <div class="box">
            <app-game-detail-navbar class="row header" [game]="game$|async"></app-game-detail-navbar>
            <div class="row content">
                <div class="maxwidth">
                    <div class="parent">
                        <app-game-settings-fields class="editor"></app-game-settings-fields>
                        <app-game-settings-preview class="preview-pane"></app-game-settings-preview>
                    </div>
                    <div class="space-below-button"></div>
                </div>
                <!--        <div style="background-color: yellow;width: 100px;height:1300px;"></div>-->
            </div>
            
            <!--    <div class="row footer">-->
            <!--        <p><b>footer</b> (fixed height)</p>-->
            <!--    </div>-->
        </div>
    `,
    styles: [`

        .parent {
            display: flex;
            height: 100%;
            min-width: 917px;
        }

        .editor {

            flex: 1;
            width: 937px;

        }

        .preview-pane {
            flex: 0 0 429px;
            height: 100%;
            background: #FAFAFA 0% 0% no-repeat padding-box;
            opacity: 1;
        }
        .space-below-button {
            height: 50px;
        }
    `]
})
export class GameDetailSettingsComponent implements OnInit {

    public game$: Observable<Game> = this.store.select(getGame);

    constructor(public store: Store<State>) {
    }


    ngOnInit(): void {
        this.store.dispatch(new GetGameMessagesRequestAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());

    }

}

