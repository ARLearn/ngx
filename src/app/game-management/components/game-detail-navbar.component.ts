import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { Game } from '../store/current-game.state';
import { State } from "../../core/reducers";
import { getGame, getLoading } from "../store/current-game.selector";
import { ANIMATION_MODULE_TYPE } from "@angular/platform-browser/animations";
import { environment } from "../../../environments/environment";
import { getAuthIsAvanced } from "../../auth/store/auth.selector";

//todo delete
@Component({
    selector: 'app-game-detail-navbar',
    template: `
        <div class="header primary-background-color ">
            <div class="maxwidth">
                <app-top-nav></app-top-nav>
                <div class="account-dropdown">
                    <app-user-drop-down-display></app-user-drop-down-display>
                    <select-language *ngIf="showLanguage"></select-language>
                </div>
                <div class="game-title white-color font-medium-32-43-roboto">{{(game$|async)?.title}}</div>

                <div class="back-button">
                    <app-header-back-button [route]="'/portal/games/list'"></app-header-back-button>
                </div>
                <div class="context-tabs" *ngIf="game$|async as game">
                    <nav mat-tab-nav-bar [backgroundColor]="'primary'">
                        <a mat-tab-link

                           [disabled]="!game"
                           routerLinkActive #rl_screens="routerLinkActive"
                           [active]="rl_screens.isActive"
                           [ngClass]="{'active-color': rl_screens.isActive}"
                           [routerLink]="'/portal/game/'+game.gameId+'/detail/screens'">{{'MESSAGE.SCREENS'|translate}}
                        </a>
                        <a mat-tab-link
                           routerLinkActive #rl_flowchart="routerLinkActive"
                           [disabled]="!game"
                           [active]="rl_flowchart.isActive"
                           [ngClass]="{'active-color': rl_flowchart.isActive}"
                           [routerLink]="'/portal/game/'+game.gameId+'/detail/flowchart/appear'"
                        > FLOWCHART </a>
                        <a mat-tab-link
                           *ngIf="isAdvanced |async"
                           routerLinkActive #rl_disappear="routerLinkActive"
                           [disabled]="!game"
                           [active]="rl_disappear.isActive"
                           [ngClass]="{'active-color': rl_disappear.isActive}"
                           [routerLink]="'/portal/game/'+game.gameId+'/detail/flowchart/disappear'"
                        > DISAPPEAR CHART </a>
                        <a mat-tab-link
                           routerLinkActive #rl_settings="routerLinkActive"
                           [disabled]="!game"
                           [active]="rl_settings.isActive"
                           [ngClass]="{'active-color': rl_settings.isActive}"
                           [routerLink]="'/portal/game/'+game.gameId+'/detail/settings'"
                           routerLinkActive="tab-selected"> {{'HOME.SETTINGS'|translate}} </a>
                        <a mat-tab-link
                           routerLinkActive #rl_runs="routerLinkActive"
                           [disabled]="!game"
                           [active]="rl_runs.isActive"
                           [ngClass]="{'active-color': rl_runs.isActive}"
                           [routerLink]="'/portal/game/'+game.gameId+'/detail/runs'"
                           routerLinkActive="tab-selected"> {{'RUNS.PLAY'|translate}} </a>
                        <a mat-tab-link
                           routerLinkActive #rl_media="routerLinkActive"
                           [disabled]="!game"
                           [active]="rl_media.isActive"
                           [ngClass]="{'active-color': rl_media.isActive}"
                           [routerLink]="'/portal/game/'+game.gameId+'/detail/media'"
                           routerLinkActive="tab-selected"> {{'MEDIA.MEDIA' |translate}} </a>

                    </nav>
                </div>
                <ng-content></ng-content>
            </div>
        </div>
        <mat-progress-bar *ngIf="isLoading$|async" mode="indeterminate"></mat-progress-bar>
    `,
    styles: [`

        .header {
            top: 0px;
            right: 307px;
            width: 100%;
            height: 144px;
            opacity: 1;
        }

        select-language {
            position: absolute;
            top: 0px;
            right: 0px;


        }

        app-user-drop-down-display {
            position: absolute;
            top: 0px;
            right: 40px;
        }

        .account-dropdown {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 250px;
            height: 50px;

            color: #FFFFFF;
            opacity: 0.7;
        }

        .game-title {
            position: absolute;
            top: 55px;
            height: 38px;
            text-align: left;

            position: absolute;
            z-index: 2;
        }

        .back-button {
            position: absolute;
            top: 64px;
            left: -57px; /*38 width + 19 space*/
        }

        .context-tabs {
            position: absolute;
            top: 96px;
            text-transform: uppercase;
        }

        .root-tabs {
            position: absolute;
            text-transform: uppercase;
        }

        .root-tabs > .mat-tab-links > .mat-tab-label-active {
            color: #FFFFFF;
            text-transform: uppercase;
            opacity: 1;
        }
        
        a.mat-tab-link.active-color {
            color: #FFFFFF;
            opacity: 1;
        }

        .mat-tab-links > .mat-tab-link {

            padding: 0 20px 0px 0px;
            justify-content: normal;

        }

    `],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations'},
    ],
})
export class GameDetailNavbarComponent implements OnInit {
    showLanguage: boolean = environment.showTranslate;
    isAdvanced = this.store.select(getAuthIsAvanced);
    public game$: Observable<Game> = this.store.select(getGame);
    public isLoading$: Observable<boolean> = this.store.select(getLoading);

    @Input() game;

    constructor(
        private location: Location,
        private router: Router,
        public store: Store<State>
    ) {
    }

    ngOnInit() {
    }

    back() {
        this.location.back();
    }

    isActive(instruction: any[], exact = false): boolean {
        return this.router.isActive(this.router.createUrlTree(instruction), exact);
    }
}
