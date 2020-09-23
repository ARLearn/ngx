import {Action} from '@ngrx/store';
import {GameRun} from './game-runs.state';
import {PendingPlayer} from '../../player-management/store/player.state';

export const GameRunsActionTypes = {

    GET_CURRENT_RUN_FROM_ROUTER_REQUESTED: '[GameRuns] Set Current Run from router Requested',
    SET_CURRENT_RUN_COMPLETED: '[GameRuns] Set Current Run Completed',

    GAME_RUNS_REQUESTED: '[GameRuns] Get runs requested',
    GAME_RUNS_COMPLETED: '[GameRuns] Get runs Completed',
    GAME_RUNS_CURSOR_REQUEST: '[GameRuns] Get runs Cursor Request',

    CREATE_RUN_REQUESTED: '[GameRuns] Create run requested',
    CREATE_RUN_COMPLETED: '[GameRuns] Create run Completed',

    DELETE_RUN_REQUESTED: '[GameRuns] Delete run requested',
    DELETE_RUN_COMPLETED: '[GameRuns] Delete run Completed',

    ADD_USER_TO_RUN_REQUESTED: '[GameRuns] Add user to run Requested',
    ADD_USER_TO_RUN_COMPLETED: '[GameRuns] Add user to run Completed',

    DELETE_USER_FROM_RUN_REQUESTED: '[GameRuns] Delete user from run Requested',
    DELETE_USER_FROM_RUN_COMPLETED: '[GameRuns] Delete user from run Completed',

    LOAD_RUN_USERS_REQUESTED: '[GameRuns] Load run users Requested',
    LOAD_RUN_USERS_COMPLETED: '[GameRuns] Load run users Completed',

    GAME_RUN_COLLABORATORS_REQUESTED: '[GameRuns] Get collaborators Requested',
    GAME_RUN_COLLABORATORS_COMPLETED: '[GameRuns] Get collaborators Completed',

    GRANT_COLLABORATOR_ACCESS: '[GameRuns] Grant collaborator access',
    REVOKE_COLLABORATOR_ACCESS: '[GameRuns] Revoke collaborator access',


    RUN_UPDATE: '[GameRuns] update run',
    RUN_SAVE: '[GameRuns] update save message',
    RUN_SAVE_RESPONSE: '[GameRuns] update save message response',

    SELECT_RUN: '[GameRuns] Select run',

    // GAME_RUNS_ERROR: '[GameRuns]  Error'
};


export class RunUpdateAction implements Action {
    type = GameRunsActionTypes.RUN_UPDATE;

    constructor(public payload: any) {
    }
}

export class RunSaveAction implements Action {
    type = GameRunsActionTypes.RUN_SAVE;

    constructor(public payload = null) {
    }
}

export class RunSaveResponseAction implements Action {
    type = GameRunsActionTypes.RUN_SAVE_RESPONSE;

    constructor(public payload: any) {
    }
}

export class GetCurrentRunFromRouterRequestAction implements Action {
    type = GameRunsActionTypes.GET_CURRENT_RUN_FROM_ROUTER_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class SetCurrentRunCompleteAction implements Action {
    type = GameRunsActionTypes.SET_CURRENT_RUN_COMPLETED;

    constructor(public payload: any = null) {
    }
}

export class GetGameRunsRequestAction implements Action {
    type = GameRunsActionTypes.GAME_RUNS_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class GetGameRunsCompletedAction implements Action {
    type = GameRunsActionTypes.GAME_RUNS_COMPLETED;

    constructor(public payload: any) {
    }
}

export class GetGameRunsCursorListRequestionAction implements Action {
    type = GameRunsActionTypes.GAME_RUNS_CURSOR_REQUEST;

    constructor(public payload: { gameId: string; cursor: string } = null) {
    }
}


export class CreateRunRequestAction implements Action {
    type = GameRunsActionTypes.CREATE_RUN_REQUESTED;

    constructor(public payload: {
        title: string;
    }) {
    }
}

export class CreateRunCompletedAction implements Action {
    type = GameRunsActionTypes.CREATE_RUN_COMPLETED;

    constructor(public payload: any) {
    }
}

export class DeleteRunRequestAction implements Action {
    type = GameRunsActionTypes.DELETE_RUN_REQUESTED;

    constructor(public payload: GameRun) {
    }
}

export class DeleteRunCompletedAction implements Action {
    type = GameRunsActionTypes.DELETE_RUN_COMPLETED;

    constructor(public payload: any = null) {
    }
}

export class SelectRunAction implements Action {
    type = GameRunsActionTypes.SELECT_RUN;

    constructor(public payload: any) {
    }
}


export class AddUserToRunRequestAction implements Action {
    type = GameRunsActionTypes.ADD_USER_TO_RUN_REQUESTED;

    constructor(public payload: {
        fullId: string;
    }) {
    }
}

export class AddUserToRunCompletedAction implements Action {
    type = GameRunsActionTypes.ADD_USER_TO_RUN_COMPLETED;

    constructor(public payload: any) {
    }
}

export class DeleteUserFromRunRequestAction implements Action {
    type = GameRunsActionTypes.DELETE_USER_FROM_RUN_REQUESTED;

    constructor(public payload: PendingPlayer) {
    }
}

export class DeleteUserFromRunCompletedAction implements Action {
    type = GameRunsActionTypes.DELETE_USER_FROM_RUN_COMPLETED;

    constructor(public payload: number) {
    }
}


export class LoadRunUsersRequestAction implements Action {
    type = GameRunsActionTypes.LOAD_RUN_USERS_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class LoadRunUsersCompletedAction implements Action {
    type = GameRunsActionTypes.LOAD_RUN_USERS_COMPLETED;

    constructor(public payload: any) {
    }
}

export class GameRunCollaboratorsRequestAction implements Action {
    type = GameRunsActionTypes.GAME_RUN_COLLABORATORS_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class GameRunCollaboratorsCompletedAction implements Action {
    type = GameRunsActionTypes.GAME_RUN_COLLABORATORS_COMPLETED;

    constructor(public payload: any) {
    }
}

export class GrantCollaboratorAccessAction implements Action {
    type = GameRunsActionTypes.GRANT_COLLABORATOR_ACCESS;

    constructor(public payload: any) {
    }
}

export class RevokeCollaboratorAccessAction implements Action {
    type = GameRunsActionTypes.REVOKE_COLLABORATOR_ACCESS;

    constructor(public payload: any) {
    }
}

export type GameRunsAction
    = GetCurrentRunFromRouterRequestAction
    | SetCurrentRunCompleteAction
    | GetGameRunsRequestAction
    | GetGameRunsCompletedAction
    | CreateRunCompletedAction
    | DeleteRunRequestAction
    | AddUserToRunRequestAction
    | AddUserToRunCompletedAction
    | DeleteUserFromRunRequestAction
    | DeleteUserFromRunCompletedAction
    | LoadRunUsersRequestAction
    | LoadRunUsersCompletedAction
    | SelectRunAction
    | GameRunCollaboratorsRequestAction
    | GameRunCollaboratorsCompletedAction
    | GrantCollaboratorAccessAction
    | RevokeCollaboratorAccessAction;
// | GetGameRunsErrorAction;
