import * as actions from './portal-games.actions';
import {
    PortalGamesState,
} from './portal-games.state';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/game-messages.state";


export interface OnlyGameState extends EntityState<Game> {
}

export function selectIdentifier(a: Game): number {
    return a.gameId;
}

export const gamesAdapter = createEntityAdapter<Game>(
    {selectId: selectIdentifier}
);
const portalGamesInitialState: PortalGamesState = {
    queryGames: [],
    portalGames: gamesAdapter.getInitialState(),
    portalGame: null,
};

export function reducers(
    state = portalGamesInitialState, action: actions.PortalGamesAction): PortalGamesState {
    switch (action.type) {
        case actions.PortalGamesActionTypes.SET_PORTAL_GAME: {
            action.payload.icon = '1'; //todo, make dynamic
            return Object.assign({}, state, {

                portalGames: gamesAdapter.upsertOne(action.payload, state.portalGames),
            });
        }

        case actions.PortalGamesActionTypes.SET_PORTAL_GAMES: {
            return Object.assign({}, state, {
                queryGames: action.payload == null ? [] : action.payload,
            });
        }

        // case actions.PortalGamesActionTypes.SET_PORTAL_GAME: {
        //     return {
        //         ...portalGamesInitialState,
        //         portalGame: action.payload,
        //     };
        // }

        default: {
            return state;
        }
    }
}
