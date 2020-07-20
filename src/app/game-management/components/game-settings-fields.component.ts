import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Game} from "../store/current-game.state";
import {getGame, iAmOwner} from "../store/current-game.selector";
import {select, Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {SaveGameRequestAction} from "../store/current-game.actions";

@Component({
    selector: 'app-game-settings-fields',
    template: `
        <div class="screen-editor-center">
            <div class="fields-container">
                <div class="title font-regular-24-24-roboto primary-color">Algemeen</div>
                <mat-form-field class="game-form-title">
                    <mat-label>{{'GAME.NAME_FIELD'|translate}}</mat-label>
                    <input matInput [placeholder]="'GAME.TITLE'|translate"
                           [disabled]="!(iAmOwner|async)"
                           [ngModel]="localgame?.title"
                           (ngModelChange)="gameTitleChange($event)">

                </mat-form-field>
                <app-game-detail-prim-sec-color
                        [primColor]="(game$|async)?.config?.primaryColor"
                        [secColor]="(game$|async)?.config?.secondaryColor"
                ></app-game-detail-prim-sec-color>

                <app-game-detail-collaborators></app-game-detail-collaborators>
                <app-game-detail-access [accessValue]="(game$|async)?.sharing"></app-game-detail-access>
                <app-game-detail-creative-commons
                        *ngIf="(game$|async)?.sharing == 3"></app-game-detail-creative-commons>
                <app-game-detail-location></app-game-detail-location>

                <button *ngIf="iAmOwner|async"
                        class="gl-pos-button-right pos-button gl-style-stroke-button gl-style-large-button"
                        mat-stroked-button color="primary" (click)="submit()">{{'ACTIONS.SAVE' |translate}}</button>
            </div>
        </div>
    `,
    styles: [`

        .title {
            margin-top: 74px;
            width: 100%;
            text-align: left;

            letter-spacing: 0;
            opacity: 1;
        }

        .game-form-title {
            margin-top: 22px;
            width: 100%;
        }

        .screen-editor-center {
            min-width: 538px;
            max-width: 937px;
            display: flex;
            justify-content: center;
        }

        .fields-container {

            top: 74px;
            width: 488px;
        }

        .pos-button {
            margin-top: 40px;
            width: 131px;
        }

    `]
})
export class GameSettingsFieldsComponent implements OnInit, OnDestroy {

    public game$: Observable<Game> = this.store.select(getGame);
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));

    public localgame: Game;
    private gameSubscription: Subscription;

    constructor(public store: Store<State>) {
    }

    ngOnInit(): void {
        this.game$.subscribe((game) => {
            this.localgame = game;
        });
    }

    gameTitleChange(event: any) {
        this.localgame.title = event;
    }

    submit() {

        this.store.dispatch(new SaveGameRequestAction(this.localgame));

    }

    ngOnDestroy(): void {
        if (this.gameSubscription) {
            this.gameSubscription.unsubscribe();
        }
    }
}
