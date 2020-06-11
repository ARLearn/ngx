import {Action} from '@ngrx/store';
import {GameMessage, PreviewType} from './game-messages.state';

export const GameMessagesActionTypes = {


  GAME_MESSAGES_REQUESTED: '[GameMessages] Get messages requested',
  GAME_MESSAGES_COMPLETED: '[GameMessages] Get messages Completed',

  MESSAGES_DELETE_REQUESTED: '[GameMessages] Delete messages requested',
  MESSAGES_DELETE_COMPLETED: '[GameMessages] Delete messages Completed',

  TOGGLE_EDIT_MODE: '[GameMessages] Toggle edit mode',

  SET_PREVIEW_TYPE: '[GameMessages] Set preview type',
  SET_PREVIEW_MESSAGE: '[GameMessages] Set preview message',

  SETFILTER: '[GameMessages] Set message filter',

  MESSAGE_SELECT: '[GameMessages] Select message',
  MESSAGE_SELECT_FROM_ROUTER: '[GameMessages] Select message from router',
  TARGET_MESSAGE_SELECT: '[GameMessages] Select target message',

  MESSAGE_SAVE_REQUESTED: '[GameMessages] Save message requested',
  MESSAGE_SAVE_COMPLETED: '[GameMessages] Save message Completed',

  MESSAGE_NEW_REQUESTED: '[GameMessages] New message requested',
  MESSAGE_NEW_COMPLETED: '[GameMessages] New message Completed',

  GAME_MESSAGES_ERROR: '[GameMessages]  Error',

  SET_SELECTED_SCREEN: '[GameMessages] Set selected screen',
};

export class GetGameMessagesRequestAction implements Action {
  type = GameMessagesActionTypes.GAME_MESSAGES_REQUESTED;

  constructor(public payload: any = null) {
  }
}

export class GetGameMessagesCompletedAction implements Action {
  type = GameMessagesActionTypes.GAME_MESSAGES_COMPLETED;

  constructor(public payload: any) {
  }
}

export class GetMessageDeleteRequestAction implements Action {
  type = GameMessagesActionTypes.MESSAGES_DELETE_REQUESTED;

  constructor(public payload: any) {
  }
}

export class GetMessageDeleteResponseAction implements Action {
  type = GameMessagesActionTypes.MESSAGES_DELETE_COMPLETED;

  constructor(public payload: any) {
  }
}

export class SelectMessageAction implements Action {
  type = GameMessagesActionTypes.MESSAGE_SELECT;

  constructor(public payload: any) {
  }
}

export class SelectMessageFromRouterAction implements Action {
  type = GameMessagesActionTypes.MESSAGE_SELECT_FROM_ROUTER;

  constructor(public payload: any= null) {
  }
}

export class SelectTargetMessageAction implements Action {
  type = GameMessagesActionTypes.TARGET_MESSAGE_SELECT;

  constructor(public payload: any) {
  }
}

export class ToggleEditModeAction implements Action {
  type = GameMessagesActionTypes.TOGGLE_EDIT_MODE;

  constructor(public payload: any) {
  }
}

export class SetPreviewTypeAction implements Action {
  type = GameMessagesActionTypes.SET_PREVIEW_TYPE;

  constructor(public payload: { preview: PreviewType, data?: string }) {
  }
}

export class SetPreviewMessageAction implements Action {
  type = GameMessagesActionTypes.SET_PREVIEW_MESSAGE;

  constructor(public payload: number) {
  }
}

export class SetFilterAction implements Action {
  type = GameMessagesActionTypes.SETFILTER;

  constructor(public payload: { filters: string[] } = {filters: []}) {
  }

  setFilter(filter: string[]) {
    this.payload.filters = filter;
  }
}


export class SaveMessageRequestedAction implements Action {
  type = GameMessagesActionTypes.MESSAGE_SAVE_REQUESTED;

  constructor(public payload: any) {
  }
}

export class SaveMessageResponseAction implements Action {
  type = GameMessagesActionTypes.MESSAGE_SAVE_COMPLETED;

  constructor(public payload: any) {
  }
}

export class NewMessageRequestedAction implements Action {
  type = GameMessagesActionTypes.MESSAGE_NEW_REQUESTED;

  constructor(public payload: any) {
  }
}

export class NewMessageResponseAction implements Action {
  type = GameMessagesActionTypes.MESSAGE_NEW_COMPLETED;

  constructor(public payload: any) {
  }
}

export class GetGameMessagesErrorAction implements Action {
  type = GameMessagesActionTypes.GAME_MESSAGES_ERROR;

  constructor(public payload: any) {
  }
}

export class SetSelectedScreenAction implements Action {
  type = GameMessagesActionTypes.SET_SELECTED_SCREEN;

  constructor(public payload: any) {
  }
}

export type GameMessagesAction
  = GetGameMessagesRequestAction
  | GetGameMessagesCompletedAction

  | GetMessageDeleteRequestAction
  | GetMessageDeleteResponseAction

  | SelectMessageAction
  | SelectMessageFromRouterAction
  | SelectTargetMessageAction

  | ToggleEditModeAction
  | SetPreviewTypeAction

  | SetFilterAction

  | SaveMessageResponseAction
  | SaveMessageRequestedAction

  | NewMessageRequestedAction
  | NewMessageResponseAction

  | GetGameMessagesErrorAction;
