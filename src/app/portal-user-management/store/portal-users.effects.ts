import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {
    AddAll,
    Query,
    PortalUserActionTypes,
    GetAccountRequest,
    UpdateAccountRequest, SelectPlayer
} from './portal-users.actions';
import {map, switchMap} from 'rxjs/operators';


import {State} from "../../core/reducers";
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

    @Effect() getAccount$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.GET_REQ),
        switchMap((action: GetAccountRequest) => {
            return this.accounts.getWithId(action.fullId);
        }),
        map(arr => {
            return new SelectPlayer(arr);
        })
    );

    @Effect() updateAccount$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.UPDATE_ACCOUNT_REQ),
        switchMap((action: UpdateAccountRequest) => {
            return this.accounts.updateAccount(action.account);
        }),
        map(arr => {
            return new SelectPlayer(arr);
        })
    );

    constructor(private actions$: Actions,
                private store: Store<State>,
                private accounts: AccountService,
    ) {
    }
}
