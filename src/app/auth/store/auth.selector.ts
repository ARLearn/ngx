import {
    createSelector,
    createFeatureSelector, select,
} from '@ngrx/store';

import {AuthState} from '../state/auth.state';
import * as fromRoot from 'src/app/core/reducers';
import {pipe} from 'rxjs';

export interface State extends fromRoot.State {
    authFeature: AuthState;
}

export const getAuthState = createFeatureSelector<State, any>('authFeature');

// export const getUserData = (state: AuthState) => state.userData;
export const getIsUserLoggedIn = (state: AuthState) => state.isLoggedIn;
export const getIsAdmin = (state: AuthState) => state.isAdmin;
export const getIsAdvanced = (state: AuthState) => state.isAdvanced;
export const getIsDistributor = (state: AuthState) => state.isDistributor;
// export const _getExpirationDate = (state: AuthState) => state.expirationDate;
export const getError = (state: AuthState) => state.error;
export const currentUser = (state: AuthState) => state.user;
export const getBearerToken = (state: AuthState) => {
    if (state == null) {
        return '';
    }

    if (state.user == null) {
        return '';
    }
    // console.log(state.user);
    return state.user['ma'];
};


// export const getAuthUserData = createSelector(getAuthState, getUserData);
export const getAuthIsLoggedIn = createSelector(getAuthState, getIsUserLoggedIn);
export const getAuthIsAdmin = createSelector(getAuthState, getIsAdmin);
export const getAuthIsAvanced = createSelector(getAuthState, getIsAdvanced);
export const getAuthError = createSelector(getAuthState, getError);
export const getCurrentUser = createSelector(getAuthState, currentUser);
// export const getExpirationDate = createSelector(getAuthState, _getExpirationDate);


export const getAuthErrorPipe = pipe(
    select(getAuthError)
);
