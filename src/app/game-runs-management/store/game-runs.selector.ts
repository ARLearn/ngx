import {createFeatureSelector, createSelector, select} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {GameRunsState} from './game-runs.state';
import {pipe} from 'rxjs/internal-compatibility';


export interface State extends fromRoot.State {
  gameRuns: GameRunsState;
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

// export const runsPipe = pipe(
//   select(getRuns)
// );
