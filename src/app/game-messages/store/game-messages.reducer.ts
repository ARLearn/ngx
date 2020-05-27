import * as actions from './game-messages.actions';
import {
    ActionDependency,
    GameMessage,
    gameMessagesInitialState,
    GameMessagesState,
    MultipleChoiceScreen,
    PreviewData,
    PreviewType
} from './game-messages.state';
import {AuthActionTypes} from "../../auth/store/auth.actions";

export function reducers(
    state = gameMessagesInitialState, action: actions.GameMessagesAction): GameMessagesState {
    switch (action.type) {

        case actions.GameMessagesActionTypes.GAME_MESSAGES_REQUESTED: {
            return Object.assign({}, state, {messages: []});
        }

        case actions.GameMessagesActionTypes.GAME_MESSAGES_COMPLETED: {
            if (!action.payload.items) {
                return state;
            } else {
                return Object.assign({}, state, {
                    gameId: action.payload.gameId,
                    // selectedMessage: null,
                    messages: action.payload.items.map(gameMessageMapper)
                });
            }


        }

        case actions.GameMessagesActionTypes.MESSAGE_NEW_COMPLETED: {
            if (state.gameId === action.payload.gameId) {
                state.messages = state.messages.concat([action.payload]);
                return Object.assign({}, state);
            }
            return Object.assign({}, state, {
                gameId: action.payload.gameId,
                selectedMessage: null,
                messages: [action.payload]
            });
        }

        case actions.GameMessagesActionTypes.MESSAGE_SELECT: {
            return Object.assign({}, state, {selectedMessage: action.payload.id});
        }

        case actions.GameMessagesActionTypes.TARGET_MESSAGE_SELECT: {
            return Object.assign({}, state, {targetMessage: action.payload.id});
        }

        case actions.GameMessagesActionTypes.TOGGLE_EDIT_MODE: {
            return Object.assign({}, state, {editMode: action.payload.mode});
        }

        case actions.GameMessagesActionTypes.MESSAGE_SAVE_COMPLETED: {
            if (state.gameId === action.payload.gameId) {
                return Object.assign(
                    {}, state,
                    {
                        selectedMessage: null,
                        selectedPreview: PreviewType.NONE,
                        gameId: action.payload.gameId,
                        messages: state.messages.map(message =>
                            message.id !== action.payload.id ? message : action.payload)
                    });
            }
            return Object.assign({}, state, {
                gameId: action.payload.gameId,
                selectedMessage: null,
                messages: []
            });
        }

        case actions.GameMessagesActionTypes.SET_PREVIEW_TYPE: {
            const preview: PreviewData = {
                selectedPreview: action.payload.preview
            };
            if (action.payload.data) {
                preview.data = action.payload.data;
            }
            return Object.assign({}, state, {preview: preview});
        }

        case actions.GameMessagesActionTypes.MESSAGES_DELETE_COMPLETED: {
            if (state.gameId === action.payload.gameId) {
                return Object.assign(
                    {}, state,
                    {
                        gameId: action.payload.gameId, editMode: 0,
                        selectedMessage: null,
                        messages: state.messages.filter(message => message.id !== action.payload.id)
                    }
                )
                    ;
            }
            return Object.assign({}, state, {
                gameId: action.payload.gameId,
                selectedMessage: null,
                messages: []
            });
        }

        case actions.GameMessagesActionTypes.SETFILTER: {
            return Object.assign({}, state, {filter: action.payload.filters});
        }

        case actions.GameMessagesActionTypes.GAME_MESSAGES_ERROR: {

            return state;
        }
        case AuthActionTypes.LOGOUT_REQUESTED : {
            return gameMessagesInitialState;
        }

        default: {
            return state;
        }
    }
}


export const gameMessageMapper = (gameMessage: MultipleChoiceScreen) => {
    if (gameMessage.id) {
        gameMessage.id = parseInt('' + gameMessage.id, 10);
    }
    if (gameMessage.gameId) {
        gameMessage.gameId = parseInt('' + gameMessage.gameId, 10);
    }
    if (gameMessage.dependsOn && (<ActionDependency>gameMessage.dependsOn).generalItemId) {
        (<ActionDependency>gameMessage.dependsOn).generalItemId = parseInt('' + (<ActionDependency>gameMessage.dependsOn).generalItemId, 10);
    }
    if (!gameMessage.showFeedback) {
        gameMessage.showFeedback = false;
    }
    if (
        gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest'
        || gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest'
        || gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest'
        || gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest'
    ) {
        if (!gameMessage['answers']) {
            gameMessage['answers'] = [];
        }
    }
    return gameMessage;
};
