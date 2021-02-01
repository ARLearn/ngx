import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
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
    DeleteAccountResponse, SetRoleRequest, QueryByOrganisation
} from './portal-users.actions';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';


import {State} from "../../core/reducers";
import {AccountService} from "../../core/services/account.service";
import {Player} from "../../player-management/store/player.state";
import { selectedUser } from './portal-users.selectors';
import {organisationIdSelector} from "../../core/selectors/router.selector";


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

    @Effect() queryByOrg$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.QUERY_BY_ORG),
        withLatestFrom(
            this.store.select(organisationIdSelector)
        ),
        switchMap(([action, organisationId]: [QueryByOrganisation, string]) => {
            return this.accounts.searchByOrganisation(organisationId);
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
                    return new CreateAccountSuccess(arr);
                }),
                catchError(() => of(new CreateAccountError(`Can't add this user, please, check your data!`)))
            );
        }),

    );

    @Effect() updateAccount$: Observable<Action> = this.actions$.pipe(
        ofType(PortalUserActionTypes.UPDATE_ACCOUNT_REQ),
        withLatestFrom(this.store.select(selectedUser)),
        switchMap(([action, user]:[UpdateAccountRequest, Player]) => {
            const streams$ = [];
            streams$.push(of(user.fullId));

            if (user.admin !== action.account.admin) {
                streams$.push(this.accounts.setRole(user.fullId, 'admin', action.account.admin))
            }

            if (user.advanced !== action.account.advanced) {
                streams$.push(this.accounts.setRole(user.fullId, 'advanced', action.account.advanced))
            }
            
            streams$.push(this.accounts.updateAccount(action.account));

            return forkJoin(streams$);
        }),
        mergeMap(([fullId]: any) => this.accounts.getWithId(fullId)),
        map((player) => {
            return new SelectPlayer(player);
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

    @Effect({ dispatch: false }) setRoleToAccount$: Observable<void> = this.actions$.pipe(
        ofType(PortalUserActionTypes.SET_ROLE),
        switchMap((action: SetRoleRequest) => {
            return this.accounts.setRole(action.fullId, action.role, action.isInRole);
        }),
        map(arr => {
           console.log('SET ROLE', arr);
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
