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
        // case PortalUserActionTypes.QUERY:
        //     return {...state, queryLoading: true};
        // case PortalUserActionTypes.ADD_ONE:
        //     return arlearnActionsAdapter.addOne(action.response, state);
        // case PortalUserActionTypes.SELECT_PLAYER:
        //     return {...state, selectedPlayer: action.response};
        // case PortalUserActionTypes.UPDATE_ONE:
        //     return arlearnActionsAdapter.updateOne({
        //         id: action.id,
        //         changes: action.changes,
        //     }, state);
        // case PortalUserActionTypes.DELETE_ACCOUNT_RES:
        //     return arlearnActionsAdapter.removeOne(action.account.fullId, state);

        // case PortalUserActionTypes.GET_ALL:
        //     return arlearnActionsAdapter.addMany(action.responses, state);
        case OrganisationActionTypes.DELETE_ORGANISATION_RESPONSE:
            return organisationsAdapter.removeOne(action.organisation.id, state);
        case OrganisationActionTypes.ADD_ALL:
            // if (!action.players) {
            //     return arlearnActionsAdapter.removeAll({...state, queryLoading: false});
            // }
            return organisationsAdapter.upsertMany(action.organisations, {...state, queryLoading: false});
        default:
            return state;
    }
}
