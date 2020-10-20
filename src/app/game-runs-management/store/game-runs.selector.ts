import {createFeatureSelector, createSelector, select} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {GameRunsState} from './game-runs.state';
import {pipe} from 'rxjs/internal-compatibility';
import {getAllPlayersAndMySelf, getPortalUser} from "../../player-management/store/player.selector";
import {UserState} from "../../user-management/store/portal-user.state";
import {PlayerState} from "../../player-management/store/player.state";


export interface State extends fromRoot.State {
    gameRuns: GameRunsState;
    players: PlayerState;
    user: UserState;
}

export const getGameRunsFeature = createFeatureSelector<State, any>('gameRuns');

const _getRuns = (state: GameRunsState) => state.runs.filter(run => !run.deleted);
const _getPlayers = (state: GameRunsState) => state.players;
const _currentRunId = (state: GameRunsState) => state.selectedRun;
const _editRun = (state: GameRunsState) => state.editRun;
const _getCollaborators = (state: GameRunsState) => state.collaborators;

export const getRuns = createSelector(getGameRunsFeature, _getRuns);
export const getPlayers = createSelector(getGameRunsFeature, _getPlayers);
export const getCurrentRunId = createSelector(getGameRunsFeature, _currentRunId);
export const getEditRunSelector = createSelector(getGameRunsFeature, _editRun);
export const getCollaborators = createSelector(getGameRunsFeature, _getCollaborators);

export const currentRunPlayers = createSelector(getPlayers, getCurrentRunId, (players, runId) =>
    players.filter(player => player.runId === runId && !player.deleted)
);


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

export const getMyRunAccess = createSelector(
    getCollaborators,
    getPortalUser,
    (runCollaborators, me) => {
        console.log("rc ", runCollaborators);
        console.log("rc ", me);
        if (!runCollaborators) {
            return null;
        }
        const runAccess = runCollaborators.find(r => r.account === me.fullId);
        return runAccess;
    }
);

export const canViewRun = createSelector(getMyRunAccess, (access) => {
    if (!access) {
        return false;
    }
    return true;
});

export const canEditRun = createSelector(getMyRunAccess, (access) => {
    if (!access) {
        return false;
    }
    return (access.accessRights === 1) || (access.accessRights === 2);
});

export const ownsRun = createSelector(getMyRunAccess, (access) => {
    if (!access) {
        return false;
    }
    return (access.accessRights === 1) ;
});
// export const runsPipe = pipe(
//   select(getRuns)
// );
