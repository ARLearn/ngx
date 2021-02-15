import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Organisation} from "./organisations.state";
import {PortalUserActionTypes, RunResponseActions} from "../../portal-user-management/store/portal-users.actions";
import {arlearnActionsAdapter, PortalUserState} from "../../portal-user-management/store/portal-users.reducer";
import {OrganisationActions, OrganisationActionTypes} from "./organisations.actions";


export interface OrganisationsState extends EntityState<Organisation> {
    queryLoading?: boolean;
}

export function selectIdentifier(a: Organisation): string {
    return a.id;
}


export const organisationsAdapter = createEntityAdapter<Organisation>(
    {selectId: selectIdentifier}
);

const initialState: OrganisationsState = organisationsAdapter.getInitialState({
    queryLoading: false,
});

export function organisationReducer(
    state: OrganisationsState = initialState,
    action: OrganisationActions,
): OrganisationsState {
    switch (action.type) {
        case OrganisationActionTypes.DELETE_ORGANISATION_RESPONSE:
            return organisationsAdapter.removeOne(action.organisation.id, state);
        case OrganisationActionTypes.ADD_ALL:
            return organisationsAdapter.upsertMany(action.organisations, {...state, queryLoading: false});
        case OrganisationActionTypes.ADD_ONE:
            return organisationsAdapter.upsertOne(action.organisation, {...state, queryLoading: false});
        default:
            return state;
    }
}
