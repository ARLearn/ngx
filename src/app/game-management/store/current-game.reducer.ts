import * as actions from './current-game.actions';
import {currentGameInitialState, CurrentGameState} from './current-game.state';
import {AuthActionTypes} from "../../auth/store/auth.actions";


export function reducers(
    state = currentGameInitialState, action: actions.CurrentGameAction): CurrentGameState {
    switch (action.type) {

        // case actions.CurrentGameActionTypes.SET_CURRENT_GAME_REQUESTED: {
        //   return Object.assign({}, {loading: true});
        // }


        case actions.CurrentGameActionTypes.GET_CURRENT_GAME_FROM_ROUTER_REQUESTED: {

            return Object.assign({}, state, {
                loading: true,
                game: null
            });
        }

        case actions.CurrentGameActionTypes.SET_CURRENT_GAME_COMPLETED: {

            return Object.assign({}, state, {
                loading: false,
                game: action.payload
            });
        }

        case actions.CurrentGameActionTypes.RESET_CURRENT_GAME_REQUESTED: {

            return Object.assign({}, {
                loading: false,
                saving: false,
                game: null
            });
        }

        case actions.CurrentGameActionTypes.GAME_CONFIG_UPDATE: {
            state.game = Object.assign({}, state.game);
            state.game.config = Object.assign(state.game.config, action.payload);
            return Object.assign({}, state);
            // return state;
        }

        case actions.CurrentGameActionTypes.GAME_UPDATE: {
            console.log("in update", action.payload);
            state.game = Object.assign({}, state.game, action.payload);
            if (state.game.sharing === 3 && !state.game.licenseCode) {
                state.game.licenseCode = 'cc-by';
            }
            if (!state.game.splashScreen) {
                delete state.game.splashScreen;
            }
            return Object.assign({}, state);

        }

        case actions.CurrentGameActionTypes.SAVE_GAME_REQUESTED: {

            return Object.assign({}, state, {
                saving: true,
            });
        }

        case actions.CurrentGameActionTypes.SAVE_GAME_COMPLETED: {

            return Object.assign({}, state, {
                saving: false,
            });
        }

        case actions.CurrentGameActionTypes.SET_THEME: {
            return Object.assign({}, state, {
                selectedTheme: action.payload
            });
        }

        case actions.CurrentGameActionTypes.CURRENT_GAME_ERROR: {
            return Object.assign({}, state, {
                saving: false,
                loading: false
            });
            // return {
            //   loading: false,
            //   error: 'test'
            // };

        }
        case actions.CurrentGameActionTypes.LOAD_GAME_AUTHORS_COMPLETED: {
            if (!action.payload.gameAccess) {
                return state;
            }
            return Object.assign({}, state, {
                me: action.payload.myFullId,
                authors: action.payload.gameAccess.map(authorMapper)
            });

        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return currentGameInitialState;
        }

        default: {
            return state;
        }
    }
}

const authorMapper = (author: any) => {
    author.gameId = parseInt(author.gameId, 10);
    author.timestamp = parseInt(author.timestamp, 10);
    return author;
};
