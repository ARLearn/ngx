import * as actions from './portal-games.actions';
import {
    portalGamesInitialState, PortalGamesState,
} from './portal-games.state';

export function reducers(
    state = portalGamesInitialState, action: actions.PortalGamesAction): PortalGamesState {
    switch (action.type) {
        case actions.PortalGamesActionTypes.SET_PORTAL_GAMES: {
            return {
                ...portalGamesInitialState,
                portalGames: action.payload,
            };
        }

        case actions.PortalGamesActionTypes.SET_PORTAL_GAME: {
            return {
                ...portalGamesInitialState,
                portalGame: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}