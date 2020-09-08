import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';

import {State} from 'src/app/core/reducers';
import {Observable} from 'rxjs';

import {mergeMap, map, withLatestFrom, switchMap, tap} from 'rxjs/operators';
import {PortalGamesService} from 'src/app/core/services/portal-games.service';
import {GameService} from "../../core/services/game.service";
import {
    GetFeaturedGames, GetGameAction,
    SearchGamesRequestAction,
    SetFeaturedGames,
    SetGameAction,
    SetRecentGamesAction,
    UserLibraryActionTypes
} from "./user-library.actions";
import {Game} from "../../game-management/store/current-game.state";
import {
    GetPortalGameRequestAction
} from "../../portal-management/store/portal-games.actions";
import * as fromRoot from "../../core/selectors/router.selector";
import {PortalGame} from "../../portal-management/store/portal-games.state";
import * as fromRootSelector from "../../core/selectors/router.selector";

@Injectable()
export class UserLibraryEffects {

    @Effect()
    searchPortalGames: Observable<Action> = this.actions$
        .pipe(
            ofType(UserLibraryActionTypes.SEARCH_GAMES),
            switchMap((action: SearchGamesRequestAction) => this.portalGamesService.search(action.payload)),
            tap((games: PortalGame[]) => {
                if (games != null) {
                    games.forEach(game => this.store.dispatch(new GetGameAction(game.gameId)));
                }
            }),
            map((games) => new SetRecentGamesAction(games))
        );

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

    @Effect()
    getGame: Observable<Action> = this.actions$
        .pipe(
            ofType(UserLibraryActionTypes.GET_GAME),
            withLatestFrom(
                this.store.select(fromRootSelector.selectRouteParam('gameId'))
            ),
            mergeMap(([action, gameId]: [any, string]) => this.portalGamesService.getGame(action.payload || gameId)),
            map((game) => new SetGameAction(game))
        );

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalGamesService: PortalGamesService,
    ) {
    }
}
