import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {AddAll, Query, PortalUserActionTypes, SelectMessage} from './portal-users.actions';
import {map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';


import {ResponsesService} from "../../core/services/responses.service";
import * as selector from "../../core/selectors/router.selector";
import * as fromRoot from "../../core/selectors/router.selector";
import {State} from "../../core/reducers";
import {GameMessagesService} from 'src/app/core/services/game-messages.service';
import {GameMessageEditCompletedAction} from 'src/app/game-message/store/game-message.actions';
import {SetSelectedScreenAction} from 'src/app/game-messages/store/game-messages.actions';
import {AccountService} from "../../core/services/account.service";


@Injectable()
export class PortalUsersEffects {


    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.QUERY),
        switchMap((action: Query) => {
            return this.accounts.search(action.query);
        }),
        map(arr => {
            return new AddAll(arr);
        })
    );


    constructor(private actions$: Actions,
                private store: Store<State>,
                private accounts: AccountService,
    ) {
    }
}
