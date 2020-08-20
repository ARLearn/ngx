import {PortalUserActionTypes, RunResponseActions} from './portal-users.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Player} from "../../player-management/store/player.state";


export interface PortalUserState extends EntityState<Player> {
    queryLoading?: boolean,
    selectedPlayer?: Player,
}

export function selectIdentifier(a: Player): string {
    return a.fullId;
}

export const arlearnActionsAdapter = createEntityAdapter<Player>(
    {selectId: selectIdentifier}
);

const initialState: PortalUserState = arlearnActionsAdapter.getInitialState({
    queryLoading: false,
    selectedPlayer: null,
});

export function portalUserReducer(
    state: PortalUserState = initialState,
    action: RunResponseActions,
): PortalUserState {
    switch (action.type) {
        case PortalUserActionTypes.QUERY:
            return { ...state, queryLoading: true };
        case PortalUserActionTypes.ADD_ONE:
            return arlearnActionsAdapter.addOne(action.response, state);
        case PortalUserActionTypes.SELECT_PLAYER:
            return { ...state, selectedPlayer: action.response };
        case PortalUserActionTypes.UPDATE_ONE:
            return arlearnActionsAdapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);
        case PortalUserActionTypes.DELETE_ONE:
            return arlearnActionsAdapter.removeOne(action.id, state);
        case PortalUserActionTypes.GET_ALL:
            return arlearnActionsAdapter.addMany(action.responses, state);
        case PortalUserActionTypes.ADD_ALL:
            if (!action.players) {
                return arlearnActionsAdapter.removeAll({ ...state, queryLoading: false });
            }
            return arlearnActionsAdapter.upsertMany(action.players, arlearnActionsAdapter.removeAll({ ...state, queryLoading: false }));
        default:
            return state;
    }
}
