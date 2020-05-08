import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {getGame} from "../../game-management/store/current-game.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {MatDialog} from "@angular/material/dialog";
import {GetGameRunsRequestAction} from "../store/game-runs.actions";
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";

@Component({
  selector: 'app-run-results-page',
  template: `
    <app-game-detail-navbar [game]="game$|async">
      <!--    <div class="button-placeholder">-->
      <!--        <button class="buttonCenter" color="accent" mat-fab (click)="addPlayer()">-->
      <!--            <mat-icon>add</mat-icon>-->
      <!--        </button>-->
      <!--    </div>-->

    </app-game-detail-navbar>

    <div class="full-width-container">
      <div class="maxwidth">
        <app-run-tab-select ></app-run-tab-select>
        <div class="run-container">
          todo results
        </div>
      </div>
    </div>

  `,
  styles: [`
  `]
})
export class RunResultsPageComponent implements OnInit {

  public game$: Observable<Game> = this.store.select(getGame);

  constructor(
      private store: Store<State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetGameRunsRequestAction());
    this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
  }

}
