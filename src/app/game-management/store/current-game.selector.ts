import {createFeatureSelector, createSelector,} from '@ngrx/store';

import {CurrentGameState} from './current-game.state';
import * as fromRoot from 'src/app/core/reducers';
import {PlayerState} from '../../player-management/store/player.state';
import {UserState} from '../../user-management/store/portal-user.state';
import {getAllPlayersAndMySelf} from '../../player-management/store/player.selector';
import { selectAll } from 'src/app/game-themes/store/game-theme.selectors';

export interface State extends fromRoot.State {
    currentGame: CurrentGameState;
    players: PlayerState;
    user: UserState;
}

export const getCurrentGameFeature = createFeatureSelector<State, any>('currentGame');

const _getLoading = (state: CurrentGameState) => state.loading;
const _me = (state: CurrentGameState) => state.me;
const _getButtonDisabled = (state: CurrentGameState) => {
    return {active: state.saving};
};
const _getGame = (state: CurrentGameState) => state.game;
const _getGameAuthors = (state: CurrentGameState) => state.authors;
const _getSelectedTheme = (state: CurrentGameState) => state.game?.theme;

export const getLoading = createSelector(getCurrentGameFeature, _getLoading);
export const getGame = createSelector(getCurrentGameFeature, _getGame);
export const getMe = createSelector(getCurrentGameFeature, _me);
export const getAuthors = createSelector(getCurrentGameFeature, _getGameAuthors);
export const getButtonDisabled = createSelector(getCurrentGameFeature, _getButtonDisabled);
export const getSelectedTheme = createSelector(getCurrentGameFeature, _getSelectedTheme);


export const gameAccessWithAccount = createSelector(
    getAuthors,
    getAllPlayersAndMySelf,
    (authors, players) => {
        if (!authors) {
            return [];
        }
        return authors.map((author) => {
            const player = players.find((p) => p.fullId === author.account);
            if (!player) {
                return author;
            }
            return Object.assign({}, author, player);
        });
    });

export const gameMyAccessWithAccount = createSelector(
    gameAccessWithAccount,
    getMe,
    (players, me) => {
        players = players.filter(p => p.account === me);
        if (players.length === 0) {
            return null;
        }
        return players[0];
    }
);

export const iCanWrite = createSelector(
    gameMyAccessWithAccount,
    (user: any) => {
        if (user === null) {
            return false;
        }
        return (user.accessRights !== 3);
    });

export const iAmOwner = createSelector(
    gameMyAccessWithAccount,
    (user: any) => {
        if (user === null) {
            return false;
        }
        return (user.accessRights === 1);
    });

export const getGameColor = createSelector(getCurrentGameFeature, selectAll, (state, themes) => {
    const theme = themes.find(x => x.themeId === state.game.theme);

    return theme && theme.primaryColor;
})

export const inAuthorList = createSelector(getCurrentGameFeature, (state) => {
    const me = state.me;
    const authors = state.authors;
    if (!authors) {
        return false;
    }
    let retValue = false;
    authors.forEach(author => {
        retValue = retValue || (author.account === me);
    });
    return retValue;
});
