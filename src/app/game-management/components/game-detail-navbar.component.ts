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
                <div class="context-tabs">
                    <nav mat-tab-nav-bar [backgroundColor]="'primary'">
                        <a mat-tab-link
                           [disabled]="!(game$|async)"
                           routerLinkActive="" #rla="routerLinkActive"
                           [active]="rla.isActive || isActive(['/portal/game/'+(game$|async)?.gameId+'/detail/screens'])"
                           [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/detail/screens'">{{'MESSAGE.SCREENS'|translate}}</a>
                        <a mat-tab-link
                           routerLinkActive #rlaf="routerLinkActive"
                           [disabled]="!(game$|async)"
                           [active]="rlaf.isActive || isActive(['/portal/game/'+(game$|async)?.gameId+'/detail/flowchart'], true)"
                           [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/detail/flowchart'"
                        > FLOWCHART </a>
                        <a mat-tab-link
                           *ngIf="isAdvanced |async"
                           routerLinkActive #rlafd="routerLinkActive"
                           [disabled]="!(game$|async)"
                           [active]="rlafd.isActive || isActive(['/portal/game/'+(game$|async)?.gameId+'/detail/flowchart/disappear'], true)"
                           [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/detail/flowchart/disappear'"
                        > DISAPPEAR CHART </a>
                        <a mat-tab-link
                           routerLinkActive #rla3="routerLinkActive"
                           [disabled]="!(game$|async)"
                           [active]="rla3.isActive || isActive(['/portal/game/'+(game$|async)?.gameId+'/detail/settings'])"
                           [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/detail/settings'"
                        > {{'HOME.SETTINGS'|translate}} </a>
                        <a mat-tab-link
                           routerLinkActive #rla4="routerLinkActive"
                           [disabled]="!(game$|async)"
                           [active]="rla4.isActive || isActive(['/portal/game/'+(game$|async)?.gameId+'/detail/runs']) || isActive(['/portal/game/'+(game$|async)?.gameId+'/run'])"
                           [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/detail/runs'"
                        > {{'RUNS.PLAY'|translate}} </a>
                        <a mat-tab-link
                           routerLinkActive #rla5="routerLinkActive"
                           [disabled]="!(game$|async)"
                           [active]="rla5.isActive || isActive(['/portal/game/'+(game$|async)?.gameId+'/detail/media'])"
                           [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/detail/media'"
                        > {{'MEDIA.MEDIA' |translate}} </a>
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
