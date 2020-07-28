import {arlearnActionsAdapter, PortalUserState} from './portal-users.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRootSelector from "../../core/selectors/router.selector";

export const getArlearnActionsState = createFeatureSelector<PortalUserState>('portal-users');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = arlearnActionsAdapter.getSelectors(getArlearnActionsState);


export const selectedUser = createSelector(fromRootSelector.selectRouteParam('userId'), selectEntities, (id, accounts) => {
        if (!accounts) {
            return null;
        }
        return accounts[id];
    }
);
