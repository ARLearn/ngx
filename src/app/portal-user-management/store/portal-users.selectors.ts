import {arlearnActionsAdapter, PortalUserState} from './portal-users.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRootSelector from "../../core/selectors/router.selector";
import {organisationIdSelector} from "../../core/selectors/router.selector";

export const getPortalUserState = createFeatureSelector<PortalUserState>('portal-users');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getPortalUserState);

export const selectUsersQueryLoading = createSelector(getPortalUserState, state => state.queryLoading);
export const selectedUser = createSelector(getPortalUserState, state => state.selectedPlayer);

export const selectedCurrentOrganisationUser = createSelector(
    selectAll, organisationIdSelector, (state, organisationId)  =>
        state.filter(player => player.organisationId === organisationId));
