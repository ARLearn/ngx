import {
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import { FeaturedGameState } from './featured-games.state';
import * as fromRoot from 'src/app/core/reducers';

export interface State extends fromRoot.State{
  adminFeaturedGames: FeaturedGameState;
}

export const getGameFeature = createFeatureSelector<State, any>('adminFeaturedGames');

const _getFeaturedGameList = (state: FeaturedGameState) =>  state.list;

export const getFeaturedGameList = createSelector(getGameFeature, _getFeaturedGameList);

