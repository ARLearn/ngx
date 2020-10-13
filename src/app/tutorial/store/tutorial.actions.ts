import {Action} from '@ngrx/store';
import {TutorialState} from './tutorial.state';
import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/game-messages.state";

export const TutorialActionTypes = {
    GET_FAQ_GAMES: '[Tutorial] Get portal games',
    GET_FAQ_GAMES_SUCCESS: '[Tutorial] Get portal games success',

    GET_GAME: '[Tutorial] Get game',
    GET_GAME_SUCCESS: '[Tutorial] Get game success',

    SELECT_VIDEO_CATEGORY: '[Tutorial] Select video category',
};

export class GetTutorialGamesRequestAction implements Action {
    type = TutorialActionTypes.GET_FAQ_GAMES;

    constructor(public payload: { gameId: number; faq: boolean }) {
    }
}

export class GetTutorialGameSuccessAction implements Action {
    type = TutorialActionTypes.GET_FAQ_GAMES_SUCCESS;

    constructor(public payload: { game: Game, faq: boolean }) {
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

export class SelectVideoCategory implements Action {
    type = TutorialActionTypes.SELECT_VIDEO_CATEGORY;

    constructor(public payload: string) {
    }
}

export type TutorialAction =
    GetTutorialGamesRequestAction
    | GetTutorialGameSuccessAction
    | GetGameRequestAction
    | GetGameResponseAction
    | SelectVideoCategory;
