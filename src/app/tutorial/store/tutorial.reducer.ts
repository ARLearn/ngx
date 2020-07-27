import * as actions from './tutorial.actions';
import {
    initialTutorialState, TutorialState,
} from './tutorial.state';

export function reducers(
    state = initialTutorialState, action: actions.TutorialAction): TutorialState {
    switch (action.type) {
        case actions.TutorialActionTypes.GET_FAQ_GAMES_SUCCESS: {
            return {
                faqGames: [action.payload, ...state.faqGames.filter(game => game.gameId != action.payload.gameId)],
                messages: state.messages
            };
        }

        case actions.TutorialActionTypes.GET_GAME: {
            return {
                faqGames: state.faqGames,
                messages: []
            };
        }

        case actions.TutorialActionTypes.GET_GAME_SUCCESS: {
            return {
                faqGames: state.faqGames,
                messages: action.payload
            };
        }


        default: {
            return state;
        }
    }
}
