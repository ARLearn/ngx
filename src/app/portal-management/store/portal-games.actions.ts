import {Action} from '@ngrx/store';
import {Category, PortalGame} from './portal-games.state';
import {Game} from "../../game-management/store/current-game.state";

export const PortalGamesActionTypes = {
    GET_PORTAL_GAMES: '[PortalGames] Get portal games',
    SET_PORTAL_GAMES: '[PortalGames] Set portal games',

    GET_CATEGORIES: '[PortalGames] Get categories',
    SET_CATEGORIES: '[PortalGames] Set categories',

    SEARCH_PORTAL_GAMES: '[PortalGames] Search portal games',
    SEARCH_PORTAL_GAMES_SUCCESS: '[PortalGames] Search portal games success',


    GET_PORTAL_GAME: '[PortalGame] Get portal game',
    SET_PORTAL_GAME: '[PortalGame] Set portal game',

    SET_PORTAL_GAME_CATEGORY_REQUEST: '[PortalGame] Set portal game category request',
    SET_PORTAL_GAME_CATEGORY_RESPONSE: '[PortalGame] Set portal game category response',

    SET_FEATURED_REQUEST: '[PortalGame] Set featured request',
    SET_FEATURED_RESPONSE: '[PortalGame] Set featured response',
};

export class GetPortalGamesRequestAction implements Action {
    type = PortalGamesActionTypes.GET_PORTAL_GAMES;

    constructor(public payload = null) {
    }
}

export class SetPortalGamesAction implements Action {
    type = PortalGamesActionTypes.SET_PORTAL_GAMES;

    constructor(public payload: Game[]) {
    }
}

export class GetCategoriesRequestAction implements Action {
    type = PortalGamesActionTypes.GET_CATEGORIES;

    constructor(public payload = null) {
    }
}

export class SetCategoriesAction implements Action {
    type = PortalGamesActionTypes.SET_CATEGORIES;

    constructor(public payload: Category[]) {
    }
}

export class SearchPortalGamesRequestAction implements Action {
    type = PortalGamesActionTypes.SEARCH_PORTAL_GAMES;

    constructor(public payload: string) {
    }
}


export class GetPortalGameRequestAction implements Action {
    type = PortalGamesActionTypes.GET_PORTAL_GAME;

    constructor(public payload: number = null) {
    }
}

export class SetPortalGameAction implements Action {
    type = PortalGamesActionTypes.SET_PORTAL_GAME;

    constructor(public payload: PortalGame) {
    }
}

export class SetPortalGameCategoryRequest implements Action {
    type = PortalGamesActionTypes.SET_PORTAL_GAME_CATEGORY_REQUEST;

    constructor(public payload: { gameId: number, categoryId: number }) {
    }
}

export class SetPortalGameCategoryResponse implements Action {
    type = PortalGamesActionTypes.SET_PORTAL_GAME_CATEGORY_RESPONSE;

    constructor(public payload: any) {
    }
}


export class SetFeaturedRequest implements Action {
    type = PortalGamesActionTypes.SET_FEATURED_REQUEST;

    constructor(public payload: { gameId: number, value:boolean}) {
    }
}

export class SetFeaturedResponse implements Action {
    type = PortalGamesActionTypes.SET_FEATURED_RESPONSE;

    constructor(public payload: any) {
    }
}


export type PortalGamesAction =
    GetPortalGamesRequestAction
    | SetPortalGamesAction
    | GetPortalGameRequestAction
    | SetPortalGameAction
    | SetFeaturedResponse
    | SetPortalGameCategoryResponse;
