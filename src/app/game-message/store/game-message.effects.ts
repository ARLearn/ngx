import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {State} from 'src/app/core/reducers';
import {map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    GameMessageActionTypes,
    GameMessageDirectSaveAction,
    GameMessageEditAction,
    GameMessageEditCompletedAction
} from './game-message.actions';
import {getCurrentMessageSelector} from '../../game-messages/store/game-messages.selector';
import {GameMessage} from '../../game-messages/store/game-messages.state';
import {GameMessagesService} from '../../core/services/game-messages.service';
import {currentMessageId} from '../../core/selectors/router.selector';
import {
    GetGameMessagesCompletedAction,
    SaveMessageResponseAction
} from '../../game-messages/store/game-messages.actions';
import {getEditMessageSelector} from "./game-message.selector";
import {Router} from "@angular/router";

@Injectable()
export class GameMessageEffects {
    constructor(
        private actions$: Actions,
        private gameMessages: GameMessagesService,
        public store: Store<State>,
        private router: Router
    ) {
    }

    @Effect()
    editMessageFromRouter: Observable<Action> = this.actions$.pipe(
        ofType(GameMessageActionTypes.GAME_MESSAGE_EDIT),
        withLatestFrom(
            this.store.select(currentMessageId)
        ),
        switchMap(
            ([action, messageId]: [GameMessageEditAction, number]) =>
                this.gameMessages.getMessage(messageId || action.payload.messageId).pipe(
                    map(res =>
                        new GameMessageEditCompletedAction(
                            res
                        )
                    )
                )
        )
    );


    @Effect()
    saveMessage: Observable<Action> = this.actions$.pipe(
        ofType(GameMessageActionTypes.GAME_MESSAGE_SAVE),
        withLatestFrom(
            this.store.select(getEditMessageSelector)
        ),
        mergeMap(
            ([action, message]: [GameMessageEditAction, GameMessage]) =>
                this.gameMessages.postMessage(message).pipe(
                    map(res =>
                        new SaveMessageResponseAction(
                            res
                        )
                    )
                )
        ),
        tap((res: any) => {
            this.router.navigate(['/portal/game/' + res.payload.gameId + '/detail/screens']);
        })
    );

    @Effect()
    directSaveMessage: Observable<Action> = this.actions$.pipe(
        ofType(GameMessageActionTypes.GAME_MESSAGE_DIRECT_SAVE),
        mergeMap(
            (action: GameMessageDirectSaveAction) =>
                this.gameMessages.postMessage(action.payload).pipe(
                    map(res =>
                        new SaveMessageResponseAction(
                            res
                        )
                    )
                )
        )
    );
}
