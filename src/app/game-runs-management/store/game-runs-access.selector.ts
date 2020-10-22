import {runAccessAdapter} from "./game-runs.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

import * as fromRootSelector from "../../core/selectors/router.selector";
import {getPortalUser} from "../../player-management/store/player.selector";
import {GameRunsState, RunAccessRight} from "./game-runs.state";
import * as fromRoot from "../../core/reducers";
import {PlayerState} from "../../player-management/store/player.state";
import {UserState} from "../../user-management/store/portal-user.state";

export interface State extends fromRoot.State {
    gameRuns: GameRunsState;
    players: PlayerState;
    user: UserState;
}

export const getGameRunsFeature = createFeatureSelector<State, any>('gameRuns');

export const getRunAccess = createSelector(getGameRunsFeature, (state) => state.runAccess);
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = runAccessAdapter.getSelectors(getRunAccess);


// export const currentGameRunAccess = createSelector(
//     selectAll,
//     fromRootSelector.selectRouteParam('gameId'),
//     (all, currentGameId) => all.filter(ra => ra.runId = Number.parseInt(currentGameId, 10))
// );


export const getMyRunAccess = createSelector(
    selectEntities,
    getPortalUser,
    fromRootSelector.selectRouteParam('runId'),
    (runCollaborators, me, runId) => {
        return runCollaborators[me.fullId + '_' + runId];
    }
);

export const getCollaborators = createSelector(
    selectAll,
    fromRootSelector.selectRouteParam('runId'),
    (runCollaborators, runId) => {
        console.log("getMyRunAccess", runCollaborators, runId);
        return runCollaborators.filter(ra => ra.runId === Number.parseInt(runId, 10));
    }
);

export const canEditRun = createSelector(getMyRunAccess, (access) => {
    if (!access) {
        return false;
    }
    return (access.accessRights === RunAccessRight.OWNER) || (access.accessRights === RunAccessRight.EDITOR);
});

export const ownsRun = createSelector(getMyRunAccess, (access) => {
    if (!access) {
        return false;
    }
    return (access.accessRights === RunAccessRight.OWNER) ;
});

export const canViewRun = createSelector(getMyRunAccess, (access) => {
    if (!access) {
        return false;
    }
    return true;
});

