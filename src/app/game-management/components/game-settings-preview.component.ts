import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Game} from "../store/current-game.state";
import {getGame, iAmOwner} from "../store/current-game.selector";
import {select, Store} from "@ngrx/store";
import {GameUpdateAction, SaveGameRequestAction} from "../store/current-game.actions";
import {State} from "../../core/reducers";

@Component({
    selector: 'app-game-settings-preview',
    template: `
        <div class="selector-full-width">
            <div class="selector-aligned">
<!--                <app-asset-selector-->
<!--                        *ngIf="!((game$|async)?.splashScreen)"-->
<!--                        icon="cloud"-->
<!--                        [title]="'GAME.CHOOSE_SPLASH'|translate"-->
<!--                        [subtitle]="'GAME.CHOOSE_SPLASH_SUB'|translate"-->
<!--                        (assetSelect)="attachSplash($event)"-->
<!--                ></app-asset-selector>-->
                <app-game-theme-selector></app-game-theme-selector>
                <div class="splashscreen">

                    <app-filestore-background-image
                            *ngIf="!!((game$|async)?.splashScreen)"
                            [paths]="[(game$|async)?.splashScreen]"
                    >
                        <div class="deleteSplashScreen" (click)="deleteSplash($event)">
                            <mat-icon class="deleteIcon" matPrefix>delete</mat-icon>

                        </div>
                    </app-filestore-background-image>

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
        }

        .selector-aligned {
          position: absolute;
          right: 70px;
          top:78px
        }
        
        .splashscreen {
          position: relative;
          width: 290px;
          height: 514px;
          border-radius: 4px;

        }

        .deleteSplashScreen {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 48px;
          height: 48px;
          background: #FAFAFA 0% 0% no-repeat padding-box;
          border: 1px solid #FFFFFF;
          border-radius: 2px;
          opacity: 1;
        }
        .deleteIcon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);

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
}
