import {Router} from '@angular/router';
import {Action, Store} from '@ngrx/store';
import {EMPTY, Observable, of, timer} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as actions from './game.actions';
import {
    CloneGameRequestAction,
    DeleteGameRequestAction,
    GetGameParticipateAction,
    ImportGameMessagesRequestAction,
    ImportGameRequestAction
} from './game.actions';
import * as actions_current from '../../game-management/store/current-game.actions';

import {State} from 'src/app/core/reducers';

import {GameService} from 'src/app/core/services/game.service';
import {catchError, debounce, debounceTime, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {SetErrorAction} from '../../shared/store/shared.actions';
import {getGame} from '../../game-management/store/current-game.selector';
import {Game} from '../../game-management/store/current-game.state';
import {GameMessagesService} from '../../core/services/game-messages.service';
import {AuthActionTypes} from '../../auth/store/auth.actions';
import {getGameList} from "./game.selector";


@Injectable()
export class GameEffects {
    constructor(
        private gameService: GameService,
        private messagesService: GameMessagesService,
        private actions$: Actions,
        private router: Router,
        private store$: Store<State>
    ) {
    }


    @Effect()
    getGames$: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.GET_GAME_LIST_REQUESTED,
            actions_current.CurrentGameActionTypes.SAVE_GAME_COMPLETED,
            actions.GameActionTypes.DELETE_GAME_COMPLETED,
            actions.GameActionTypes.IMPORT_GAME_COMPLETED,
            actions.GameActionTypes.CREATE_GAME_COMPLETED,
            AuthActionTypes.LOGIN_COMPLETED
        ),
        debounce(action => action.type === actions.GameActionTypes.CREATE_GAME_COMPLETED ? timer(1000) : EMPTY),
        map((action: actions.GetGameListRequestAction) => action),
        switchMap((payload: any) =>
            this.gameService.list(null).pipe(
                mergeMap(res => [
                        new actions.GetGameListCompletedAction(res.games),
                        new actions.GetGameCursorListRequestAction({cursor: res.resumptionToken})
                    ]
                ),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );


    @Effect()
    getGamesCursor: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.GET_GAME_CURSOR_LIST_REQUESTED),
        map((action: actions.GetGameCursorListRequestAction) => action),
        switchMap((payload: any) =>
            this.gameService.list(payload.payload.cursor).pipe(
                mergeMap(res => {
                        if (res.resumptionToken != null) {
                            return [
                                new actions.GetGameListCompletedAction(res.games),
                                new actions.GetGameCursorListRequestAction({cursor: res.resumptionToken})
                            ];
                        }
                        return [
                            new actions.GetGameListCompletedAction(res.games),
                            new actions.GetGamesParticipateAction()
                            // new actions.GetGameCursorListRequestAction({cursor: res.resumptionToken})
                        ];
                    }
                ),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );

    @Effect()
    getGamesParticipateCursor: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.GET_GAMES_PARTICIPATE),
        map((action: actions.GetGamesParticipateAction) => action),
        switchMap((payload: any) =>
            this.gameService.listParticipate(payload.payload?.cursor).pipe(
                mergeMap(res => {
                        if (!res.gameIds) {
                            return [];
                        }
                        const participateActions: any[] = res.gameIds.map(gameId => new actions.GetGameParticipateAction(gameId));
                        if (res.resumptionToken != null) {
                            participateActions.push(new actions.GetGamesParticipateAction({cursor: res.resumptionToken}));
                            return participateActions;
                        }
                        return participateActions;
                    }
                ),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );

    @Effect()
    getParticipateGame: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.GET_GAME_PARTICIPATE),
        withLatestFrom(
            this.store$.select(getGameList)
        ),
        // tap(([action, gameList]: [GetGameParticipateAction, Game[]]) => console.log(action.payload, gameList.filter(game => (game.gameId + '') === (action.payload + '')))),
        filter(([action, gameList]: [GetGameParticipateAction, Game[]]) => gameList.filter(game => (game.gameId + '') === (action.payload + '')).length === 0),
        // tap()
        mergeMap(
            ([action, gameList]: [GetGameParticipateAction, Game[]]) => this.gameService.get(Number.parseInt(action.payload, 10)).pipe(
                map(res => {
                    return new actions.GetGameListCompletedAction([Object.assign(res, {playOnly: true})]);
                    // return new actions.CreateGameCompletedAction(res);
                }),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );

    @Effect()
    createGame: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.CREATE_GAME_REQUESTED),
        mergeMap(
            (action: any) => this.gameService.createGame(action.payload).pipe(
                map(res => {
                    return new actions.CreateGameCompletedAction(res);
                }),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );

    @Effect()
    importGame: Observable<Action> = this.actions$
        .pipe(
            ofType(actions.GameActionTypes.IMPORT_GAME_REQUESTED),
            map((action: ImportGameRequestAction) => action.payload),
            switchMap(payload => this.gameService.createGame(
                Object.assign(payload.game, {gameId: undefined})
                ).pipe(map(value => {
                    return {game: value, messages: payload.messages};
                }))
            ),
            switchMap(res => [
                new actions.ImportGameCompletedAction(res),
                new actions.ImportGameMessagesRequestAction({
                        messages: res.messages.map(
                            message => Object.assign(message, {gameId: res.game.gameId})
                        )
                    }
                )
            ]),
            catchError((error) => of(new SetErrorAction(error.error)))
        );

    @Effect()
    importGameMessages: Observable<Action> = this.actions$
        .pipe(
            ofType(actions.GameActionTypes.IMPORT_GAME_MESSAGES_REQUESTED),
            filter((action: ImportGameMessagesRequestAction) => action.payload.messages && action.payload.messages.length !== 0),
            map((action: ImportGameMessagesRequestAction) => action.payload),
            switchMap(payload => this.messagesService
                .postMessage(payload.messages[0])
                .pipe(map(result => Object.assign(result, {
                    messages: payload.messages.slice(1, payload.messages.length)
                })))
            ),
            map(res =>
                new actions.ImportGameMessagesRequestAction({messages: res.messages})
            ),
        )
    ;

    @Effect()
    cloneGame: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.CLONE_GAME_REQUESTED),
        mergeMap(
            (action: CloneGameRequestAction) => this.gameService.cloneGame(
                action.payload.gameId
            ).pipe(
                map(res => {
                    return new actions.CreateGameCompletedAction(res);
                }),
                catchError((error) => of(new SetErrorAction(error.error))),
            )
        )
    );

    @Effect()
    deleteGame: Observable<Action> = this.actions$.pipe(
        ofType(actions.GameActionTypes.DELETE_GAME_REQUESTED),
        withLatestFrom(
            this.store$.select(getGame)
        ),
        mergeMap(
            ([action, game]: [DeleteGameRequestAction, Game]) => this.gameService.deleteGame(
                action.payload.gameId || game.gameId
            ).pipe(
                map(res => {
                    return new actions.DeleteGameCompletedAction(res);
                }),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );

}
