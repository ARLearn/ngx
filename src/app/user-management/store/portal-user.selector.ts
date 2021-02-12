import {createFeatureSelector, createSelector,} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {UserState} from './portal-user.state';
import {getCurrentUser} from "../../auth/store/auth.selector";
import {AuthState} from "../../auth/state/auth.state";

export interface State extends fromRoot.State {
    user: UserState;
    authFeature: AuthState;
}

export const _getPortalUserState = createFeatureSelector<State, any>('user');

export const getPortalUser = createSelector(_getPortalUserState, (portal) => {

    return portal;
});

// export const getUserPicture = createSelector(_getPortalUserState, _getPicture);

