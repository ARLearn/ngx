import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
    AddAll,
    Query,
    PortalUserActionTypes,
    GetAccountRequest,
    UpdateAccountRequest,
    SelectPlayer,
    AddOne,
    CreateAccountRequest,
    CreateAccountError,
    CreateAccountSuccess,
    DeleteAccountRequest,
    DeleteAccountResponse
} from './portal-users.actions';
import {catchError, map, switchMap} from 'rxjs/operators';


import {State} from "../../core/reducers";
import {AccountService} from "../../core/services/account.service";
import {Player} from "../../player-management/store/player.state";


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

    @Effect() createAccount$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.CREATE_ACCOUNT_REQ),
        switchMap((action: CreateAccountRequest) => {
            return this.accounts.createAccount(action.account).pipe(
                map(arr => {
                    return new CreateAccountSuccess(arr)
                }),
                catchError(() => of(new CreateAccountError(`Can't add this user, please, check your data!`)))
            );
        }),

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

    @Effect() deleteAccount$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.DELETE_ACCOUNT_REQ),
        switchMap((action: DeleteAccountRequest) => {
            return this.accounts.deleteAccount(action.fullId);
        }),
        map(arr => {
            return new DeleteAccountResponse(arr);
        })
    );

    @Effect() addAccount$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.CREATE_ACCOUNT_SUCCESS),
        map((action: CreateAccountSuccess) => new AddOne(action.account)),
    );

    constructor(private actions$: Actions,
                private store: Store<State>,
                private accounts: AccountService,
    ) {}
}
