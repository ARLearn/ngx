import { Action } from '@ngrx/store';
import { PortalGame } from './portal-games.state';

export const PortalGamesActionTypes = {
  GET_PORTAL_GAMES: '[PortalGames] Get portal games',
  SET_PORTAL_GAMES: '[PortalGames] Set portal games',

  GET_PORTAL_GAME: '[PortalGame] Get portal game',
  SET_PORTAL_GAME: '[PortalGame] Set portal game',
};

export class GetPortalGamesRequestAction implements Action {
  type = PortalGamesActionTypes.GET_PORTAL_GAMES;

  constructor(public payload = null) {}
}

export class SetPortalGamesAction implements Action {
  type = PortalGamesActionTypes.SET_PORTAL_GAMES;

  constructor(public payload: PortalGame[]) {}
}

export class GetPortalGameRequestAction implements Action {
  type = PortalGamesActionTypes.GET_PORTAL_GAME;

  constructor(public payload = null) {}
}

export class SetPortalGameAction implements Action {
  type = PortalGamesActionTypes.SET_PORTAL_GAME;

  constructor(public payload: PortalGame) {}
}

export type PortalGamesAction = 
    GetPortalGamesRequestAction
  | SetPortalGamesAction
  | GetPortalGameRequestAction
  | SetPortalGameAction;
