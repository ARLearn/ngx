import {Router} from '@angular/router';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {State} from 'src/app/core/reducers';

import {AuthActionTypes} from 'src/app/auth/store/auth.actions';
import {AccountService} from '../../core/services/account.service';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {
    LoadUserCompletedAction,
    LoadUserRequestAction,
    PortalUserActionTypes,
    SaveUserCompletedAction,
    SaveUserRequestAction
} from './portal-user.actions';
import * as actions from '../../auth/store/auth.actions';
import {AuthService} from '../../auth/services/auth.service';
import {SetErrorAction} from "../../shared/store/shared.actions";

@Injectable()
export class UserEffects {
    constructor(
        private accountService: AccountService,
        private actions$: Actions,
        private router: Router,
        private store$: Store<State>,
        private authService: AuthService,
    ) {
    }


    @Effect()
    loadUser: Observable<Action> = this.actions$
        .pipe(
            ofType(AuthActionTypes.LOGIN_COMPLETED),
            switchMap(payload => this.accountService
                .get()
            ),
            map(res =>
                    new LoadUserCompletedAction(res),
                catchError((error) => {
                    console.log("in catch error", error);
                    return of(new SetErrorAction(error.error));
                })
            )
        );

    @Effect()
    loadUser2: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalUserActionTypes.LOAD_USER_REQUESTED),
            switchMap(payload => this.accountService
                .get()
            ),
            map(res =>
                    new LoadUserCompletedAction(res),
                catchError((error) => {
                    console.log("in catch error", error);
                    return of(new SetErrorAction(error.error));
                })
            )
        );

    @Effect()
    saveUser: Observable<Action> = this.actions$
        .pipe(
            ofType(PortalUserActionTypes.SAVE_USER_REQUESTED),
            tap(() => console.log('in effect saving user')),

            switchMap((payload: SaveUserRequestAction) => {
                    this.authService.setDisplayName(payload.payload.name);
                    return this.accountService.get();
                }
            ),
            map(res =>
                new SaveUserCompletedAction(res)
            )
        );

    @Effect()
    init$ = this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => console.log('init finished')),
        map(res =>
            new LoadUserRequestAction()
        )
    );


}
