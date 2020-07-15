import {createFeatureSelector, createSelector, select,} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import { PortalGamesState } from './portal-games.state';


export interface State extends fromRoot.State {
    portalGames: PortalGamesState;
}

export const getPortalGamesFeature = createFeatureSelector<State, PortalGamesState>('portalGames');
export const getPortalGames = createSelector(getPortalGamesFeature, (state) => state.portalGames);
export const getPortalGame = createSelector(getPortalGamesFeature, (state) => state.portalGame);