import * as fromRoot from "../../core/reducers";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserLibraryState} from "./user-library.state";
import {gamesAdapter} from "../../portal-management/store/portal-games.reducer";


export interface State extends fromRoot.State {
    gameLibrary: UserLibraryState;
}

export const getGameLibraryFeature = createFeatureSelector<State, UserLibraryState>('gameLibrary');

export const getFeaturedGames = createSelector(getGameLibraryFeature, (state) => state.featuredGames);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = gamesAdapter.getSelectors(getFeaturedGames);
