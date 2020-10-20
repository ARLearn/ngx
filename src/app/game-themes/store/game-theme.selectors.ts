import {gameThemeAdapter, GameThemeState} from './game-theme.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const gameThemesState = createFeatureSelector<GameThemeState>('game-theme');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = gameThemeAdapter.getSelectors(gameThemesState);

export const CATEGORY_CUSTOM_THEMES = 'My themes';

export const selectThemeCategories = createSelector(selectAll, state => {
    return state
        .map(x => x.category)
        .filter((item, i, array) => {
            return item && array.indexOf(item) === i && item !== CATEGORY_CUSTOM_THEMES;
        })
        .sort((a, b) => a.localeCompare(b))
        .concat(CATEGORY_CUSTOM_THEMES);
})