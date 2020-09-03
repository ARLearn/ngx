import {Action} from "@ngrx/store";
import {Game} from "../../game-management/store/current-game.state";


export const UserLibraryActionTypes = {
    GET_FEATURED_REQUEST: '[UserLibrary] Get featured games',
    GET_FEATURED_RESPONSE: '[UserLibrary] Set featured games',
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

export type UserLibraryActions =
    GetFeaturedGames
    | SetFeaturedGames;
