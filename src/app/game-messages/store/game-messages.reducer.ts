import * as actions from './game-messages.actions';
import {
    ActionDependency,
    GameMessage,
    GameMessagesState,
    MultipleChoiceScreen,
    PreviewData,
    PreviewType
} from './game-messages.state';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {AuthActionTypes} from "../../auth/store/auth.actions";

export interface OnlyMessagesState extends EntityState<GameMessage> {
}
export function selectIdentifier(a: GameMessage): number {
    return a.id;
}
export const messagesAdapter = createEntityAdapter<GameMessage>(
    {selectId: selectIdentifier}
);


export const gameMessagesInitialState: GameMessagesState = {
    gameId: null,
    selectedMessage: null,
    filter: [],
    editMode: 1,
    messages: messagesAdapter.getInitialState(),
    previewMessage: null,
    selectedScreen: null,
    loading: false,
};

export function reducers(
    state = gameMessagesInitialState, action: actions.GameMessagesAction): GameMessagesState {
    switch (action.type) {

        case actions.GameMessagesActionTypes.GAME_MESSAGES_REQUESTED: {
            // console.log('gameId', state.gameId, action.payload.gameId);
            // if (state.gameId == null || state.gameId !== action.payload.gameId) {
            //     return Object.assign({}, state, {messages: messagesAdapter.getInitialState()});
            // }
            return state;

            // return Object.assign({}, state, {messages: []});
        }

        case actions.GameMessagesActionTypes.SET_LOADING: {
            return {...state, loading: action.payload};

            // return Object.assign({}, state, {messages: []});
        }

        case actions.GameMessagesActionTypes.GAME_MESSAGES_COMPLETED: {
            if (!action.payload.items) {
                return {...state, loading: false};
            } else {
                console.log("state was", state.messages);
                return Object.assign({}, state, {
                    gameId: action.payload.gameId,
                    // selectedMessage: null,
                    messages: messagesAdapter.addMany(action.payload.items, state.messages),
                    loading: false,
                });


                // return Object.assign({}, state, {
                //     gameId: action.payload.gameId,
                //     // selectedMessage: null,
                //     messages: action.payload.items.map(gameMessageMapper)
                // });
            }


        }

        case actions.GameMessagesActionTypes.MESSAGE_NEW_COMPLETED: {
            // console.log("message new completed", action);
            // if (state.gameId === action.payload.gameId) {
            //     state.messages = state.messages.concat([action.payload]);
            //     return Object.assign({}, state);
            // }
            // return Object.assign({}, state, {
            //     gameId: action.payload.gameId,
            //     selectedMessage: null,
            //     messages: [action.payload]
            // });
            return Object.assign({}, state, {
                messages: messagesAdapter.upsertOne(action.payload, state.messages),
                loading: false,
            });
        }

        case actions.GameMessagesActionTypes.MESSAGES_DELETE_COMPLETED: {
            return Object.assign({}, state, {
                messages: messagesAdapter.removeOne(action.payload.id, state.messages)
            });
        }


        case actions.GameMessagesActionTypes.MESSAGE_SELECT: {
            return Object.assign({}, state, {
                selectedMessage: action.payload.id,
                previewMessage: action.payload.id,
            });
        }

        case actions.GameMessagesActionTypes.TARGET_MESSAGE_SELECT: {
            return Object.assign({}, state, {targetMessage: action.payload.id});
        }

        // case actions.GameMessagesActionTypes.TOGGLE_EDIT_MODE: {
        //     return Object.assign({}, state, {editMode: action.payload.mode});
        // }

        case actions.GameMessagesActionTypes.MESSAGE_SAVE_COMPLETED: {
            console.log("message save completed", action);
            // if (state.gameId === action.payload.gameId) {
            //     return Object.assign(
            //         {}, state,
            //         {
            //             selectedMessage: null,
            //             selectedPreview: PreviewType.NONE,
            //             gameId: action.payload.gameId,
            //             messages: state.messages.map(message =>
            //                 message.id !== action.payload.id ? message : action.payload)
            //         });
            // }
            // return Object.assign({}, state, {
            //     gameId: action.payload.gameId,
            //     selectedMessage: null,
            //     messages: []
            // });
            return Object.assign({}, state, {
                messages: messagesAdapter.upsertOne(action.payload, state.messages)
            });
        }
        //
        case actions.GameMessagesActionTypes.SET_PREVIEW_TYPE: {
            const preview: PreviewData = {
                selectedPreview: action.payload.preview
            };
            if (action.payload.data) {
                preview.data = action.payload.data;
            }
            return Object.assign({}, state, {preview: preview});
        }
        //
        case actions.GameMessagesActionTypes.SET_PREVIEW_MESSAGE: {
            return Object.assign({}, state, {previewMessage: action.payload});
        }
        //


        case actions.GameMessagesActionTypes.SETFILTER: {
            return Object.assign({}, state, {filter: action.payload.filters});
        }

        case actions.GameMessagesActionTypes.SET_SELECTED_SCREEN: {
            return Object.assign({}, state, {selectedScreen: action.payload});
        }

        case actions.GameMessagesActionTypes.RESET: {
            return gameMessagesInitialState;
        }
        //
        // case actions.GameMessagesActionTypes.GAME_MESSAGES_ERROR: {
        //
        //     return state;
        // }
        case AuthActionTypes.LOGOUT_REQUESTED : {
            return gameMessagesInitialState;
        }

        default: {
            return state;
        }
    }
}


// export const gameMessageMapper = (gameMessage: MultipleChoiceScreen) => {
//     if (gameMessage.id) {
//         gameMessage.id = parseInt('' + gameMessage.id, 10);
//     }
//     if (gameMessage.gameId) {
//         gameMessage.gameId = parseInt('' + gameMessage.gameId, 10);
//     }
//     if (gameMessage.dependsOn && (<ActionDependency>gameMessage.dependsOn).generalItemId) {
//         (<ActionDependency>gameMessage.dependsOn).generalItemId =
//         parseInt('' + (<ActionDependency>gameMessage.dependsOn).generalItemId, 10);
//     }
//     if (!gameMessage.showFeedback) {
//         gameMessage.showFeedback = false;
//     }
//     if (
//         gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest'
//         || gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest'
//         || gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest'
//         || gameMessage['type'] === 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest'
//     ) {
//         if (!gameMessage['answers']) {
//             gameMessage['answers'] = [];
//         }
//     }
//     return gameMessage;
// };
