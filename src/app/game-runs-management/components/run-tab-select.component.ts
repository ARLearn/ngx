import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {currentRunPlayers, getCurrentRunId} from "../store/game-runs.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {getAuthIsAdmin} from "../../auth/store/auth.selector";

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


            <div class="run-tabs">
                <nav mat-tab-nav-bar class="nav-override style-upper">
                    <a mat-tab-link
                       routerLinkActive #runtab1="routerLinkActive"
                       [disabled]="getDisabled((game$|async), (runId$ |async))"
                       [active]="runtab1.isActive"
                       [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/run/'+(runId$ |async)+'/players'">{{'RUNS.PLAYERS'|translate}}</a>
                    <a mat-tab-link
                       *ngIf="isAdmin$ |async"
                       routerLinkActive #runtab2="routerLinkActive"
                       [disabled]="getDisabled((game$|async), (runId$ |async))"
                       [active]="runtab2.isActive"
                       [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/run/'+(runId$ |async)+'/results'">RESULTATEN</a>
                    <a mat-tab-link
                       routerLinkActive #runtab2="routerLinkActive"
                       [disabled]="getDisabled((game$|async), (runId$ |async))"
                       [active]="runtab2.isActive"
                       [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/run/'+(runId$ |async)+'/settings'">{{'HOME.SETTINGS'|translate}}</a>
                    <a mat-tab-link
                       *ngIf="isAdmin$ |async"
                       routerLinkActive #runtabactions="routerLinkActive"
                       [disabled]="getDisabled((game$|async), (runId$ |async))"
                       [active]="runtabactions.isActive"
                       [routerLink]="'/portal/game/'+(game$|async)?.gameId+'/run/'+(runId$ |async)+'/actions'">ACTIONS</a>
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

    isAdmin$ = this.store.select(getAuthIsAdmin);
    // @Input() gameId;
    public game$: Observable<Game> = this.store.select(getGame);
    runId$: Observable<any> = this.store.select(getCurrentRunId);
    subscription: Subscription;

    constructor(
        private store: Store<State>,
        private router: Router) {
    }

    ngOnInit() {
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
