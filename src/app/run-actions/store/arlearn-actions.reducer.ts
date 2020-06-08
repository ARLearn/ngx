import {ARLearnActionActions, ARLearnActionActionTypes} from './arlearn-actions.actions';
import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import {ARLearnAction} from './arlearn-actions.state';

export interface ARLearnActionState extends EntityState<ARLearnAction> { }

export function selectIdentifier(a: ARLearnAction): string {
    return a.identifier;
}

export const arlearnActionsAdapter = createEntityAdapter<ARLearnAction>(
    {selectId: selectIdentifier}
);

const initialState: ARLearnActionState = arlearnActionsAdapter.getInitialState();

export function arlearnActionReducer(
    state: ARLearnActionState = initialState,
    action: ARLearnActionActions,
): ARLearnActionState {
    switch (action.type) {
        case ARLearnActionActionTypes.ADD_ONE:
            return arlearnActionsAdapter.addOne(action.action, state);
        case ARLearnActionActionTypes.UPDATE_ONE:
            return arlearnActionsAdapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);
        case ARLearnActionActionTypes.DELETE_ONE:
            return arlearnActionsAdapter.removeOne(action.id, state);
        case ARLearnActionActionTypes.GET_ALL:
            return arlearnActionsAdapter.addMany(action.actions, state);
        case ARLearnActionActionTypes.ADD_ALL:
            return arlearnActionsAdapter.upsertMany(action.actionsFromServer.actions, state);
        default:
            return state;
    }
}
