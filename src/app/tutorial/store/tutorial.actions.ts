import {Action} from '@ngrx/store';
import {TutorialState} from './tutorial.state';
import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/game-messages.state";

export const TutorialActionTypes = {
    GET_FAQ_GAMES: '[Tutorial] Get portal games',
    GET_FAQ_GAMES_SUCCESS: '[Tutorial] Get portal games success',

    GET_GAME: '[Tutorial] Get game',
    GET_GAME_SUCCESS: '[Tutorial] Get game success',
};

export class GetTutorialGamesRequestAction implements Action {
    type = TutorialActionTypes.GET_FAQ_GAMES;

    constructor(public payload: any) {
    }
}

export class GetTutorialGameSuccessAction implements Action {
    type = TutorialActionTypes.GET_FAQ_GAMES_SUCCESS;

    constructor(public payload: Game) {
    }
}

export class GetGameRequestAction implements Action {
    type = TutorialActionTypes.GET_GAME;

    constructor(public payload: any) {
    }
}

export class GetGameResponseAction implements Action {
    type = TutorialActionTypes.GET_GAME_SUCCESS;

    constructor(public payload: GameMessage[]) {
    }
}

export type TutorialAction =
    GetTutorialGamesRequestAction
    | GetTutorialGameSuccessAction
    | GetGameRequestAction
    | GetGameResponseAction;

