import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {AddAll, ARLearnActionActionTypes} from './arlearn-actions.actions';
import {map, mergeMap} from 'rxjs/operators';
import {ARLearnAction} from './arlearn-actions.state';
import {ActionsService} from "../../core/services/actions.service";



@Injectable()
export class ArlearnActionsEffects {

    // Listen for the 'QUERY' action, must be the first effect you trigger

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(ARLearnActionActionTypes.QUERY),
        mergeMap(action => {

            return this.arlearnActionService.getActions(5695700750827520, 1, null);
        }),
        map(arr => {
            console.log(arr);
            return new AddAll(arr);
        })
    );


    constructor(private actions$: Actions,
                private arlearnActionService: ActionsService
                ) {
    }
}
