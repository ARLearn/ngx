import {arlearnActionsAdapter, ARLearnActionState} from './arlearn-actions.reducer';
import {createFeatureSelector} from '@ngrx/store';

export const getArlearnActionsState = createFeatureSelector<ARLearnActionState>('run-actions');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getArlearnActionsState);
