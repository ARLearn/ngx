import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map} from 'rxjs/operators';
import {getCurrentRunId} from "../store/game-runs.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {getAuthIsAdmin} from "../../auth/store/auth.selector";
import {getMultipleMessagesSelector, getSelectedScreen} from 'src/app/game-messages/store/game-messages.selector';
import {GetGameMessagesRequestAction} from 'src/app/game-messages/store/game-messages.actions';
import {GameRunCollaboratorsRequestAction} from "../store/game-runs.actions";
import {canViewRun, ownsRun} from "../store/game-runs-access.selector";

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
                       class="tab-link"
                       *ngIf="canViewRun$ |async"
                       routerLinkActive #runtab1="routerLinkActive"
                       [disabled]="getDisabled(game, runId)"
                       [active]="runtab1.isActive"
                       [ngClass]="{'active-black':runtab1.isActive}"
                       [routerLink]="'/portal/game/'+game.gameId+'/detail/runs/'+runId+'/players'">{{'RUNS.PLAYERS'|translate}} </a>

                    <a mat-tab-link
                       class="tab-link"
                       routerLinkActive #runtab2="routerLinkActive"
                       [routerLinkActiveOptions]="{exact: true}"
                       [disabled]="getDisabled(game, runId)"
                       [active]="runtab2.isActive || isActiveResults()"
                       [ngClass]="{'active-black':runtab2.isActive}"
                       [routerLink]="'/portal/game/'+game.gameId+'/detail/runs/'+runId+'/results/' + (messageId$ | async)">RESULTATEN</a>

                    <a mat-tab-link
                       class="tab-link"
                       routerLinkActive #runtab3="routerLinkActive"
                       *ngIf="ownsRun$ |async"
                       [disabled]="getDisabled(game, runId)"
                       [ngClass]="{'active-black':runtab3.isActive}"
                       [active]="runtab3.isActive"
                       [routerLink]="'/portal/game/'+game.gameId+'/detail/runs/'+runId+'/settings'">{{'HOME.SETTINGS'|translate}}</a>
                    <a mat-tab-link
                       class="tab-link"
                       *ngIf="isAdmin$ |async"
                       routerLinkActive #runtabactions="routerLinkActive"
                       [disabled]="getDisabled(game, runId)"
                       [ngClass]="{'active-black':runtabactions.isActive}"
                       [active]="runtabactions.isActive"
                       [routerLink]="'/portal/game/'+game.gameId+'/detail/runs/'+runId+'/actions'">ACTIONS</a>
                </nav>
            </div>

            <div *ngIf="searchMode" class="search-block">
                <mat-form-field class="search-input">
                    <mat-icon class="search-icon" matPrefix>search</mat-icon>
                    <input type="text" matInput (input)="onSearch.emit($event.target.value)" [placeholder]="'RESULTS.START_TYPING' | translate" />
                </mat-form-field>
            </div>
            <div class="content">
                <ng-content></ng-content>
            </div>
        </div>

    `,
    styles: [`
        .tab-line {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .tab-link {
            min-width: 110px;
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

        .search-block {
            margin-left: 20px;
        }
        .content {
            margin-left: auto;
            z-index: 100;
        }
    `]
})
export class RunTabSelectComponent implements OnInit, OnDestroy {
    isAdmin$ = this.store.select(getAuthIsAdmin);
    game$: Observable<Game> = this.store.select(getGame);
    runId$: Observable<any> = this.store.select(getCurrentRunId);
    canViewRun$: Observable<any> = this.store.select(canViewRun);
    ownsRun$: Observable<any> = this.store.select(ownsRun);

    @Input() searchMode = false;

    @Output() onSearch = new EventEmitter<string>();

    messageId$ = this.store.select(getMultipleMessagesSelector)
        .pipe(map(messages => messages[0] && messages[0].id));

    private subscription: Subscription;

    constructor(
        private store: Store<State>,
        private router: Router) {
    }

    ngOnInit() {
        this.store.dispatch(new GetGameMessagesRequestAction());
        this.store.dispatch(new GameRunCollaboratorsRequestAction());
    }

    getDisabled(gameId, runId) {
        return !gameId || !runId;
    }

    toRuns() {
        this.subscription = this.game$.subscribe((game) => {
            this.router.navigate(['portal/game/' + game.gameId + '/detail/runs']);
        });

    }

    isActiveResults() {
        return this.router.url.includes('/results/');
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
