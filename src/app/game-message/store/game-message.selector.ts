import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {GameMessageState} from './game-message.state';
import {GameMessage} from "../../game-messages/store/game-messages.state";
import {CurrentGameState, Game} from "../../game-management/store/current-game.state";
import { selectAll as getAllThemes } from 'src/app/game-themes/store/game-theme.selectors';
import {GameTheme} from "../../game-themes/store/game-theme.state";


export interface State extends fromRoot.State {
    gameMessage: GameMessageState;
    currentGame: CurrentGameState;
}

export const getGameMessageFeature = createFeatureSelector<State, any>('gameMessage');
export const getCurrentGameFeature = createFeatureSelector<State, any>('currentGame');

export const getEditMessageSelector = createSelector(getGameMessageFeature, (state: GameMessageState) => state.editMessage);
export const getPreviewSelector = createSelector(getGameMessageFeature, (state: GameMessageState) => state.previewScreen);
const _getGame = (state: CurrentGameState) => state.game;
export const getGame = createSelector(getCurrentGameFeature, _getGame);

export const aggregatePreviewSelector = createSelector(
    getPreviewSelector,
    getEditMessageSelector,
    (state: any, message: GameMessage) => {
        if (!message) {
            return state;
        }
        return Object.assign(state, {messageType: message.type});
    }
);

export const selectedColor = createSelector(
    getEditMessageSelector,
    getGame,
    getAllThemes,
    (message: GameMessage, game: Game, themes: GameTheme[]) => {
        if (message && message.primaryColor) {
            return message.primaryColor;
        }
        if (game) {
            const theme = themes.find(f => f.themeId === game.theme);

            return theme && theme.primaryColor;
        }
    }
);
