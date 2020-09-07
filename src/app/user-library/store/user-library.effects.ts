import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';

import {State} from 'src/app/core/reducers';
import {Observable} from 'rxjs';

import {mergeMap, map, withLatestFrom, switchMap, tap} from 'rxjs/operators';
import {PortalGamesService} from 'src/app/core/services/portal-games.service';
import {GameService} from "../../core/services/game.service";
import {GetFeaturedGames, SetFeaturedGames, SetRecentGamesAction, UserLibraryActionTypes} from "./user-library.actions";
import {Game} from "../../game-management/store/current-game.state";
import {
    GetPortalGameRequestAction,
    PortalGamesActionTypes,
    SetPortalGameAction,
    SetPortalGamesAction
} from "../../portal-management/store/portal-games.actions";
import * as fromRoot from "../../core/selectors/router.selector";
import {PortalGame} from "../../portal-management/store/portal-games.state";

@Injectable()
export class UserLibraryEffects {

    @Effect()
    featuredGames: Observable<Action> = this.actions$
        .pipe(
            ofType(UserLibraryActionTypes.GET_FEATURED_REQUEST),
            switchMap((action: GetFeaturedGames) => this.portalGamesService.getFeatured('nl')),
            map((games) => new SetFeaturedGames(games))
        );

    @Effect()
    getRecentGames: Observable<Action> = this.actions$
        .pipe(
            ofType(UserLibraryActionTypes.GET_RECENT_GAMES),
            mergeMap(() => this.portalGamesService.list()),
            map((games) => new SetRecentGamesAction(games))
        );

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalGamesService: PortalGamesService,
    ) {
    }
}
