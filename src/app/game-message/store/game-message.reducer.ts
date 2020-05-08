import * as actions from './game-message.actions';
import {gameMessageInitialState, GameMessageState} from './game-message.state';
import {GameMessage, MultipleChoiceScreen} from "../../game-messages/store/game-messages.state";
import {gameMessageMapper} from "../../game-messages/store/game-messages.reducer";
import {GameMessagesActionTypes} from "../../game-messages/store/game-messages.actions";
import {AuthActionTypes} from "../../auth/store/auth.actions";

export function reducers(
    state = gameMessageInitialState, action: actions.GameMessageAction): GameMessageState {
    switch (action.type) {

        case actions.GameMessageActionTypes.GAME_MESSAGE_EDIT_COMPLETED: {
            return Object.assign({}, state, {editMessage: gameMessageMapper(action.payload)});
        }

        case actions.GameMessageActionTypes.RESET_GAME_MESSAGE_EDIT: {
            return Object.assign({}, state, {editMessage: null});
        }

        case GameMessagesActionTypes.MESSAGE_SAVE_COMPLETED: {
            return Object.assign({}, state, {editMessage: null});
        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_SET_PREVIEW: {
            return Object.assign({}, state, {previewScreen: action.payload});
        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_UPDATE: {
            state.editMessage = Object.assign({}, state.editMessage || {}, action.payload);

            return Object.assign({}, state);
        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_UPDATE_ADD_ANSWER: {
            const editMessage = <MultipleChoiceScreen>Object.assign({}, state.editMessage || {});
            if (!editMessage.answers) {
                editMessage.answers = [];
            }
            editMessage.answers.push({
                "type": action.payload.type,
                "answer": "",
                "feedback": "",
                "id": makeid(5),
                "isCorrect": false
            });
            state.editMessage = editMessage;
            return Object.assign({}, state);
        }
        case actions.GameMessageActionTypes.GAME_MESSAGE_UPDATE_UPDATE_FILE_REF: {
            if (!state.editMessage.fileReferences) {
                state.editMessage.fileReferences = {};
            }
            if (action.payload.delete) {
                delete state.editMessage.fileReferences[action.payload.key];
            } else {
                state.editMessage.fileReferences[action.payload.key] = action.payload.value;
            }
            state.editMessage.fileReferences = Object.assign({}, state.editMessage.fileReferences);

            return Object.assign({}, state);

        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_UPDATE_ANSWER: {
            const editMessage = <MultipleChoiceScreen>Object.assign({}, state.editMessage || {});
            if (!editMessage.answers) {
                editMessage.answers = [];
            }
            if (action.payload.delete) {
                editMessage.answers.splice(editMessage.answers.findIndex(e => e.id === action.payload.id), 1);

                // console.log(state.editMessage.answers);
            } else {
                const selectedAnswer = editMessage.answers.filter(idFilter(action.payload.id))[0];
                if (editMessage.type === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest' || editMessage.type === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest') {
                    console.log("in single choice");
                    if (action.payload.value === true && action.payload.field === 'isCorrect') {
                        editMessage.answers = editMessage.answers.map(entry => {
                            entry.isCorrect = false;
                            return entry;
                        });
                    }
                }
                selectedAnswer[action.payload.field] = action.payload.value;
            }
            state.editMessage = editMessage;
            return Object.assign({}, state);
        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_UPDATE_DEPENDENCY_ANSWER: {
            state.editMessage = <GameMessage>Object.assign({}, state.editMessage || {});
            if (action.payload.delete) {
                delete state.editMessage.dependsOn;
            } else {
                state.editMessage.dependsOn = {
                    type: "org.celstec.arlearn2.beans.dependencies.ActionDependency",
                    action: action.payload.action,
                    generalItemId: action.payload.id,
                };
            }

            return Object.assign({}, state);
        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_REMOVE_LOCATION: {
            delete state.editMessage.lat;
            delete state.editMessage.lng;

            return Object.assign({}, state);
        }

        case actions.GameMessageActionTypes.GAME_MESSAGE_REMOVE_COLOR: {
            delete state.editMessage.primaryColor;
            state.editMessage = Object.assign({}, state.editMessage);
            return Object.assign({}, state);
        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return gameMessageInitialState;
        }

        default: {
            return state;
        }
    }
}

const idFilter = (id) => {
    return (answer: any) => answer.id === id;
};

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
