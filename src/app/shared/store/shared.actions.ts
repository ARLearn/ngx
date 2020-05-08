import {Action} from '@ngrx/store';


export const SharedActionTypes = {

  SET_ERROR: '[SharedActions]  Set Error',
  SHARED_ERROR: '[SharedActions]  Error'
};

export class SetErrorAction implements Action {
  type = SharedActionTypes.SET_ERROR;

  constructor(public payload: any) {
  }
}

export class SharedErrorAction implements Action {
  type = SharedActionTypes.SHARED_ERROR;

  constructor(public payload: any) {
  }
}


export type SharedAction
  = SetErrorAction
  | SharedErrorAction;
