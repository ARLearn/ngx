import * as actions from './game-runs.actions';
import {GameRun, gameRunsInitialState, GameRunsState} from './game-runs.state';
import {CurrentGameActionTypes} from '../../game-management/store/current-game.actions';
import {PendingPlayer} from '../../player-management/store/player.state';
import {AuthActionTypes} from "../../auth/store/auth.actions";
import * as _ from 'lodash';

export function reducers(
    state = gameRunsInitialState, action: actions.GameRunsAction): GameRunsState {
    switch (action.type) {

        case actions.GameRunsActionTypes.SET_CURRENT_RUN_COMPLETED: {
            return Object.assign({}, state, {
                editRun: action.payload,
                selectedRun: action.payload.runId
            });
        }

        case actions.GameRunsActionTypes.GAME_RUNS_REQUESTED: {
            return Object.assign({}, state, {runs: [], players: []});
        }

        case actions.GameRunsActionTypes.GAME_RUNS_COMPLETED: {
            if (!action.payload.items) {
                return state;
            }
            if (state.runs != null && state.runs.length !== 0) {

                return Object.assign({}, state, {

                    runs: _.uniqBy([...state.runs, ...action.payload.items], function (e) {
                        return e.runId;
                    })
                });
            }
            return Object.assign({}, state, {runs: action.payload.items});
            // return Object.assign({}, state, {runs: action.payload.items.map(mapper)});
        }

        case actions.GameRunsActionTypes.SELECT_RUN: {
            return Object.assign({}, state, {selectedRun: action.payload.runId});
        }

        case actions.GameRunsActionTypes.LOAD_RUN_USERS_REQUESTED: {
            return Object.assign({}, state, {players: []});
        }

        case actions.GameRunsActionTypes.LOAD_RUN_USERS_COMPLETED: {
            if (!action.payload) {
                return state;
            }
            return Object.assign({}, state, {players: action.payload.map(playermapper)});
        }

        case CurrentGameActionTypes.SET_CURRENT_GAME_REQUESTED: {
            return Object.assign({}, state, {
                selectedRun: 0,
                runs: [],
                players: []
            });
        }
        case actions.GameRunsActionTypes.RUN_UPDATE: {
            state.editRun = Object.assign({}, state.editRun, action.payload);
            return Object.assign({}, state);
        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return gameRunsInitialState;
        }

        default: {
            return state;
        }
    }
}


const mapper = (run: GameRun) => {
    if (run.runId) {
        run.runId = parseInt('' + run.runId, 10);
    }
    if (run.gameId) {
        run.gameId = parseInt('' + run.gameId, 10);
    }
    return run;
};

const playermapper = (player: PendingPlayer) => {
    if (player.runId) {
        player.runId = parseInt('' + player.runId, 10);
    }
    if (player.gameId) {
        player.gameId = parseInt('' + player.gameId, 10);
    }
    return player;
};
