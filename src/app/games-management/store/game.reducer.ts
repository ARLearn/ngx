import * as actions from './game.actions';
import {gameInitialState, GameState} from './game.state';
import * as _ from 'lodash';
import {AuthActionTypes} from "../../auth/store/auth.actions";


export function reducers(
    state = gameInitialState, action: actions.GameAction): GameState {
    switch (action.type) {

        // case actions.GameActionTypes.GET_GAME_LIST_REQUESTED: {
        //     return Object.assign({}, state,{loading:true, list:[]});
        // }
        case AuthActionTypes.LOGIN_COMPLETED: {
            return Object.assign({}, gameInitialState);
        }

        case AuthActionTypes.LOGOUT_REQUESTED: {
            return Object.assign({}, gameInitialState);
        }

        case actions.GameActionTypes.GET_GAME_LIST_COMPLETED: {
            if (action.payload == null) {
                return state;
            }
            if (state.list.length != null) {

                return Object.assign({}, state, {
                    loading: false,
                    list: _.uniqBy([...state.list, ...action.payload], function (e) {
                        return e.gameId;
                    })
                });
            }
            return Object.assign({}, state, {loading: false, list: action.payload});
        }

        case actions.GameActionTypes.DELETE_GAME_COMPLETED: {

            if (action.payload && action.payload.deleted) {
                // console.log(state);
                _.remove(state.list, {
                    gameId: action.payload.gameId
                });
                return Object.assign({}, state);
            }
            return state;
        }

        case actions.GameActionTypes.SET_GAMES_FILTER: {
            return Object.assign({}, state, {filter: action.payload.filters});
        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return gameInitialState;
        }

        default: {
            return state;
        }
    }
}
