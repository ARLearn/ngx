import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {AddAll, Query, RunResponseActionTypes} from './run-responses.actions';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {RunResponse} from './run-responses.state';
import {ActionsService} from "../../core/services/actions.service";
import {ResponsesService} from "../../core/services/responses.service";
import * as selector from "../../core/selectors/router.selector";
import * as fromRoot from "../../core/selectors/router.selector";
import {State} from "../../core/reducers";


@Injectable()
export class RunResponsesEffects {

    // Listen for the 'QUERY' action, must be the first effect you trigger

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(RunResponseActionTypes.QUERY),
        withLatestFrom(
            this.store.select(fromRoot.selectRouteParam('runId'))
        ),
        mergeMap(([action, runId]: [Query, string]) => {
            return this.responsesService.getResponses(runId, 1, null);
        }),
        map(arr => {
            return new AddAll(arr);
        })
    );


    constructor(private actions$: Actions,
                private store: Store<State>,
                private responsesService: ResponsesService
    ) {
    }
}
