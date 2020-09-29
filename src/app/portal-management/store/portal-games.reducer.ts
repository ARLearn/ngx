import * as actions from './portal-games.actions';
import {
    Category,
    PortalGamesState,
} from './portal-games.state';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/game-messages.state";


export interface OnlyGameState extends EntityState<Game> {
}

export interface CategoryState extends EntityState<Category> {
}

export function selectIdentifier(a: Game): number {
    return a.gameId;
}

export function selectCategoryIdentifier(a: Category): number {
    return a.categoryId;
}

export const gamesAdapter = createEntityAdapter<Game>(
    {selectId: selectIdentifier}
);

export const categoriesAdapter = createEntityAdapter<Category>(
    {selectId: selectCategoryIdentifier}
);

const portalGamesInitialState: PortalGamesState = {
    queryGames: [],
    portalGames: gamesAdapter.getInitialState(),
    categories: categoriesAdapter.getInitialState(),
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

        case actions.PortalGamesActionTypes.SET_CATEGORIES: {
            return Object.assign({}, state, {
                categories: categoriesAdapter.upsertMany(action.payload, state.categories),
            });
        }

        case actions.PortalGamesActionTypes.SET_PORTAL_GAMES: {
            return Object.assign({}, state, {
                queryGames: action.payload == null ? [] : action.payload,
            });
        }

        case actions.PortalGamesActionTypes.SET_FEATURED_RESPONSE: {
            const id = action.payload[1];
            const entity = state.portalGames.entities[id];

            console.log('FROM_SET_FEATURED', action.payload, state.portalGames.entities[id], { ...entity, featured: !!action.payload[0] });



            return Object.assign({}, state, {
                portalGames: gamesAdapter.updateOne({ id: entity.gameId, changes: { featured: !!action.payload[0] } as any }, state.portalGames),
                portalGame: { ...state.portalGame, featured: !!action.payload[0] }
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
