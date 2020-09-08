import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map} from 'rxjs/operators';
import {getCurrentRunId} from "../store/game-runs.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {getAuthIsAdmin} from "../../auth/store/auth.selector";
import {getMultipleMessagesSelector} from 'src/app/game-messages/store/game-messages.selector';
import {GetGameMessagesRequestAction} from 'src/app/game-messages/store/game-messages.actions';

@Component({
    selector: 'app-run-tab-select',
    template: `
        <div class="tab-line">
            <button
                    *ngIf="!getDisabled((game$|async), (runId$ |async))"
                    mat-icon-button
                    aria-label="back" (click)="toRuns()">
                <mat-icon>keyboard_arrow_left</mat-icon>
            </button>


            <div class="run-tabs" *ngIf="game$ |async as game">
                <nav mat-tab-nav-bar class="nav-override style-upper" *ngIf="runId$ |async as runId">
                    <a mat-tab-link
                       routerLinkActive #runtab1="routerLinkActive"
                       [disabled]="getDisabled(game, runId)"
                       [active]="runtab1.isActive"
                       [ngClass]="{'active-black':runtab1.isActive}"
                       [routerLink]="'/portal/game/'+game.gameId+'/run/'+runId+'/players'">{{'RUNS.PLAYERS'|translate}}</a>

                    <a mat-tab-link
                       routerLinkActive #runtab2="routerLinkActive"
                       [routerLinkActiveOptions]="{exact: true}"
                       [disabled]="getDisabled(game, runId)"
                       [active]="runtab2.isActive"
                       [ngClass]="{'active-black':runtab2.isActive}"
                       [routerLink]="'/portal/game/'+game.gameId+'/run/'+runId+'/results/' + selectedScreen">RESULTATEN</a>
                    
                    <a mat-tab-link
                       routerLinkActive #runtab3="routerLinkActive"
                       [disabled]="getDisabled(game, runId)"
                       [ngClass]="{'active-black':runtab3.isActive}"
                       [active]="runtab3.isActive"
                       [routerLink]="'/portal/game/'+game.gameId+'/run/'+runId+'/settings'">{{'HOME.SETTINGS'|translate}}</a>
                    <a mat-tab-link
                       *ngIf="isAdmin$ |async"
                       routerLinkActive #runtabactions="routerLinkActive"
                       [disabled]="getDisabled(game, runId)"
                       [ngClass]="{'active-black':runtabactions.isActive}"
                       [active]="runtabactions.isActive"
                       [routerLink]="'/portal/game/'+game.gameId+'/run/'+runId+'/actions'">ACTIONS</a>
                </nav>
            </div>
        </div>
    `,
    styles: [`
        .tab-line {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .active-black {
            color: black;
            opacity: 1;
        }

        .mat-tab-links > .mat-tab-label-active {

            text-transform: uppercase;
            opacity: 1;
        }

        .style-upper {
            text-transform: uppercase;
        }

    `]
})
export class RunTabSelectComponent implements OnInit, OnDestroy {
    @Input() selectedScreen: any;
    isAdmin$ = this.store.select(getAuthIsAdmin);
    // @Input() gameId;
    public game$: Observable<Game> = this.store.select(getGame);
    runId$: Observable<any> = this.store.select(getCurrentRunId);
    public messageId$ = this.store.select(getMultipleMessagesSelector)
        .pipe(map(messages => messages[0] && messages[0].id));

    subscription: Subscription;

    constructor(
        private store: Store<State>,
        private router: Router) {
    }

    ngOnInit() {
        this.store.dispatch(new GetGameMessagesRequestAction());
    }

    getDisabled(gameId, runId) {
        return !gameId || !runId;
    }

    toRuns() {
        this.subscription = this.game$.subscribe((game) => {
            this.router.navigate(['portal/game/' + game.gameId + '/detail/runs']);
        });

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
