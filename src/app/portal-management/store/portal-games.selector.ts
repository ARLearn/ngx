import {createFeatureSelector, createSelector, select,} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {PortalGame, PortalGamesState} from './portal-games.state';
import {gamesAdapter} from "./portal-games.reducer";
import {query} from "@angular/animations";
import * as fromRootSelector from "../../core/selectors/router.selector";


export interface State extends fromRoot.State {
    portalGames: PortalGamesState;
}

export const getPortalGamesFeature = createFeatureSelector<State, PortalGamesState>('portalGames');
export const getPortalGames = createSelector(getPortalGamesFeature, (state) => state.portalGames);
export const getPortalGame = createSelector(getPortalGamesFeature, (state) => state.portalGame);
export const getQueryResult = createSelector(getPortalGamesFeature, (state) => state.queryGames);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = gamesAdapter.getSelectors(getPortalGames);

export const getQueryGames = createSelector(getQueryResult, selectEntities, (queryResult, cachedGames) => {
    // console.log(queryResult, cachedGames);
    // console.log(queryResult.map(result => Object.assign(result, cachedGames[result.gameId])));
    return queryResult.map(result => Object.assign(result, cachedGames[result.gameId]));
});

export const getPortalEditGame = createSelector(selectEntities, fromRootSelector.selectRouteParam('gameId'),
    (entities, currentId) => entities[currentId]);

