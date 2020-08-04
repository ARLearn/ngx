import {Router} from '@angular/router';
import {Action, select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as actions from './current-game.actions';
import {
    AddGameAuthorRequestAction,
    DownloadGameRequestAction,
    GetCurrentGameFromRouterRequestAction,
    LoadGameAuthorRequestAction, RemoveGameAuthorRequestAction, SetSelectedThemeAction
} from './current-game.actions';

import {State} from 'src/app/core/reducers';

import {GameService} from 'src/app/core/services/game.service';
import {getGame} from './current-game.selector';
import {Game} from './current-game.state';
import FileSaver from 'file-saver';
import {getMessagesSelector} from '../../game-messages/store/game-messages.selector';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as fromRootSelector from "../../core/selectors/router.selector";


@Injectable()
export class CurrentGameEffects {
    constructor(
        private gameService: GameService,
        private actions$: Actions,
        private router: Router,
        private store$: Store<State>
    ) {
    }

    @Effect()
    getGameFromRouter: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.GET_CURRENT_GAME_FROM_ROUTER_REQUESTED),
        withLatestFrom(
            this.store$.select(fromRootSelector.selectRouteParam('gameId'))
        ),
        switchMap(([action, gameId]: [GetCurrentGameFromRouterRequestAction, string]) =>
            this.gameService.get(Number.parseInt(gameId, 10)).pipe(
                map(res => (new actions.SetCurrentGameCompletedAction(res))),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        )
    );

    @Effect()
    getGame: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.SET_CURRENT_GAME_REQUESTED),
        map((action: actions.SetCurrentGameRequestAction) => action),
        switchMap((action) =>
            this.gameService.get(action.payload.gameId).pipe(
                map(res => (new actions.SetCurrentGameCompletedAction(res))),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        )
    );


    @Effect()
    save: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.SAVE_GAME_REQUESTED),
        mergeMap(
            (action: any) => this.gameService.createGame(action.payload).pipe(
                map(res => {
                    return new actions.SaveGameCompletedAction(res);
                }),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        ),
        tap((res: any) => {
            this.router.navigate(['/portal/game/' + res.payload.gameId + '/detail/screens']);
        })
    );

    @Effect({dispatch: false})
    saveGame: Observable<any> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.DOWNLOAD_GAME_REQUESTED),
        map((action: actions.DownloadGameRequestAction) => action),
        withLatestFrom(
            this.store$.select(getGame),
            this.store$.select(getMessagesSelector),
        ),
        tap(([action, game, messages]: [DownloadGameRequestAction, Game, any]) => {
            console.log('just writing something on the console', game, messages);
            const packageGame = {
                game: game,
                messages: messages
            };

            var blob = new Blob([JSON.stringify(packageGame)], {type: 'application/json;charset=utf-8'});

            FileSaver.saveAs(blob, 'game.txt');

        })
    );

    @Effect()
    loadAuthors: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.SET_CURRENT_GAME_COMPLETED, actions.CurrentGameActionTypes.LOAD_GAME_AUTHORS_REQUESTED, actions.CurrentGameActionTypes.ADD_GAME_AUTHORS_COMPLETED),
        withLatestFrom(
            this.store$.pipe(select(getGame))
        ),
        mergeMap(
            ([action, game]: [LoadGameAuthorRequestAction, Game]) => this.gameService.loadAuthors(game.gameId).pipe(
                map(res => {
                    return new actions.LoadGameAuthorCompletedAction(res);
                }),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        )
    );

    @Effect()
    addAuthors: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.ADD_GAME_AUTHORS_REQUESTED),
        withLatestFrom(
            this.store$.pipe(select(getGame))
        ),
        mergeMap(
            ([action, game]: [AddGameAuthorRequestAction, Game]) => this.gameService.addAuthors(game.gameId, action.payload.fullId, action.payload.role).pipe(
                map(res => {
                    return new actions.AddGameAuthorCompletedAction(res);
                }),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        )
    );

    @Effect()
    revokeAuthors: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.REMOVE_GAME_AUTHORS_REQUESTED),
        withLatestFrom(
            this.store$.pipe(select(getGame))
        ),
        mergeMap(
            (
                [action, game]: [RemoveGameAuthorRequestAction, Game]
            ) => this.gameService.revokeAuthors(game.gameId, action.payload.fullId).pipe(
                map(res => {
                    return new actions.LoadGameAuthorRequestAction();
                }),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        )
    );

    @Effect()
    saveTheme: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.SET_THEME),
        withLatestFrom(
            this.store$.pipe(select(getGame))
        ),
        mergeMap(
            (
                [action, game]: [SetSelectedThemeAction, Game]
            ) => this.gameService.saveTheme(game.gameId, action.payload.themeId).pipe(
                map(res => {
                    return new actions.LoadGameAuthorRequestAction();
                }),
                catchError((error) => of(new actions.CurrentGameErrorAction({error: error})))
            )
        )
    );
}
