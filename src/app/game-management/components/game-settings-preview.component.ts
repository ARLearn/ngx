import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Game} from "../store/current-game.state";
import {getGame, iAmOwner} from "../store/current-game.selector";
import {select, Store} from "@ngrx/store";
import {GameUpdateAction, SaveGameRequestAction} from "../store/current-game.actions";
import {State} from "../../core/reducers";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-game-settings-preview',
    template: `
        <div class="selector-full-width">
            <div class="selector-aligned d-flex flex-column justify-content-around align-items-center h-100">
                <app-game-theme-selector></app-game-theme-selector>

                <div class="pos-qr-code-container" *ngIf="game$ |async as game">
                    <div class="pos-scan-text font-medium-16-21-roboto">
                        Scan QR Code
                    </div>
                    <div class="pos-code">
                        <qr-code [value]="getQrCode(game?.gameId)" [size]="100"></qr-code>
                    </div>

                </div>
                
            </div>
        </div>
    `,
    styles: [`
        :host {
            background-color: red;
        }


        .selector-full-width {
            position: relative;
            height: 100%;
        }

        /*.selector-aligned {*/
        /*    height: 100%;*/
        /*    display: flex;*/
        /*    justify-content: center;*/
        /*    align-items: center;*/
        /*}*/

        .pos-qr-code-container {
            
            width: 186px;
            height: 226px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 10px #0000001A;
            border-radius: 2px;
        }

        .pos-scan-text {
            position: relative;
            top: 22px;
            left: 18px

        }

        .pos-code {
            position: relative;
            top: 67px;
            left: 40px;
            width: 105px;
            height: 105px;
        }

       

    `]
})
export class GameSettingsPreviewComponent implements OnInit {

    public game$: Observable<Game> = this.store.select(getGame);

    constructor(public store: Store<State>) {
    }

    ngOnInit(): void {
    }

    attachSplash(path: string) {
        this.store.dispatch(new GameUpdateAction({
            "splashScreen": path
        }));
    }

    deleteSplash(event) {
        this.store.dispatch(new GameUpdateAction({
            "splashScreen": false
        }));
    }

    getQrCode(gameId: number) {
        return environment.deep_link + 'game/' + gameId;
    }
}
