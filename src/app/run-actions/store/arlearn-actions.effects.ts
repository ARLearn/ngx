import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {AddAll, ARLearnActionActionTypes, Query} from './arlearn-actions.actions';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ARLearnAction} from './arlearn-actions.state';
import {ActionsService} from "../../core/services/actions.service";
import {State} from "../../core/reducers";
import * as fromRoot from "../../core/selectors/router.selector";




@Injectable()
export class ArlearnActionsEffects {

    // Listen for the 'QUERY' action, must be the first effect you trigger

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(ARLearnActionActionTypes.QUERY),
        withLatestFrom(
            this.store.select(fromRoot.selectRouteParam('runId'))
        ),
        mergeMap(([action, runId]: [Query, string]) => {

            return this.arlearnActionService.getActions(runId, 1, null);
        }),
        map(arr => {
            console.log(arr);
            return new AddAll(arr);
        })
    );


    constructor(private actions$: Actions,
                private store: Store<State>,
                private arlearnActionService: ActionsService
                ) {
    }
}
