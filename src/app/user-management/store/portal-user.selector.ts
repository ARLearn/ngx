import {createFeatureSelector, createSelector,} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {UserState} from './portal-user.state';
//
// export interface State extends fromRoot.State {
//   user: UserState;
// }
//
// export const _getPortalUserState = createFeatureSelector<State, any>('user');
//
// export const _getPortalUserEmail = (state: UserState) => state.email;
// export const _getPortalUserDisplayName = (state: UserState) => state.name;
// export const _getPicture = (state: UserState) => state.picture;
//
// export const getUserEmail = createSelector(_getPortalUserState, _getPortalUserEmail);
// export const getUserDisplayName = createSelector(_getPortalUserState, _getPortalUserDisplayName);
// export const getUserPicture = createSelector(_getPortalUserState, _getPicture);

