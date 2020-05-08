import {Router} from '@angular/router';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as actions from './featured-games.actions';

import {State} from 'src/app/core/reducers';
import {GameService} from 'src/app/core/services/game.service';
import {catchError, map, switchMap} from 'rxjs/operators';


@Injectable()
export class FeaturedGamesEffects {
  constructor(
    private gameService: GameService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<State>
  ) {
  }


  @Effect()
  getFeatured: Observable<Action> = this.actions$.pipe(
    ofType(actions.GameActionTypes.GET_FEATURED_GAME_LIST_REQUESTED),
    switchMap((payload: any) =>
      this.gameService.getFeatured().pipe(
        map(res => (new actions.GetFeaturedGameListCompletedAction(res))),
        catchError((error) => of(new actions.GetFeaturedGameListErrorAction({error: error})))
      )
    )
  );

}
