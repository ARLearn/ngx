import {createFeatureSelector, createSelector} from "@ngrx/store";
import {playerAdapter} from "./game-runs.reducer";

import * as fromRoot from "../../core/reducers";
import {GameRunsState} from "./game-runs.state";
import * as fromRootSelector from "../../core/selectors/router.selector";

export interface State extends fromRoot.State {
    gameRuns: GameRunsState;
}

export const getGameRunsFeature = createFeatureSelector<State, any>('gameRuns');

// export const currentRunPlayers = createSelector(getPlayers, getCurrentRunId, (players, runId) =>
//     players.filter(player => player.runId === runId && !player.deleted)
// );

export const getPlayers = createSelector(getGameRunsFeature, (state) => state.playersNew);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = playerAdapter.getSelectors(getPlayers);

export const currentRunPlayers = createSelector(selectAll,
    fromRootSelector.selectRouteParam('runId'),
    (players, runId) => players.filter(p => p.runId === Number.parseInt(runId, 10) && !p.deleted)
);
