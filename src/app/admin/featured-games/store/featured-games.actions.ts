import {Action} from '@ngrx/store';

export const GameActionTypes = {
  GET_FEATURED_GAME_LIST_REQUESTED: '[FeaturedGames] Get Requested',
  GET_FEATURED_GAME_LIST_COMPLETED: '[FeaturedGames] Get Completed',


  GET_FEATURED_GAME_LIST_ERROR: '[FeaturedGames]  Error'
};

export class GetFeaturedGameListRequestAction implements Action {
  type = GameActionTypes.GET_FEATURED_GAME_LIST_REQUESTED;

  constructor(public payload: any = null) {
  }
}

export class GetFeaturedGameListCompletedAction implements Action {
  type = GameActionTypes.GET_FEATURED_GAME_LIST_COMPLETED;

  constructor(public payload: any) {
  }
}

export class GetFeaturedGameListErrorAction implements Action {
  type = GameActionTypes.GET_FEATURED_GAME_LIST_ERROR;

  constructor(public payload: any) {
  }
}

export type GameAction
  = GetFeaturedGameListRequestAction
  | GetFeaturedGameListCompletedAction
  | GetFeaturedGameListErrorAction
  ;
