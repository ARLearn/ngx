import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, delay, map, switchMap, take, tap} from 'rxjs/operators';


import * as actions from './auth.actions';
import {UserClaim} from '../state/auth.state';
import {AccountService} from "../../core/services/account.service";
import {LogoutRequestedAction} from "./auth.actions";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";

@Injectable()
export class AuthEffects {
    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private actions$: Actions,
        private router: Router,
        private store: Store<State>
    ) {
    }


    @Effect()
    reLoginAction$ = this.actions$.pipe(
        ofType(actions.AuthActionTypes.RE_LOGIN_REQUESTED),
        take(1),
        // tap(x => console.log('relogin!!!')),
        switchMap(payload => this.authService.currentUser().pipe(
            switchMap(userCredential => this.authService.checkClaim(userCredential)),
            tap(claim => {
               const now =  Date.now();
               if (now > claim.expirationDate) {
                   console.log("logout... you are not authenticated");

                   this.store.dispatch(new actions.AuthErrorAction({error: "account expired"}));
                   this.store.dispatch(new LogoutRequestedAction());
                   this.router.navigate(['/']);
               } else {
                   console.log("all ok...");
               }
            }),
            map((fromClaim: UserClaim) => new actions.LoginCompletedAction(fromClaim)),
            // tap((res) => {
            //   this.router.navigate(['/about']);
            // }),
            catchError((error) => of(new actions.AuthErrorAction({error: error})))
            )
        )
    )
    ;


    @Effect()
    loginAction$ = this.actions$.pipe(
        ofType(actions.AuthActionTypes.LOGIN_REQUESTED),
        map((action: actions.LoginRequestedAction) => action.payload),
        switchMap(payload => this.authService.signIn(payload.user, payload.rememberMe).pipe(
            switchMap(userCredential => {
                return this.authService.checkClaim(userCredential);
            }),
            map((fromClaim: UserClaim) => {
                    const action = new actions.LoginCompletedAction(fromClaim);
                    // console.log('action is', action);
                    return action;
                }
            ), //
            tap((res) => {
                // localStorage.setItem('token', res.payload.user.userData.user.ra);

                this.router.navigate(['/portal/games/list']);
            }),
            catchError((error) => of(new actions.AuthErrorAction({error: error})))
            )
        )
    )
    ;


    @Effect()
    loginWithGoogleAction$ = this.actions$.pipe(
        // tap(action => {
        //   console.log('action is', action);
        // }),
        ofType(actions.AuthActionTypes.GOOGLE_LOGIN_REQUESTED),
        map((action: actions.GoogleLoginRequestedAction) => action.payload),
        switchMap(() => this.authService.signInWithGoogle().pipe(
            switchMap(res => this.authService.checkClaim(res)),

            map((fromClaim: UserClaim) => (new actions.LoginCompletedAction(fromClaim))),
            tap((res) => {
                this.router.navigate(['/portal/games/list']);
            }),
            catchError((error) => of(new actions.AuthErrorAction({error: error})))
            )
        )
    )
    ;

    @Effect()
    logoutAction$ = this.actions$.pipe(
        ofType(actions.AuthActionTypes.LOGOUT_REQUESTED),
        map((action: actions.LogoutRequestedAction) => action.payload),
        switchMap(() => this.authService.signOut().pipe(
            map(() => (new actions.LogoutCompletedAction())),
            tap(() => {
                localStorage.removeItem('token');

                this.router.navigate(['/']);
            }),
            catchError((error) => of(new actions.AuthErrorAction({error: error})))
            )
        )
    );

    @Effect()
    changeAccountMetadata = this.actions$.pipe(
        ofType(actions.AuthActionTypes.CHANGE_ACCOUNT),
        map((action: actions.LogoutRequestedAction) => action.payload),
        switchMap((payload) => this.authService.changeAccount(payload.name)),
        switchMap((payload) => this.authService.refreshToken()),
        delay(2000),
        switchMap((payload) => this.accountService.recreate().pipe(
            map(() => (new actions.ChangeAccountCompleteAction({}))),

            catchError((error) => of(new actions.AuthErrorAction({error: error})))
            )
        )
    );

}
