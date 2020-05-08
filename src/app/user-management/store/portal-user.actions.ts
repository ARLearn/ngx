import {Action} from '@ngrx/store';
import {UserState} from './portal-user.state';

export const PortalUserActionTypes = {
  LOAD_USER_REQUESTED: '[PortalUsers] LOAD Requested',
  LOAD_USER_COMPLETED: '[PortalUsers] LOAD Completed',

  // SAVE_USER_NOTIFICATIONS_REQUESTED: '[PortalUsers] Save User Notifications Requested',
  // SAVE_USER_NOTIFICATIONS_COMPLETED: '[PortalUsers] Save User Notifications Completed',
  //
  // CREATE_USER_REQUESTED: '[PortalUsers] Create User Requested',
  // CREATE_USER_COMPLETED: '[PortalUsers] Create User Completed',
  //
  SAVE_USER_REQUESTED: '[PortalUsers] Save User Requested',
  SAVE_USER_COMPLETED: '[PortalUsers] Save User Completed',
  //
  // LOAD_USER_ACTIONS_ERROR: '[PortalUsers]  Error'
};

export class LoadUserRequestAction implements Action {
  type = PortalUserActionTypes.LOAD_USER_REQUESTED;

  constructor(public payload: any = null) {
  }
}

export class LoadUserCompletedAction implements Action {
  type = PortalUserActionTypes.LOAD_USER_COMPLETED;

  constructor(public payload: any) {
  }
}

export class SaveUserRequestAction implements Action {
  type = PortalUserActionTypes.SAVE_USER_REQUESTED;

  constructor(public payload: UserState = null) {
  }
}


export class SaveUserCompletedAction implements Action {
  type = PortalUserActionTypes.SAVE_USER_COMPLETED;

  constructor(public payload: any) {
  }
}

export type PortalUserAction
  = LoadUserRequestAction
  | LoadUserCompletedAction
  | SaveUserRequestAction
  | SaveUserCompletedAction
 ;
