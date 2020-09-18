import {arlearnActionsAdapter, RunResponseState} from './run-responses.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getArlearnActionsState = createFeatureSelector<RunResponseState>('run-responses');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getArlearnActionsState);

export const getServerTime = createSelector(getArlearnActionsState, (state) => {
    return state.serverTime;
});

export const getNextCursor = createSelector(getArlearnActionsState, (state) => {
    return state.nextCursor;
});

export const getVisitedMessages = createSelector(getArlearnActionsState, (state) => {
    return state.visitedMessages;
});