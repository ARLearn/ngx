import {Action} from '@ngrx/store';
import {PortalGame} from './portal-games.state';
import {Game} from "../../game-management/store/current-game.state";

export const PortalGamesActionTypes = {
    GET_PORTAL_GAMES: '[PortalGames] Get portal games',
    SET_PORTAL_GAMES: '[PortalGames] Set portal games',


    SEARCH_PORTAL_GAMES: '[PortalGames] Search portal games',
    SEARCH_PORTAL_GAMES_SUCCESS: '[PortalGames] Search portal games success',


    GET_PORTAL_GAME: '[PortalGame] Get portal game',
    SET_PORTAL_GAME: '[PortalGame] Set portal game',
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

export type PortalGamesAction =
    GetPortalGamesRequestAction
    | SetPortalGamesAction
    | GetPortalGameRequestAction
    | SetPortalGameAction;
