import * as actions from './tutorial.actions';
import {
    initialTutorialState, TutorialState,
} from './tutorial.state';

export function reducers(
    state = initialTutorialState, action: actions.TutorialAction): TutorialState {
    switch (action.type) {
        case actions.TutorialActionTypes.GET_FAQ_GAMES_SUCCESS: {

            return {
                faqGames: [action.payload, ...state.faqGames]
            };
        }


        default: {
            return state;
        }
    }
}
