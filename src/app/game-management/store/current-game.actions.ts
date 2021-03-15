import {Action} from '@ngrx/store';
import {GameMessageActionTypes} from "../../game-message/store/game-message.actions";
import {Game} from "./current-game.state";

export const CurrentGameActionTypes = {
    GET_CURRENT_GAME_FROM_ROUTER_REQUESTED: '[CurrentGame] Set Current Game from router Requested',
    GET_PUBLIC_GAME_FROM_ROUTER_REQUESTED: '[CurrentGame] Get Public Game from router Requested',
    SET_CURRENT_GAME_REQUESTED: '[CurrentGame] Set Current Game Requested',
    RESET_CURRENT_GAME_REQUESTED: '[CurrentGame] Reset Current Game Requested',
    SET_CURRENT_GAME_COMPLETED: '[CurrentGame] Set Current Game Completed',
    SET_CURRENT_GAME_COMPLETED_NO_AUTHORS: '[CurrentGame] Set Current Game Completed no authors',

    GAME_UPDATE: '[CurrentGame] Update Game Requested',
    GAME_CONFIG_UPDATE: '[CurrentGame] Update Game Config Requested',
    GAME_ENDSTATE_UPDATE: '[CurrentGame] Update Game End State Requested',

    SAVE_GAME_REQUESTED: '[CurrentGame] Save Game Requested',
    SAVE_GAME_COMPLETED: '[CurrentGame] Save Game Completed',

    LOAD_GAME_AUTHORS_REQUESTED: '[CurrentGame] Load Game Authors Requested',
    LOAD_GAME_AUTHORS_COMPLETED: '[CurrentGame] Load Game Authors Completed',

    ADD_GAME_AUTHORS_REQUESTED: '[CurrentGame] Add Game Authors Requested',
    ADD_GAME_AUTHORS_COMPLETED: '[CurrentGame] Add Game Authors Completed',

    REMOVE_GAME_AUTHORS_REQUESTED: '[CurrentGame] Remove Game Authors Requested',

    DOWNLOAD_GAME_REQUESTED: '[CurrentGame] Download Game Requested',
    SET_THEME: '[CurrentGame] Set Theme',
    CURRENT_GAME_ERROR: '[CurrentGame]  Error',

    SET_LOADING: '[CurrentGame]  Set Loading',
};

export class GetCurrentGameFromRouterRequestAction implements Action {
    type = CurrentGameActionTypes.GET_CURRENT_GAME_FROM_ROUTER_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class GetPublicGameFromRouterRequestAction implements Action {
    type = CurrentGameActionTypes.GET_PUBLIC_GAME_FROM_ROUTER_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class SetCurrentGameRequestAction implements Action {
    type = CurrentGameActionTypes.SET_CURRENT_GAME_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class ResetCurrentGameRequestAction implements Action {
    type = CurrentGameActionTypes.RESET_CURRENT_GAME_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class SetCurrentGameCompletedAction implements Action {
    type = CurrentGameActionTypes.SET_CURRENT_GAME_COMPLETED;

    constructor(public payload: any) {
    }
}

export class SetCurrentGameCompletedNoAuthorsAction implements Action {
    type = CurrentGameActionTypes.SET_CURRENT_GAME_COMPLETED_NO_AUTHORS;

    constructor(public payload: any) {
    }
}

export class SaveGameRequestAction implements Action {
    type = CurrentGameActionTypes.SAVE_GAME_REQUESTED;

    constructor(public payload: any) {
    }
}

export class SaveGameCompletedAction implements Action {
    type = CurrentGameActionTypes.SAVE_GAME_COMPLETED;

    constructor(public payload: any) {
    }
}

export class GameUpdateAction implements Action {
    type = CurrentGameActionTypes.GAME_UPDATE;

    constructor(public payload: any) {
    }
}

export class GameConfigUpdateAction implements Action {
    type = CurrentGameActionTypes.GAME_CONFIG_UPDATE;

    constructor(public payload: any) {
    }
}


export class GameEndStateUpdateAction implements Action {
    type = CurrentGameActionTypes.GAME_ENDSTATE_UPDATE;

    constructor(public payload: any) {
    }
}

export class LoadGameAuthorRequestAction implements Action {
    type = CurrentGameActionTypes.LOAD_GAME_AUTHORS_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class LoadGameAuthorCompletedAction implements Action {
    type = CurrentGameActionTypes.LOAD_GAME_AUTHORS_COMPLETED;

    constructor(public payload: any) {
    }
}

export class AddGameAuthorRequestAction implements Action {
    type = CurrentGameActionTypes.ADD_GAME_AUTHORS_REQUESTED;

    constructor(public payload: { fullId: string; role: string }) {
    }
}

export class AddGameAuthorCompletedAction implements Action {
    type = CurrentGameActionTypes.ADD_GAME_AUTHORS_COMPLETED;

    constructor(public payload: any) {
    }
}

export class RemoveGameAuthorRequestAction implements Action {
    type = CurrentGameActionTypes.REMOVE_GAME_AUTHORS_REQUESTED;

    constructor(public payload: { fullId: string }) {
    }
}

export class DownloadGameRequestAction implements Action {
    type = CurrentGameActionTypes.DOWNLOAD_GAME_REQUESTED;

    constructor(public payload: any) {
    }
}

export class SetSelectedThemeAction implements Action {
    type = CurrentGameActionTypes.SET_THEME;

    constructor(public payload: any) {
    }
}

export class CurrentGameErrorAction implements Action {
    type = CurrentGameActionTypes.CURRENT_GAME_ERROR;

    constructor(public payload: any) {
    }
}

export class SetLoadingAction implements Action {
    type = CurrentGameActionTypes.SET_LOADING;

    constructor(public payload: boolean) {
    }
}

export type CurrentGameAction
    = SetCurrentGameRequestAction
    | SetCurrentGameCompletedAction
    | SetCurrentGameCompletedNoAuthorsAction
    | SaveGameRequestAction
    | SaveGameCompletedAction
    | CurrentGameErrorAction
    | SetLoadingAction;
