import {arlearnActionsAdapter, PortalUserState} from './portal-users.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRootSelector from "../../core/selectors/router.selector";

export const getArlearnActionsState = createFeatureSelector<PortalUserState>('portal-users');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getArlearnActionsState);

export const selectUsersQueryLoading = createSelector(getArlearnActionsState, state => state.queryLoading);
export const selectedUser = createSelector(getArlearnActionsState, state => state.selectedPlayer);