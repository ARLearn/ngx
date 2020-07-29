import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as selector from 'src/app/core/selectors/router.selector';
import {
    GameMessagesActionTypes,
    GetGameMessagesCompletedAction,
    GetGameMessagesRequestAction,
    GetMessageDeleteResponseAction, NewMessageRequestedAction,
    NewMessageResponseAction,
    SelectMessageAction,
    SelectMessageFromRouterAction
} from './game-messages.actions';
import {State} from 'src/app/core/reducers';
import {GameMessagesService} from '../../core/services/game-messages.service';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SetErrorAction} from '../../shared/store/shared.actions';
import * as fromRootSelector from "../../core/selectors/router.selector";


@Injectable()
export class GameMessagesEffects {
  constructor(
    private actions$: Actions,
    private gameMessages: GameMessagesService,
    private store$: Store<State>
  ) {
  }

  // @Effect()
  // $isasnit = this.actions$.pipe(
  //   ofType(ROOT_EFFECTS_INIT),
  //   tap(x => {
  //     console.log('IN INIT');
  //   }),
  //   filter(x => false)
  // );

  // importantinit$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType("@ngrx/router-store/navigated"),
  //     tap(x => {
  //       console.log('IN INIT');
  //     }),
  //     // tap(x => {
  //     //   console.log('IN INIT');
  //     // })
  //     map(x => new GetGameMessagesCompletedAction({}))
  //   )
  // );

  @Effect()
  init$: Observable<Action> = this.actions$.pipe(
    ofType(GameMessagesActionTypes.GAME_MESSAGES_REQUESTED),
    // .distinct((action: GetGameMessagesRequestAction) => {
    //     return action.payload;
    // })
    withLatestFrom(
      this.store$.select(selector.selectRouteParam('gameId'))
    ),
    switchMap(
      ([action, gameId]: [GetGameMessagesRequestAction, string]) =>
        this.gameMessages.listMessages(gameId || action.payload.gameId).pipe(
          map(res =>
            new GetGameMessagesCompletedAction(
              {gameId: gameId, items: res}
            )
          )
        )
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
      ([action, gameId]: [GetGameMessagesRequestAction, string]) => this.gameMessages.deleteMessage(gameId, action.payload).pipe(
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
