import {createFeatureSelector, createSelector, select} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {GameRunsState} from './game-runs.state';
import {getAllPlayersAndMySelf, getPortalUser} from "../../player-management/store/player.selector";
import {UserState} from "../../user-management/store/portal-user.state";
import {PlayerState} from "../../player-management/store/player.state";
import {runAccessAdapter, runAdapter} from "./game-runs.reducer";
import * as fromRootSelector from "../../core/selectors/router.selector";
import {getCollaborators} from "./game-runs-access.selector";


export interface State extends fromRoot.State {
    gameRuns: GameRunsState;
    players: PlayerState;
    user: UserState;
}

export const getGameRunsFeature = createFeatureSelector<State, any>('gameRuns');

// const _getRuns = (state: GameRunsState) => state.runs.filter(run => !run.deleted);
// const _getPlayers = (state: GameRunsState) => state.players;
const _currentRunId = (state: GameRunsState) => state.selectedRun;
const _editRun = (state: GameRunsState) => state.editRun;
// const _getCollaborators = (state: GameRunsState) => state.collaborators;

// export const getRuns = createSelector(getGameRunsFeature, _getRuns);
// export const getPlayers = createSelector(getGameRunsFeature, _getPlayers);
export const getCurrentRunId = createSelector(getGameRunsFeature, _currentRunId);
export const getEditRunSelector = createSelector(getGameRunsFeature, _editRun);
// export const getCollaborators = createSelector(getGameRunsFeature, _getCollaborators);



export const getCollaboratorsWithAccount = createSelector(
    getCollaborators,
    getAllPlayersAndMySelf,
    (runCollaborators, players) => {

        if (!runCollaborators) {
            return [];
        }
        return runCollaborators.map((collaborator) => {
            const player = players.find((p) => p.fullId === collaborator.account);
            if (!player) {
                return collaborator;
            }
            return Object.assign({}, collaborator, player);
        });
    }
);

// export const getMyRunAccess = createSelector(
//     getCollaborators,
//     getPortalUser,
//     (runCollaborators, me) => {
//         if (!runCollaborators) {
//             return null;
//         }
//         const runAccess = runCollaborators.find(r => r.account === me.fullId);
//         return runAccess;
//     }
// );





export const getRunsSelector = createSelector(getGameRunsFeature, (state) => state.runsNew);
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = runAdapter.getSelectors(getRunsSelector);

export const currentGameRuns = createSelector(
    selectAll,
    fromRootSelector.selectRouteParam('gameId'),
    (all, currentGameId) => {
        return all.filter(ra => !ra.deleted && ra.gameId === Number.parseInt(currentGameId, 10));
    }
);


// export const runsPipe = pipe(
//   select(getRuns)
// );
