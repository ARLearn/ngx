import {arlearnActionsAdapter, PortalUserState} from './portal-users.reducer';
import {createFeatureSelector} from '@ngrx/store';

export const getArlearnActionsState = createFeatureSelector<PortalUserState>('portal-users');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getArlearnActionsState);
