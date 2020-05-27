import {Action} from '@ngrx/store';
import {GameMessage} from '../../game-messages/store/game-messages.state';
import {GameMessagesActionTypes} from "../../game-messages/store/game-messages.actions";
import {Game} from "../../game-management/store/current-game.state";

export const GameActionTypes = {
    GET_GAME_LIST_REQUESTED: '[Games] Get Requested',
    GET_GAME_CURSOR_LIST_REQUESTED: '[Games] Get Cursor Requested',
    GET_GAME_LIST_COMPLETED: '[Games] Get Completed',

    CREATE_GAME_REQUESTED: '[Games] Create Game Requested',
    CREATE_GAME_COMPLETED: '[Games] Create Game Completed',

    CLONE_GAME_REQUESTED: '[Games] Clone Game Requested',

    DELETE_GAME_REQUESTED: '[Games] Delete Game Requested',
    DELETE_GAME_COMPLETED: '[Games] Delete Game Completed',

    IMPORT_GAME_REQUESTED: '[Games] Import Game Requested',
    IMPORT_GAME_COMPLETED: '[Games] Import Game Completed',

    IMPORT_GAME_MESSAGES_REQUESTED: '[Games] Import Game Messages Requested',
    IMPORT_GAME_MESSAGES_COMPLETED: '[Games] Import Game Messages Completed',

    SET_GAMES_FILTER: '[Games] Set message filter',

};

export class GetGameListRequestAction implements Action {
    type = GameActionTypes.GET_GAME_LIST_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class GetGameCursorListRequestAction implements Action {
    type = GameActionTypes.GET_GAME_CURSOR_LIST_REQUESTED;

    constructor(public payload: { cursor: string } = null) {
    }
}

export class GetGameListCompletedAction implements Action {
    type = GameActionTypes.GET_GAME_LIST_COMPLETED;

    constructor(public payload: any) {
    }
}

export class CreateGameRequestAction implements Action {
    type = GameActionTypes.CREATE_GAME_REQUESTED;

    constructor(public payload: Game) {
    }
}

export class CreateGameCompletedAction implements Action {
    type = GameActionTypes.CREATE_GAME_COMPLETED;

    constructor(public payload: any) {
    }
}

export class CloneGameRequestAction implements Action {
    type = GameActionTypes.CLONE_GAME_REQUESTED;

    constructor(public payload: { gameId?: number }) {
    }
}

export class DeleteGameRequestAction implements Action {
    type = GameActionTypes.DELETE_GAME_REQUESTED;

    constructor(public payload: { gameId?: number }) {
    }
}

export class DeleteGameCompletedAction implements Action {
    type = GameActionTypes.DELETE_GAME_COMPLETED;

    constructor(public payload: any) {
    }
}


export class ImportGameRequestAction implements Action {
    type = GameActionTypes.IMPORT_GAME_REQUESTED;

    constructor(public payload: any) {
    }
}

export class ImportGameCompletedAction implements Action {
    type = GameActionTypes.IMPORT_GAME_COMPLETED;

    constructor(public payload: any) {
    }
}


export class ImportGameMessagesRequestAction implements Action {
    type = GameActionTypes.IMPORT_GAME_MESSAGES_REQUESTED;

    constructor(public payload: any) {
    }
}

export class ImportGameMessagesCompletedAction implements Action {
    type = GameActionTypes.IMPORT_GAME_MESSAGES_COMPLETED;

    constructor(public payload: any) {
    }
}

export class SetGamesFilterAction implements Action {
    type = GameActionTypes.SET_GAMES_FILTER;

    constructor(public payload: { filters: string[] } = {filters: []}) {
    }

    setFilter(filter: string[]) {
        this.payload.filters = filter;
    }
}

export type GameAction
    = GetGameListRequestAction
    | GetGameCursorListRequestAction
    | GetGameListCompletedAction
    | CreateGameRequestAction
    | CreateGameCompletedAction
    | DeleteGameRequestAction
    | DeleteGameCompletedAction
    | ImportGameRequestAction
    | ImportGameCompletedAction
    | ImportGameMessagesRequestAction
    | ImportGameMessagesCompletedAction
    | SetGamesFilterAction
    ;
