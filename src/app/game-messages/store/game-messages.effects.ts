import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as selector from 'src/app/core/selectors/router.selector';
import {
    GameMessagesActionTypes,
    GetGameMessagesCompletedAction,
    GetGameMessagesRequestAction, GetMessageDeleteRequestAction,
    GetMessageDeleteResponseAction, NewMessageRequestedAction,
    NewMessageResponseAction,
    SelectMessageAction,
    SelectMessageFromRouterAction, SetLoadingAction
} from './game-messages.actions';
import {State} from 'src/app/core/reducers';
import {GameMessagesService} from '../../core/services/game-messages.service';
import {catchError, delay, filter, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SetErrorAction} from '../../shared/store/shared.actions';
import * as fromRootSelector from "../../core/selectors/router.selector";
import {getCurrentGame} from "./game-messages.selector";


@Injectable()
export class GameMessagesEffects {
    constructor(
        private actions$: Actions,
        private gameMessages: GameMessagesService,
        private store$: Store<State>
    ) {
    }

    @Effect()
    init$: Observable<Action> = this.actions$.pipe(
        ofType(GameMessagesActionTypes.GAME_MESSAGES_REQUESTED, GameMessagesActionTypes.GAME_MESSAGES_COMPLETED),
        delay(200),
        withLatestFrom(
            this.store$.select(selector.selectRouteParam('gameId')),
            this.store$.select(getCurrentGame)
        ),
        filter(([action, gameId, stateGameId]: [GetGameMessagesRequestAction, string, number]) => {
            return action.payload == null || action.payload.cursor !== 'stop';
        }),
        filter(([action, gameId, stateGameId]: [GetGameMessagesRequestAction, string, number]) => {
            return  action instanceof  GetGameMessagesCompletedAction ||  Number.parseInt(gameId, 10) !== stateGameId;
        }),
        mergeMap(
            ([action, gameId, stateGameId]: [GetGameMessagesRequestAction, string, number]) =>
            {
                this.store$.dispatch(new SetLoadingAction(true));
                return this.gameMessages.listMessagesWithCursor(gameId || action.payload.gameId, action?.payload?.cursor || '*').pipe(
                    map(res => {
                            //console.log("res is", res);
                            const completed = new GetGameMessagesCompletedAction(
                                {
                                    gameId: Number.parseInt(gameId, 10),
                                    items: res.generalItems,
                                    cursor: res.resumptionToken == null ? 'stop' : res.resumptionToken
                                }
                            );
                            // if (res.resumptionToken != null) {
                            //     const requestMore = new GetGameMessagesRequestAction({
                            //         gameId: gameId,
                            //         cursor: res.resumptionToken
                            //     });
                            //     //this.store$.dispatch();
                            //     return [completed, requestMore];
                            // }
                            return completed;
                        }
                    )
                )
            }
        )
    );


    @Effect()
    selectMessageFromRouter: Observable<Action> = this.actions$.pipe(
        ofType(GameMessagesActionTypes.MESSAGE_SELECT_FROM_ROUTER),

        withLatestFrom(
            this.store$.select(selector.currentMessageId)
        ),
        map(
            ([action, messageId]: [SelectMessageFromRouterAction, number]) => {
                return new SelectMessageAction({id: messageId});
            }
        )
    );


    @Effect()
    delete: Observable<Action> = this.actions$.pipe(
        ofType(GameMessagesActionTypes.MESSAGES_DELETE_REQUESTED),
        withLatestFrom(
            this.store$.select(selector.selectRouteParam('gameId'))
        ),
        mergeMap(
            ([action, gameId]: [GetMessageDeleteRequestAction, string]) => this.gameMessages.deleteMessage(gameId, action.payload).pipe(
                map(res =>
                    new GetMessageDeleteResponseAction(
                        res
                    )
                )
            )
        )
    );

    // @Effect()
    // save: Observable<Action> = this.actions$.pipe(
    //   ofType(GameMessagesActionTypes.MESSAGE_SAVE_REQUESTED),
    //   withLatestFrom(
    //     this.store$.select(selector.currentGameId)
    //   ),
    //   switchMap(
    //     ([action, gameId]: [SaveMessageRequestedAction, number]) => {
    //         console.log("in switchmap");
    //        return this.gameMessages.postMessage(action.payload).pipe(
    //             map(res =>
    //                 new SaveMessageResponseAction(
    //                     res
    //                 )
    //             ),
    //             catchError((error) => of(new SetErrorAction(error.error)))
    //         );
    //     }
    //   )
    // );


    @Effect()
    new = this.actions$.pipe(
        ofType(GameMessagesActionTypes.MESSAGE_NEW_REQUESTED),
        withLatestFrom(
            this.store$.select(selector.selectRouteParam('gameId'))
        ),
        mergeMap(
            ([action, gameId]: [NewMessageRequestedAction, string]) => this.gameMessages
                .postMessage(Object.assign(action.payload, {gameId: Number.parseInt(gameId, 10)}))
                .pipe(map(res =>
                    new NewMessageResponseAction(
                        res
                    )
                ))
        )
    );
}
