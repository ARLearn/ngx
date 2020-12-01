import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../store/current-game.state";
import {getGame} from "../../store/current-game.selector";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {GetCurrentGameFromRouterRequestAction, GetPublicGameFromRouterRequestAction} from "../../store/current-game.actions";

@Component({
    selector: 'app-game-landing-page',
    template: `
        <div class="header primary-background-color ">
            <div class="maxwidth">

                <div class="game-title white-color font-medium-32-43-roboto">{{(game$|async)?.title}}</div>
            </div>
        </div>
        <div class="game maxwidth d-flex" *ngIf="game$ | async as game">
            <div class="game-icon">
                <app-game-icon
                        [game]="game"
                ></app-game-icon>
            </div>
            <div class="game-details d-flex">

                <div class="form-info">
                    <div class="form-group">
                        <label class="form-label">Titel</label>
                        <h4 class="form-heading">{{ game.title }}</h4>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Beschrijving</label>
                        <p class="form-description font-medium-16-24-roboto">{{ game.description }}</p>
                    </div>


                </div>

                <div class="remix-outer">

                    <div class="form-info">
                        <div class="form-group">
                            <label class="form-label">Download de bibendo app</label>
                            
                        </div>
                        


                    </div>
                    <div class="store-button store-button-padding">
                            <a href="https://apps.apple.com/nl/app/bibendo/id1457955666?itsct=apps_box&amp;itscg=30200"
                               style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/nl-NL?size=250x83&amp;releaseDate=1554768000&h=c0bcbe9c32b34eeae98b5176b384f2e9"
                                    alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>    
                        </div>
                    <div class="store-button ">
                            <a href='https://play.google.com/store/apps/details?id=nl.welten.arlearn3&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                <img
                                        class="store-button "
                                    alt='Ontdek het op Google Play'
                                    src='https://play.google.com/intl/en_us/badges/static/images/badges/nl_badge_web_generic.png'/></a>

                        </div>
                        


                </div>
            </div>

        </div>

    `,
    styles: [`
        mat-icon.remix-icon > svg {
            vertical-align: top;
        }

        .remix-outer {
            display: flex;
            flex-direction: column;
            align-content: flex-end;
            width: 418px;
        }

        .store-button {
            width: 280px;
        }

        .store-button-padding {
            width: 280px;
            padding: 15px;
        }

        .game {
            padding: 3rem 0;
        }

        .game-details,
        .form-drag-drop {
            flex: 1;
            justify-content: space-between;
        }

        .game-icon {
            width: 68px;
            margin-right: 1rem;
        }


        .game-icon img {
            width: 68px;
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-label {
            color: #0000008A;
            font-size: 14px;
            margin: 0 0 0.5rem;
        }

        .form-heading {
            margin: 0;
            font-weight: 400;
        }

        .form-description {
            font-size: 16px;
            color: #000000;
            width: 405px;
        }

        .form-info {
            max-width: 410px;
        }

        .form-group mat-form-field {
            width: 100%;
        }

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

        .progress.mat-progress-bar {
            position: absolute;
        }

    `],
    encapsulation: ViewEncapsulation.None,
})
export class GameLandingPageComponent implements OnInit {
    public game$: Observable<Game> = this.store.select(getGame);

    constructor(
        public store: Store<State>
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetPublicGameFromRouterRequestAction());
    }

}
