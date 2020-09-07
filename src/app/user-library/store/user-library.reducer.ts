import {createEntityAdapter, EntityState} from "@ngrx/entity";

import {Game} from "../../game-management/store/current-game.state";
import {UserLibraryState} from "./user-library.state";
import * as actions from "./user-library.actions";
import {categoriesAdapter} from "../../portal-management/store/portal-games.reducer";


export interface FeaturedGameState extends EntityState<Game> {
}


export function selectIdentifier(a: Game): number {
    return a.gameId;
}

export const gamesAdapter = createEntityAdapter<Game>(
    {selectId: selectIdentifier}
);

const userLibraryInitialState: UserLibraryState = {
    featuredGames: gamesAdapter.getInitialState(),
    queryGames: [],
};



export function reducers(
    state = userLibraryInitialState, action: actions.UserLibraryActions): UserLibraryState {
    switch (action.type) {
        case actions.UserLibraryActionTypes.GET_FEATURED_RESPONSE: {
            console.log("payload is ", action.payload);
            return Object.assign({}, state, {
                featuredGames: gamesAdapter.upsertMany(action.payload, state.featuredGames),
            });
        }

        case actions.UserLibraryActionTypes.SET_RECENT_GAMES: {
            return Object.assign({}, state, {
                queryGames: action.payload == null ? [] : action.payload,
            });
        }

        default: {
            return state;
        }
    }
}
