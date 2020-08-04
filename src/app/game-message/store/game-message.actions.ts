import {Action} from '@ngrx/store';
import {GameMessage} from '../../game-messages/store/game-messages.state';

export const GameMessageActionTypes = {


    GAME_MESSAGE_EDIT: '[GameMessage] Edit message',
    // GIVEN_GAME_MESSAGE_EDIT: '[GameMessage] Edit given message',
    RESET_GAME_MESSAGE_EDIT: '[GameMessage] Reset Edit message',
    GAME_MESSAGE_SET_PREVIEW: '[GameMessage] Set preview',
    GAME_MESSAGE_UPDATE: '[GameMessage] Update edit message',
    GAME_MESSAGE_UPDATE_ADD_ANSWER: '[GameMessage] Update edit message add answer',
    GAME_MESSAGE_UPDATE_ANSWER: '[GameMessage] Update edit message update answer',
    GAME_MESSAGE_UPDATE_UPDATE_FILE_REF: '[GameMessage] Update file reference',
    GAME_MESSAGE_UPDATE_DEPENDENCY_ANSWER: '[GameMessage] Update edit message update dependency',
    GAME_MESSAGE_REMOVE_LOCATION: '[GameMessage] Remove location',
    GAME_MESSAGE_REMOVE_COLOR: '[GameMessage] Remove color',
    GAME_MESSAGE_SAVE: '[GameMessage] Update save message',
    GAME_MESSAGE_DIRECT_SAVE: '[GameMessage] Save included message',
    GAME_MESSAGE_EDIT_COMPLETED: '[GameMessage] Edit message completed',

};

export class GameMessageEditAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_EDIT;

    constructor(public payload = null) {
    }
}

// export class GivenGameMessageEditAction implements Action {
//     type = GameMessageActionTypes.GIVEN_GAME_MESSAGE_EDIT;
//
//     constructor(public payload = null) {
//     }
// }

export class ResetGameMessageEditAction implements Action {
    type = GameMessageActionTypes.RESET_GAME_MESSAGE_EDIT;

    constructor(public payload = null) {
    }
}

export class GameMessageSetPreview implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_SET_PREVIEW;

    constructor(public payload: { ptype: string; data: any }) {
    }
}

export class GameMessageUpdateAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_UPDATE;

    constructor(public payload: any) {
    }
}

export class GameMessageAddAnswerAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_UPDATE_ADD_ANSWER;

    constructor(public payload: any) {
    }
}

export class GameMessageUpdateAnswerAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_UPDATE_ANSWER;

    constructor(public payload: {
        delete: boolean;
        id: string;
        field?: string;
        value?: any;
    }) {
    }
}

export class GameMessageUpdateFileReferenceAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_UPDATE_UPDATE_FILE_REF;

    constructor(public payload: {
        delete: boolean;
        key: string;
        value?: string;

    }) {
    }
}


export class GameMessageUpdateDependencyAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_UPDATE_DEPENDENCY_ANSWER;

    constructor(public payload: {
        delete: boolean;
        id?: string;
        action?: string;
    }) {
    }
}


export class RemoveLocationAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_REMOVE_LOCATION;

    constructor(public payload: any = null) {
    }
}

export class RemoveColorAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_REMOVE_COLOR;

    constructor(public payload: any = null) {
    }
}

export class GameMessageSaveAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_SAVE;

    constructor(public payload: any = null) {
    }
}

export class GameMessageDirectSaveAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_DIRECT_SAVE;

    constructor(public payload: GameMessage) {
        console.log("direct save");
    }
}


export class GameMessageEditCompletedAction implements Action {
    type = GameMessageActionTypes.GAME_MESSAGE_EDIT_COMPLETED;

    constructor(public payload: GameMessage) {
    }
}

export type GameMessageAction
    = GameMessageEditAction
    | GameMessageAddAnswerAction
    | GameMessageUpdateDependencyAction
    | GameMessageUpdateAnswerAction
    | GameMessageSaveAction
    | GameMessageEditCompletedAction
    | RemoveLocationAction
    ;
