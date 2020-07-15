import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { State } from 'src/app/core/reducers';
import { Observable } from 'rxjs';
import { PortalGamesActionTypes, SetPortalGamesAction, SetPortalGameAction } from './portal-games.actions';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { PortalGamesService } from 'src/app/core/services/portal-games.service';
import * as fromRoot from "../../core/selectors/router.selector";

@Injectable()
export class PortalGamesEffects {

  @Effect()
  getPortalGames: Observable<Action> = this.actions$
    .pipe(
      ofType(PortalGamesActionTypes.GET_PORTAL_GAMES),
      mergeMap(() => this.portalGamesService.list()),
      map((games) => new SetPortalGamesAction(games))
    );

  @Effect()
  getPortalGame: Observable<Action> = this.actions$
    .pipe(
      ofType(PortalGamesActionTypes.GET_PORTAL_GAME),
      withLatestFrom(this.store.select(fromRoot.selectRouteParam('gameId'))),
      mergeMap(([, gameId]) => this.portalGamesService.get(gameId)),
      map((game) => new SetPortalGameAction(game))
    );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private portalGamesService: PortalGamesService,
  ) {
  }
}
