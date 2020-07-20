import {GameThemeActions, GameThemeActionTypes} from './game-theme.actions';
import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import {GameTheme} from './game-theme.state';

export interface GameThemeState extends EntityState<GameTheme> { }

export function selectIdentifier(a: GameTheme): number {
    return a.themeId;
}

export const gameThemeAdapter = createEntityAdapter<GameTheme>(
    {selectId: selectIdentifier}
);

const initialState: GameThemeState = gameThemeAdapter.getInitialState();

export function gameThemeReducer(
    state: GameThemeState = initialState,
    action: GameThemeActions,
): GameThemeState {
    switch (action.type) {
        case GameThemeActionTypes.ADD_ONE:
            return gameThemeAdapter.addOne(action.response, state);
        case GameThemeActionTypes.UPDATE_ONE:
            return gameThemeAdapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);
        case GameThemeActionTypes.DELETE_ONE:
            return gameThemeAdapter.removeOne(action.id, state);
        case GameThemeActionTypes.GET_ALL:
            return gameThemeAdapter.addMany(action.items, state);
        case GameThemeActionTypes.ADD_ALL:
            console.log("action add all ", action);
            if (!action.themes || !action.themes.items) {
                return state;
            }
            return gameThemeAdapter.upsertMany(action.themes.items, state);
        default:
            return state;
    }
}
