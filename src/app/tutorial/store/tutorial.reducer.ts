import * as actions from './tutorial.actions';
import {
    initialTutorialState, TutorialState,
} from './tutorial.state';

export function reducers(
    state = initialTutorialState, action: actions.TutorialAction): TutorialState {
    switch (action.type) {
        case actions.TutorialActionTypes.GET_FAQ_GAMES_SUCCESS: {
            if (action.payload.faq) {
                return {
                    faqGames: [action.payload.game, ...state.faqGames.filter(game => game.gameId !== action.payload.game.gameId)],
                    videoGames: state.videoGames,
                    messages: state.messages
                };
            }
            return {
                videoGames: [action.payload.game, ...state.videoGames.filter(game => game.gameId !== action.payload.game.gameId)],
                faqGames: state.faqGames,
                messages: state.messages
            };

        }

        case actions.TutorialActionTypes.GET_GAME: {
            return {
                faqGames: state.faqGames,
                videoGames: state.videoGames,
                messages: []
            };
        }

        case actions.TutorialActionTypes.GET_GAME_SUCCESS: {
            return {
                faqGames: state.faqGames,
                videoGames: state.videoGames,
                messages: action.payload
            };
        }


        default: {
            return state;
        }
    }
}
