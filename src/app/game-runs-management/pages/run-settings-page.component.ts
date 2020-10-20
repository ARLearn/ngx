import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Observable, of} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {
    GameRunCollaboratorsRequestAction,
    GetCurrentRunFromRouterRequestAction,
    GrantCollaboratorAccessAction, RevokeCollaboratorAccessAction
} from "../store/game-runs.actions";
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";
import {GameRun} from "../store/game-runs.state";
import {environment} from "../../../environments/environment";
import {getCollaborators, getEditRunSelector, getCollaboratorsWithAccount} from "../store/game-runs.selector";
import {tap} from "rxjs/operators";
import {PlayerLoadRequestAction} from "../../player-management/store/player.actions";

@Component({
    selector: 'app-run-settings-page',
    template: `
        <app-game-detail-navbar [game]="game$|async">
            <!--    <div class="button-placeholder">-->
            <!--        <button class="buttonCenter" color="accent" mat-fab (click)="addPlayer()">-->
            <!--            <mat-icon>add</mat-icon>-->
            <!--        </button>-->
            <!--    </div>-->

        </app-game-detail-navbar>

        <div class="full-width-container maxwidth">

            <app-run-tab-select></app-run-tab-select>

            <div class="pos-settings-container">

                <div>
                    <app-settings-fields></app-settings-fields>
                    <app-game-detail-collaborators
                            [gameAuthors]="players$ | async"
                            (onNewAuthor)="onNewAuthor($event)"
                            (onRoleChange)="onRoleChange($event)"
                            (onDelete)="onAuthorDelete($event)">
                    </app-game-detail-collaborators>
                </div>


                <div class="pos-right-pane" *ngIf="(run$|async)?.runConfig.selfRegistration">
                    <div class="pos-vert-line">

                    </div>
                    <div class="pos-qr-code-container">
                        <div class="pos-scan-text font-medium-16-21-roboto">
                            Scan QR Code
                        </div>
                        <div class="pos-code">
                            <qr-code [value]="getQrCode((run$|async)?.runId)" [size]="100"></qr-code>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `,
    styles: [`
        app-game-detail-collaborators {
            display: block;
            width: 100%;
            margin-left: 84px;
        }

        .pos-settings-container {
            position: relative;
            /*background-color: blue;*/
            display: flex;
            justify-content: space-between;

        }

        .pos-right-pane {
            flex-basis: 252px;
            height: 512px;
        }

        .pos-vert-line {
            width: 0px;
            height: 512px;
            border: 1px solid #E0E0E0;
            opacity: 1;
        }

        .pos-qr-code-container {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 186px;
            height: 226px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 10px #0000001A;
            border-radius: 2px;
        }

        .pos-scan-text {
            position: absolute;
            top: 22px;
            left: 18px

        }

        .pos-code {
            position: absolute;
            top: 67px;
            left: 40px;
            width: 105px;
            height: 105px;
        }

        .pos-img {
            position: relative;
            width: 100%;
            height: 100%;
        }
    `]
})
export class RunSettingsPageComponent implements OnInit {
    public game$: Observable<Game> = this.store.select(getGame);
    run$: Observable<GameRun> = this.store.select(getEditRunSelector);

    players$ = this.store.select(getCollaboratorsWithAccount).pipe(tap(console.log));

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.store.dispatch(new GetCurrentRunFromRouterRequestAction());

        this.store.dispatch(new PlayerLoadRequestAction());
    }

    getUrl(runId: number) {
        const url = environment.deep_link + 'run/' + runId;
        return 'https://qrfree.kaywa.com/?l=1&d=' + url;
    }

    getQrCode(runId: number) {
        return environment.deep_link + 'run/' + runId;
    }

    onRoleChange(event) {
        console.log('ROLE CHANGER', event);

        this.store.dispatch(new GrantCollaboratorAccessAction({
            rights: event.role,
            author: event.fullId
        }));
        //
    }

    onAuthorDelete(event) {
        console.log('DELETE', event);

        this.store.dispatch(new RevokeCollaboratorAccessAction({
            author: event.account
        }));
    }

    onNewAuthor(event) {
        console.log("on new author", event);
        this.store.dispatch(new GrantCollaboratorAccessAction({
            rights: event.role,
            author: event.fullId
        }));
    }

}
