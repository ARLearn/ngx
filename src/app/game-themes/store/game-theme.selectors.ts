import {gameThemeAdapter, GameThemeState} from './game-theme.reducer';
import {createFeatureSelector} from '@ngrx/store';

export const gameThemesState = createFeatureSelector<GameThemeState>('game-theme');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = gameThemeAdapter.getSelectors(gameThemesState);
