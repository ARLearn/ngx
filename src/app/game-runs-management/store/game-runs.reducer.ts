import * as actions from './game-runs.actions';
import {GameRun, GameRunsState, RunAccess} from './game-runs.state';
import {CurrentGameActionTypes} from '../../game-management/store/current-game.actions';
import {PendingPlayer} from '../../player-management/store/player.state';
import {AuthActionTypes} from "../../auth/store/auth.actions";
import * as _ from 'lodash';
import {createEntityAdapter, EntityState} from "@ngrx/entity";


export interface RunAccessState extends EntityState<RunAccess> {
}

export function selectRunAccessIdentifier(a: RunAccess): string {
    return a.account + '_' + a.runId;
}

export const runAccessAdapter = createEntityAdapter<RunAccess>({
    selectId: selectRunAccessIdentifier
});

export interface RunState extends EntityState<GameRun> {
}

export function selectRunIdentifier(a: GameRun): number {
    return a.runId;
}

export const runAdapter = createEntityAdapter<GameRun>({
    selectId: selectRunIdentifier
});

export interface PlayerState extends EntityState<PendingPlayer> {
}

export function selectPlayerIdentifier(a: PendingPlayer): string {
    return a.fullId;
}

export const playerAdapter = createEntityAdapter<PendingPlayer>({
    selectId: selectPlayerIdentifier
});

export const gameRunsInitialState: GameRunsState = {
    selectedRun: 0,
    editRun: null,
    // players: [],

    playersNew: playerAdapter.getInitialState(),
    runsNew: runAdapter.getInitialState(),
    runAccess: runAccessAdapter.getInitialState()
};

export function reducers(
    state = gameRunsInitialState, action: actions.GameRunsAction): GameRunsState {
    switch (action.type) {

        case actions.GameRunsActionTypes.SET_CURRENT_RUN_COMPLETED: {
            return Object.assign({}, state, {
                editRun: action.payload,
                selectedRun: action.payload.runId
            });
        }

        case actions.GameRunsActionTypes.GAME_RUNS_COMPLETED: {
            if (!action.payload.items) {
                return state;
            }
            return Object.assign({}, state, {
                runsNew: runAdapter.upsertMany(action.payload.items, state.runsNew),
            });
        }

        case actions.GameRunsActionTypes.SELECT_RUN: {
            return Object.assign({}, state, {selectedRun: action.payload.runId});
        }

        // case actions.GameRunsActionTypes.LOAD_RUN_USERS_REQUESTED: {
        //     return Object.assign({}, state, {players: []});
        // }

        case actions.GameRunsActionTypes.LOAD_RUN_USERS_COMPLETED: {
            return Object.assign({}, state, {
                playersNew: playerAdapter.upsertMany(action.payload, state.playersNew),
            });
        }

        case CurrentGameActionTypes.SET_CURRENT_GAME_REQUESTED: {
            return Object.assign({}, state, {
                selectedRun: 0,
                // players: []
            });
        }
        case actions.GameRunsActionTypes.RUN_UPDATE: {
            state.editRun = Object.assign({}, state.editRun, action.payload);
            return Object.assign({}, state);
        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return gameRunsInitialState;
        }

        case actions.GameRunsActionTypes.REVOKE_COLLABORATOR_ACCESS: {
            return Object.assign({}, state, {
                runAccess: runAccessAdapter.removeOne(action.payload.author + '_' + action.payload.runId, state.runAccess),
            });
        }

        case actions.GameRunsActionTypes.GAME_RUN_COLLABORATORS_COMPLETED: {
            return Object.assign({}, state, {
                runAccess: runAccessAdapter.upsertMany(action.payload, state.runAccess),
            });
        }

        case actions.GameRunsActionTypes.GAME_MY_COLLABORATORS_COMPLETED: {
            return Object.assign({}, state, {
                runAccess: runAccessAdapter.upsertMany(action.payload, state.runAccess),
            });
        }

        default: {
            return state;
        }
    }
}

const playermapper = (player: PendingPlayer) => {
    if (player.runId) {
        player.runId = parseInt('' + player.runId, 10);
    }
    if (player.gameId) {
        player.gameId = parseInt('' + player.gameId, 10);
    }
    return player;
};
