import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {AddAll, Query, RunResponseActionTypes, SelectMessage} from './run-responses.actions';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {RunResponse} from './run-responses.state';
import {ActionsService} from "../../core/services/actions.service";
import {ResponsesService} from "../../core/services/responses.service";
import * as selector from "../../core/selectors/router.selector";
import * as fromRoot from "../../core/selectors/router.selector";
import {State} from "../../core/reducers";
import { GameMessagesService } from 'src/app/core/services/game-messages.service';
import { GameMessageEditCompletedAction } from 'src/app/game-message/store/game-message.actions';
import { SetSelectedScreenAction } from 'src/app/game-messages/store/game-messages.actions';
import {getServerTime} from "./run-responses.selectors";


@Injectable()
export class RunResponsesEffects {

    // Listen for the 'QUERY' action, must be the first effect you trigger

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(RunResponseActionTypes.QUERY),
        withLatestFrom(
            this.store.select(fromRoot.selectRouteParam('runId')),
            this.store.select(fromRoot.selectRouteParam('messageId')),
            this.store.select(getServerTime),
        ),
        mergeMap(([action, runId, messageId, serverTime]: [Query, string, string, number]) => {
            this.store.dispatch(new SelectMessage());
            return this.responsesService.getResponses(runId, serverTime, null);
        }),
        map(arr => {
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
            message && this.store.dispatch(new SetSelectedScreenAction(message.id));
            return new GameMessageEditCompletedAction(message);
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
