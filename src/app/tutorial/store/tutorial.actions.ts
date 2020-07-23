import { Action } from '@ngrx/store';
import { TutorialState } from './tutorial.state';
import {Game} from "../../game-management/store/current-game.state";

export const TutorialActionTypes = {
    GET_FAQ_GAMES: '[Tutorial] Get portal games',
    GET_FAQ_GAMES_SUCCESS: '[Tutorial] Get portal games success',


};

export class GetTutorialGamesRequestAction implements Action {
    type = TutorialActionTypes.GET_FAQ_GAMES;

    constructor(public payload: any) {}
}

export class GetTutorialGameSuccessAction implements Action {
    type = TutorialActionTypes.GET_FAQ_GAMES_SUCCESS;

    constructor(public payload: Game) {}
}

export type TutorialAction =
    GetTutorialGamesRequestAction
    | GetTutorialGameSuccessAction;
