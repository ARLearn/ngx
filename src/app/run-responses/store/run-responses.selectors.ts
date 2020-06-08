import {arlearnActionsAdapter, RunResponseState} from './run-responses.reducer';
import {createFeatureSelector} from '@ngrx/store';

export const getArlearnActionsState = createFeatureSelector<RunResponseState>('run-responses');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getArlearnActionsState);
