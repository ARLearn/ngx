import * as fromRoot from "../../core/reducers";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserLibraryState} from "./user-library.state";
import {gamesAdapter} from "../../portal-management/store/portal-games.reducer";


export interface State extends fromRoot.State {
    gameLibrary: UserLibraryState;
}

export const getGameLibraryFeature = createFeatureSelector<State, UserLibraryState>('gameLibrary');

export const getFeaturedGames = createSelector(getGameLibraryFeature, (state) => state.featuredGames);
export const getQueryResult = createSelector(getGameLibraryFeature, (state) => state.queryGames);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = gamesAdapter.getSelectors(getFeaturedGames);


export const getLibraryQueryGames = createSelector(getQueryResult, (queryResult) => {
    // console.log(queryResult, cachedGames);
    // console.log(queryResult.map(result => Object.assign(result, cachedGames[result.gameId])));
    if (!queryResult) {
        return [];
    }
    return queryResult;
    // return queryResult.map(result => Object.assign(result, cachedGames[result.gameId]));
});
