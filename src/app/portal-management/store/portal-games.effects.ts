import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';

import {State} from 'src/app/core/reducers';
import {Observable} from 'rxjs';
import {
    PortalGamesActionTypes,
    SetPortalGamesAction,
    SetPortalGameAction,
    SearchPortalGamesRequestAction,
    GetPortalGameRequestAction,
    SetCategoriesAction,
    SetPortalGameCategoryRequest,
    SetPortalGameCategoryResponse,
    SetFeaturedRequest,
    SetFeaturedResponse
} from './portal-games.actions';
import {mergeMap, map, withLatestFrom, switchMap, tap} from 'rxjs/operators';
import {PortalGamesService} from 'src/app/core/services/portal-games.service';
import * as fromRoot from "../../core/selectors/router.selector";
import {GameService} from "../../core/services/game.service";
import {PortalGame} from "./portal-games.state";

@Injectable()
export class PortalGamesEffects {


    @Effect()
    searchPortalGames: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.SEARCH_PORTAL_GAMES),
            switchMap((action: SearchPortalGamesRequestAction) => this.portalGamesService.search(action.payload)),
            tap((games: PortalGame[]) => {
                if (games != null) {
                    games.forEach(game => this.store.dispatch(new GetPortalGameRequestAction(game.gameId)));
                }
            }),
            map((games) => new SetPortalGamesAction(games))
        );

    @Effect()
    getPortalGame: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.GET_PORTAL_GAME),
            withLatestFrom(this.store.select(fromRoot.selectRouteParam('gameId'))),
            mergeMap(([action, gameId]: [GetPortalGameRequestAction, string]) => this.gameService.get(action.payload || Number.parseInt(gameId, 10))),
            map((game) => new SetPortalGameAction(game as PortalGame))
        );

    @Effect()
    getCategories: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.GET_CATEGORIES),
            mergeMap((action) => this.portalGamesService.categories('nl')),
            map((categories) => new SetCategoriesAction(categories))
        );

    @Effect()
    setPortalGameCategory: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.SET_PORTAL_GAME_CATEGORY_REQUEST),
            mergeMap((action: SetPortalGameCategoryRequest) => this.portalGamesService.setPortalGameCategory(action.payload.gameId, action.payload.categoryId)),
            map((categories) => new SetPortalGameCategoryResponse(categories))
        );

    @Effect()
    setFeatured: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.SET_FEATURED_REQUEST),
            mergeMap((action: SetFeaturedRequest) => this.portalGamesService.setFeatured('nl', action.payload.gameId, 1, action.payload.value)),
            map((res) => new SetFeaturedResponse(res))
        );

    @Effect()
    getPortalGames: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.GET_PORTAL_GAMES),
            mergeMap(() => this.portalGamesService.list()),
            map((games) => new SetPortalGamesAction(games))
        );


    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalGamesService: PortalGamesService,
        private gameService: GameService
    ) {
    }
}
