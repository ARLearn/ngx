import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {AddAll, AddVisitedMessage, Load, Query, RunResponseActionTypes, SelectMessage} from './run-responses.actions';
import {map, mergeMap, skip, withLatestFrom} from 'rxjs/operators';
import {RunResponse} from './run-responses.state';
import {ActionsService} from "../../core/services/actions.service";
import {ResponsesService} from "../../core/services/responses.service";
import * as selector from "../../core/selectors/router.selector";
import * as fromRoot from "../../core/selectors/router.selector";
import {State} from "../../core/reducers";
import { GameMessagesService } from 'src/app/core/services/game-messages.service';
import { GameMessageEditCompletedAction } from 'src/app/game-message/store/game-message.actions';
import { SetSelectedScreenAction } from 'src/app/game-messages/store/game-messages.actions';
import {getNextCursor, getServerTime, getVisitedMessages, selectAll} from "./run-responses.selectors";


@Injectable()
export class RunResponsesEffects {

    // Listen for the 'QUERY' action, must be the first effect you trigger

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(RunResponseActionTypes.QUERY),
        withLatestFrom(
            this.store.select(fromRoot.selectRouteParam('runId')),
            this.store.select(fromRoot.selectRouteParam('messageId')),
            this.store.select(getNextCursor),
        ),
        mergeMap(([, runId, messageId, nextCursor]: [Query, string, string, string]) => {
            this.store.dispatch(new SelectMessage());
            return this.responsesService.getAllResponsesForItem(runId, messageId, nextCursor);
        }),
        map(arr => {
            if (arr.resumptionToken) {
                this.store.dispatch(new AddAll(arr));

                return new Query();
            }

            return new AddAll(arr);
        })
    );

    @Effect() selectedMessage$ = this.actions$.pipe(
        ofType(RunResponseActionTypes.SELECT_MESSAGE),
        withLatestFrom(
            this.store.select(fromRoot.selectRouteParam('messageId'))
        ),
        mergeMap(([action, messageId]: [Query, string]) => {
            return this.messagesService.getMessage(parseInt(messageId, 10));
        }),
        map(message => {
            message && this.store.dispatch(new AddVisitedMessage(message.id.toString()));
            message && this.store.dispatch(new SetSelectedScreenAction(message.id));
            return new GameMessageEditCompletedAction(message);
        })
    );

    @Effect() load$: Observable<Action> = this.actions$.pipe(
        ofType(RunResponseActionTypes.LOAD),
        withLatestFrom(
            this.store.select(fromRoot.selectRouteParam('runId')),
            this.store.select(fromRoot.selectRouteParam('messageId')),
            this.store.select(getServerTime),
            this.store.select(getNextCursor),
            this.store.select(getVisitedMessages),
        ),
        mergeMap(([, runId, messageId, from, cursor, visitedMessages]: [Query, string, string, number, string, string[]]) => {
            if (visitedMessages.includes(messageId)) {
                return this.responsesService.getResponsesUntil(runId, from, cursor);
            }

            return this.responsesService.getAllResponsesForItem(runId, messageId, cursor);
        }),
        map(arr => {
            if (arr.resumptionToken) {
                this.store.dispatch(new AddAll(arr));

                return new Load();
            }

            return new AddAll(arr);
        })
    );


    constructor(private actions$: Actions,
                private store: Store<State>,
                private responsesService: ResponsesService,
                private messagesService: GameMessagesService,
    ) {
    }
}


// responsesFromServer: {
//     type: 'org.celstec.arlearn2.beans.run.ResponseList',
//         deleted: false,
//
//         serverTime: '1594898059149',
//         resumptionToken: 'ClUKFAoJdGltZVN0YW1wEgcIo6jWjbUuEjlqHWV-c2VyaW91cy1nYW1pbmctcGxhdGZvcm0tZGV2chgLEgtSZXNwb25zZUpETxiAgIDg5sXdCAwYACAA'
// },
