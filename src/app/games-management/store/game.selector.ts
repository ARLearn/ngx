import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import {GameState} from './game.state';
import * as fromRoot from 'src/app/core/reducers';
import * as _ from 'lodash';
import {GameMessagesState} from "../../game-messages/store/game-messages.state";
import {getGameMessagesFeature} from "../../game-messages/store/game-messages.selector";
import {Game} from "../../game-management/store/current-game.state";

export interface State extends fromRoot.State {
    game: GameState;
}

export const getGameFeature = createFeatureSelector<State, any>('game');

const _getLoading = (state: GameState) => state.loading;
const _getGameList = (state: GameState) => state.list;
const _filtersProjector = (state: GameMessagesState) => state.filter;

export const getLoading = createSelector(getGameFeature, _getLoading);
export const getGameList = createSelector(getGameFeature, _getGameList);
export const getGameListSorted = createSelector(getGameList, (games) => _.orderBy(games, ['lastModificationDate'], ['desc']));
export const getGamesFiltersSelector = createSelector(getGameFeature, _filtersProjector);

export const getFilteredGamesSelector = createSelector(getGameListSorted, getGamesFiltersSelector,
    (games:Game[], filters: string[])=> {
        return games.filter(game => {
            if (!filters) return true;
            for (let i = 0; i < filters.length; i++) {
                if ((game.title.toUpperCase().indexOf(filters[0].toUpperCase()) === -1) ) {
                    return false;
                }
            }
            return true;

        });
    });


