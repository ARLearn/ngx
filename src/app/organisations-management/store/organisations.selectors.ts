import {createFeatureSelector, createSelector} from "@ngrx/store";
import {organisationsAdapter, OrganisationsState} from "./organisations.reducer";
import {organisationIdSelector} from "../../core/selectors/router.selector";


export const getOrganisationState = createFeatureSelector<OrganisationsState>('organisation-management');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = organisationsAdapter.getSelectors(getOrganisationState);

export const selectOrgQueryLoading = createSelector(getOrganisationState, state => state.queryLoading);

export const selectedOrganisation = createSelector(
    selectEntities, organisationIdSelector,
    (state, organisationId) =>
        state[organisationId]);
