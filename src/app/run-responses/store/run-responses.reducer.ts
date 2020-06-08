import {RunResponseActions, RunResponseActionTypes} from './run-responses.actions';
import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import {RunResponse} from './run-responses.state';

export interface RunResponseState extends EntityState<RunResponse> { }

export function selectIdentifier(a: RunResponse): string {
    return a.responseId;
}

export const arlearnActionsAdapter = createEntityAdapter<RunResponse>(
    {selectId: selectIdentifier}
);

const initialState: RunResponseState = arlearnActionsAdapter.getInitialState();

export function runResponsesReducer(
    state: RunResponseState = initialState,
    action: RunResponseActions,
): RunResponseState {
    switch (action.type) {
        case RunResponseActionTypes.ADD_ONE:
            return arlearnActionsAdapter.addOne(action.response, state);
        case RunResponseActionTypes.UPDATE_ONE:
            return arlearnActionsAdapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);
        case RunResponseActionTypes.DELETE_ONE:
            return arlearnActionsAdapter.removeOne(action.id, state);
        case RunResponseActionTypes.GET_ALL:
            return arlearnActionsAdapter.addMany(action.responses, state);
        case RunResponseActionTypes.ADD_ALL:
            if (!action.responsesFromServer || !action.responsesFromServer.responses) {
                return state;
            }
            return arlearnActionsAdapter.upsertMany(action.responsesFromServer.responses, state);
        default:
            return state;
    }
}
