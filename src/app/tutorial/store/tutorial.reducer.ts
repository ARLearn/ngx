import * as actions from './tutorial.actions';
import {
    initialTutorialState, TutorialState,
} from './tutorial.state';

export function reducers(
    state = initialTutorialState, action: actions.TutorialAction): TutorialState {
    switch (action.type) {
        case actions.TutorialActionTypes.GET_FAQ_GAMES_SUCCESS: {
            //todo: this is not entirely correct... filter out doubles...

            return {
                faqGames: [action.payload, ...state.faqGames],
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
