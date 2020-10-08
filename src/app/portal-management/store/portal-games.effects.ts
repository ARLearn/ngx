import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';

import {State} from 'src/app/core/reducers';
import {forkJoin, merge, Observable, of} from 'rxjs';
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
    SetFeaturedResponse, DeleteFeaturedGameImageRequest, DeleteFeaturedGameImageResponse
} from './portal-games.actions';
import {mergeMap, map, withLatestFrom, switchMap, tap} from 'rxjs/operators';
import {PortalGamesService} from 'src/app/core/services/portal-games.service';
import * as fromRoot from "../../core/selectors/router.selector";
import {GameService} from "../../core/services/game.service";
import {PortalGame} from "./portal-games.state";
import {getPortalEditGame} from "./portal-games.selector";
import {TranslateService} from "@ngx-translate/core";

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
            switchMap(([action, gameId]: [GetPortalGameRequestAction, string]) => {
                return forkJoin([
                    this.gameService.get(action.payload || Number.parseInt(gameId, 10)),
                    this.portalGamesService.isFeatured(this.translateService.currentLang, gameId as any)
                ])
            }),
            map(([game, featured]) => {
                (game as any).featured = featured;
                return game;
            }),
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
            mergeMap((action: SetFeaturedRequest) => this.portalGamesService.setFeatured(this.translateService.currentLang, action.payload.gameId, 1, action.payload.value)),
            withLatestFrom(this.store.select(fromRoot.selectRouteParam('gameId'))),
            map((res) => new SetFeaturedResponse(res))
        );

    @Effect()
    getPortalGames: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.GET_PORTAL_GAMES),
            mergeMap(() => this.portalGamesService.list()),
            map((games) => new SetPortalGamesAction(games))
        );

    @Effect()
    deleteFeaturedGameImage: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.DELETE_FEATURED_GAME_IMAGE_REQUEST),
            mergeMap((action: DeleteFeaturedGameImageRequest) => this.portalGamesService.deleteImage(action.payload.gameId)),
            map(() => new DeleteFeaturedGameImageResponse())
        );

    @Effect({ dispatch: false })
    savePortalGame: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalGamesActionTypes.SAVE_PORTAL_GAME),
            withLatestFrom(
              this.store.select(getPortalEditGame),
            ),
            mergeMap(([action, game]) => {
                return this.gameService.createGame(game);
            }),
        );


    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalGamesService: PortalGamesService,
        private gameService: GameService,
        private translateService: TranslateService,
    ) {
    }
}
