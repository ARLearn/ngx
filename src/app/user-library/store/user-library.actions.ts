import {Action} from "@ngrx/store";
import {Game} from "../../game-management/store/current-game.state";


export const UserLibraryActionTypes = {
    GET_FEATURED_REQUEST: '[UserLibrary] Get featured games',
    GET_FEATURED_RESPONSE: '[UserLibrary] Set featured games',

    GET_RECENT_GAMES: '[UserLibrary] Get recent games',
    SET_RECENT_GAMES: '[UserLibrary] Set recent games',
};

export class GetFeaturedGames implements Action {
    type = UserLibraryActionTypes.GET_FEATURED_REQUEST;

    constructor(public payload = null) {
    }
}

export class SetFeaturedGames implements Action {
    type = UserLibraryActionTypes.GET_FEATURED_RESPONSE;

    constructor(public payload: Game[]) {
    }
}

export class GetRecentGamesRequestAction implements Action {
    type = UserLibraryActionTypes.GET_RECENT_GAMES;

    constructor(public payload = null) {
    }
}

export class SetRecentGamesAction implements Action {
    type = UserLibraryActionTypes.SET_RECENT_GAMES;

    constructor(public payload: Game[]) {
    }
}
export type UserLibraryActions =
    GetFeaturedGames
    | SetFeaturedGames

    |GetRecentGamesRequestAction
    |SetRecentGamesAction;
