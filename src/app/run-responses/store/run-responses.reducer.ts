import {RunResponseActions, RunResponseActionTypes} from './run-responses.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {RunResponse} from './run-responses.state';

export interface RunResponseState extends EntityState<RunResponse> {
    serverTime: number;
    nextCursor: string;
    visitedMessages: string[];
}

export function selectIdentifier(a: RunResponse): string {
    return a.responseId;
}

export const arlearnActionsAdapter = createEntityAdapter<RunResponse>(
    {selectId: selectIdentifier}
);

const initialState: RunResponseState = arlearnActionsAdapter.getInitialState({ serverTime: 1, nextCursor: undefined, visitedMessages: [] });

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
        case RunResponseActionTypes.CLEAR:
            return arlearnActionsAdapter.removeAll({...state, serverTime: 1});
        case RunResponseActionTypes.GET_ALL:
            return arlearnActionsAdapter.addMany(action.responses, state);
        case RunResponseActionTypes.ADD_ALL:
            if (!action.responsesFromServer || !action.responsesFromServer.responses) {
                return state;
            }
            return arlearnActionsAdapter.upsertMany(action.responsesFromServer.responses, {
                ...state,
                serverTime: action.responsesFromServer.serverTime,
                nextCursor: action.responsesFromServer.resumptionToken,
            });
        case RunResponseActionTypes.ADD_VISITED_MESSAGES:
            return { ...state, visitedMessages: [ ...state.visitedMessages, action.id ] }
        default:
            return state;
    }
}
