import {Action} from '@ngrx/store';
import {UserClaim} from '../state/auth.state';

export const AuthActionTypes = {
    RE_LOGIN_REQUESTED: '[Auth] Re LOGIN Requested',

    LOGIN_REQUESTED: '[Auth] LOGIN Requested',
    LOGIN_COMPLETED: '[Auth] LOGIN Completed',

    GOOGLE_LOGIN_REQUESTED: '[Auth] Google LOGIN Requested',
    GOOGLE_LOGIN_COMPLETED: '[Auth] Google LOGIN Completed',

    LOGOUT_REQUESTED: '[Auth] LOGOUT Requested',
    LOGOUT_COMPLETED: '[Auth] LOGOUT Completed',

    SIGNUP_REQUESTED: '[Auth] SIGNUP Requested',
    SIGNUP_COMPLETED: '[Auth] SIGNUP Completed',

    CHANGE_ACCOUNT: '[Auth] Change account data',
    CHANGE_ACCOUNT_COMPLETE: '[Auth] Change account data complete',

    AUTH_ERROR: '[Auth] Auth Error'
};


export interface AuthUserPayload {
    user: {
        email: string;
        password: string
    };
    rememberMe: boolean;
}

export class LoginRequestedAction implements Action {
    type = AuthActionTypes.LOGIN_REQUESTED;

    constructor(public payload: AuthUserPayload) {
    }
}

export class LoginCompletedAction implements Action {
    type = AuthActionTypes.LOGIN_COMPLETED;

    constructor(public payload: UserClaim = null) {
    }
}

export class ReLoginRequestedAction implements Action {
    type = AuthActionTypes.RE_LOGIN_REQUESTED;

    constructor(public payload: any = null) {
    }
}


export class GoogleLoginRequestedAction implements Action {
    type = AuthActionTypes.GOOGLE_LOGIN_REQUESTED;

    constructor(public payload: any = null) {
        console.log("constructor called");
    }
}

export class GoogleLoginCompletedAction implements Action {
    type = AuthActionTypes.GOOGLE_LOGIN_COMPLETED;

    constructor(public payload: AuthUserPayload) {
    }
}

export class AuthErrorAction implements Action {
    type = AuthActionTypes.AUTH_ERROR;

    constructor(public payload: any) {
        console.log("create auth error");
    }
}

export class LogoutRequestedAction implements Action {
    type = AuthActionTypes.LOGOUT_REQUESTED;

    constructor(public payload = null) {
    }
}

export class LogoutCompletedAction implements Action {
    type = AuthActionTypes.LOGOUT_COMPLETED;

    constructor(public payload = null) {
    }
}

export class SignUpRequestedAction implements Action {
    type = AuthActionTypes.SIGNUP_REQUESTED;

    constructor(public payload: AuthUserPayload) {
    }
}

export class SignUpCompletedAction implements Action {
    type = AuthActionTypes.SIGNUP_COMPLETED;

    constructor(public payload: AuthUserPayload) {
    }
}

export class ChangeAccountAction implements Action {
    type = AuthActionTypes.CHANGE_ACCOUNT;

    constructor(public payload: any) {
    }
}


export class ChangeAccountCompleteAction implements Action {
    type = AuthActionTypes.CHANGE_ACCOUNT_COMPLETE;

    constructor(public payload: any) {
    }
}

export type AuthAction
    = LoginRequestedAction
    | LoginCompletedAction
    | ReLoginRequestedAction

    | GoogleLoginRequestedAction
    | GoogleLoginCompletedAction

    | LogoutRequestedAction
    | LogoutCompletedAction
    | ChangeAccountCompleteAction
    | AuthErrorAction;
